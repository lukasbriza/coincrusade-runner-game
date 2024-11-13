import groovy.json.JsonSlurper

@Library('jenkins-shared-library') _

/**
* SUPPORTS ENV VARIABLES:
* - NEXT_PUBLIC_GITHUB
* - NEXT_PUBLIC_MAIL
* - DATABASE_URL
* - API_KEY
* - API_URL
* - DATABASE_PORT
* - BACKEND_PORT
* - FRONTEND_PORT
* - MONGODB_ROOT_PASSWORD
* - MONGODB_ROOT_USER
* - MONGODB_REPLICA_SET_KEY
* - NODE_ENV
*/

pipeline {
  agent any
  environment {
    API_PROCESSOR_API = "http://api-processor:3002"
    GITHUB_URL = "github.com/lukasbriza/coincrusade-runner-game"
    PROJECT_DIR = "coincrusade-runner-game"
    PASSBOLT_FOLDER_DEV_ID = "7fc21eac-53da-4678-b2db-b6fb22a9f377"
    PASSBOLT_FOLDER_PROD_ID = "f6de24b5-3cad-4537-a34e-6528f7edcd44"
    PASSBOLT_SHARED_FOLDER_ID = "61ac7071-e34d-4d18-9651-6fd084c195f3"
    POINTAINER_TARGET_ENVIRONMENT = "Homeport"
    NODE_ENV = "production"
  }
  stages {
    stage("Check workspace") {
      when {
        expression { fileExists("${env.PROJECT_DIR}") }
      }
      steps {
        echo "Preparing workspace before build..."
        sh "rm -rf ${env.PROJECT_DIR}"
      }
    }
    stage("Fetching secrets") {
      steps {
        script {
          echo "Fetching secrets..."
          env.SHARED_SECRETS = passboltApi.getFolderSecrets(env.API_PROCESSOR_API, env.PASSBOLT_SHARED_FOLDER_ID)
          def ticker = getTicker()
          if (ticker == "--prod"){
            echo "Resolved as production environment..."
            def response = passboltApi.getFolderSecrets(env.API_PROCESSOR_API, env.PASSBOLT_FOLDER_PROD_ID)
            println(response)
            env.SECRETS = response
          } else {
            echo "Resolved as development environment..."
            def response = passboltApi.getFolderSecrets(env.API_PROCESSOR_API, env.PASSBOLT_FOLDER_DEV_ID)
            println(response)
            env.SECRETS = response
          }

          echo "Parse secrets..."
          def secrets = new JsonSlurper().parseText(env.SECRETS)
          def sharedSecrets = new JsonSlurper().parseText(env.SHARED_SECRETS)
          println(secrets)
          println(sharedSecrets)
          
          env.NEXT_PUBLIC_GITHUB = secrets["NEXT_PUBLIC_GITHUB"]
          env.NEXT_PUBLIC_MAIL = secrets["NEXT_PUBLIC_MAIL"]
          env.API_KEY = secrets["API_KEY"]
          env.DATABASE_PORT = secrets["DATABASE_PORT"]
          env.BACKEND_PORT = secrets["BACKEND_PORT"]
          env.FRONTEND_PORT = secrets["FRONTEND_PORT"]
          env.MONGODB_ROOT_PASSWORD = secrets["MONGODB_ROOT_PASSWORD"]
          env.MONGODB_ROOT_USER = secrets["MONGODB_ROOT_USER"]
          env.MONGODB_REPLICA_SET_KEY = secrets["MONGODB_REPLICA_SET_KEY"]

          env.GITHUB_PAT = sharedSecrets["GITHUB_PAT"]
          env.PORTAINER_API_KEY = sharedSecrets["PORTAINER_API_KEY"]
          env.DOCKER_NAME = sharedSecrets["DOCKER_NAME"]
          env.DOCKER_PASSWORD = sharedSecrets["DOCKER_PASSWORD"]

          echo "Constructiing database url..."
          env.DATABASE_URL = createMongoDbUrl("${env.MONGODB_ROOT_USER}","${env.MONGODB_ROOT_PASSWORD}", "${env.DATABASE_NAME}")
        }
      }
    }
    stage("Checkout") {
      steps {
        script {
          def ticker = getTicker()

          echo "Checking out branch..."
          sh "git config --global http.postBuffer 524288000"
          sh "git config --global http.lowSpeedLimit 1000"
          sh "git config --global http.lowSpeedTime 60"
          sh "git config --global credentials.helper cache"
          sh "git config --global credential.helper 'cache --timeout=3600'"
          
          // DECIDE WHICH BRANCH TO CLONE
          if (ticker == "--prod") {
            sh "git clone -b production https://lukasbriza:${env.GITHUB_PAT}@${env.GITHUB_URL}.git"
          } else {
            sh "git clone -b feat/pipeline-production https://lukasbriza:${env.GITHUB_PAT}@${env.GITHUB_URL}.git"
          }
        }
      }
    }
    stage("Build images") {
      steps {
        script {
          retry(5){
            echo "Building images..."
            dir ("${env.PROJECT_DIR}") {
              def ticker = getTicker()

              // DECIDE WHICH COMPOSE FILE USE
              if (ticker == "--prod") {
                sh "docker compose -f docker-compose.prod.yaml build"
              } else {
                sh "docker compose -f docker-compose.dev.yaml build"
              }
            }
            sleep(3)
          }
        }
      }
    }
    stage("Try to run compose stack") {
      steps {
        script {
          echo "Trying to run compose stack..."
          dir ("${env.PROJECT_DIR}") {
            def ticker = getTicker()

            // DECIDE WHICH FILE COMPOSE
            if (ticker == "--prod"){
              sh "docker compose -f docker-compose.prod.yaml up -d"
            } else {
              sh "docker compose -f docker-compose.dev.yaml up -d"
            }
          }
          sleep(3)
        }
      }
    }
    stage("Stop stack") {
      steps {
        script {
          echo "Stopping composed stack..."
          dir ("${env.PROJECT_DIR}") {
            def ticker = getTicker()

            // DECIDE WHICH ENVIROMENT SHUT DOWN
            if (ticker == "--prod"){
              sh "docker compose -f docker-compose.prod.yaml down"
            } else {
              sh "docker compose -f docker-compose.dev.yaml down"
            }
          }
          sleep(3)
        }
      }
    }
    stage("Push images") {
      steps {
        script {
          retry(5){
            echo "Login to DockerHub..."
            sh "docker login -p ${env.DOCKER_PASSWORD} -u ${env.DOCKER_NAME}"

            def ticker = getTicker()
            // DECIDE WHICH ENVIROMENT PUSH
            if (ticker == "--prod"){
              sh "docker compose -f docker-compose.prod.yaml push"
            } else {
              sh "docker compose -f docker-compose.dev.yaml push"
            }
          }
        }
      }
    }
    /*
    stage("Update/Create Portainer stack") {
      steps {
        script {
          def ticker = getTicker()
          echo "Resolved ticker: ${ticker}"
          def stacksResponse = portainerApi.getStacks(env.API_PROCESSOR_API)
          def environmentsResponse = portainerApi.getEnvironments(env.API_PROCESSOR_API)

          def stacksContent = new groovy.json.JsonSlurper().parseText(stacksResponse)
          def environmentsContent = new groovy.json.JsonSlurper().parseText(environmentsResponse)

          def targetEnvironment = getTargetEnv(environmentsContent, env.POINTAINER_TARGET_ENVIRONMENT)
          echo "Target environment id: ${targetEnvironment.Id}"

          def stacksWithGithubUrl = stacksContent.findAll{ stack -> stack.GitConfig.URL == "https://${env.GITHUB_URL}" }
          def stacksToRedeploy = stacksWithGithubUrl.findAll{ stack -> stack.Name.endsWith(ticker) }
          
          def envBody = [
            ["name": "NEXT_PUBLIC_GITHUB", "value": "${env.NEXT_PUBLIC_GITHUB}"],
            ["name": "NEXT_PUBLIC_MAIL", "value": "${env.NEXT_PUBLIC_MAIL}"],
            ["name": "API_KEY", "value": "${env.API_KEY}"],
            ["name": "DATABASE_PORT", "value": "${env.DATABASE_PORT}"],
            ["name": "BACKEND_PORT", "value": "${env.BACKEND_PORT}"],
            ["name": "FRONTEND_PORT", "value": "${env.FRONTEND_PORT}"],
            ["name": "MONGODB_ROOT_PASSWORD", "value": "${env.MONGODB_ROOT_PASSWORD}"],
            ["name": "MONGODB_ROOT_USER", "value": "${env.MONGODB_ROOT_USER}"],
            ["name": "MONGODB_REPLICA_SET_KEY", "value": "${env.MONGODB_REPLICA_SET_KEY}"],
            ["name": "DATABASE_URL", "value": "${env.DATABASE_URL}"],
            ["name": "NODE_ENV", "value": "${env.NODE_ENV}"] 
          ]
          
          if (stacksToRedeploy.size() == 0) {
            echo "There is no deployed stack with source url https://${env.GITHUB_URL} in Portainer..."
            echo "Initiate new stack..."
            
            def deployRequestBody = [
              "endpointId": "${targetEnvironment.Id}",
              "name": "coincrusade-runner-game${ticker}",
              "repositoryURL": "https://${env.GITHUB_URL}",
              "repositoryAuthentication": true,
              "repositoryUsername": "lukasbriza",
              "repositoryPassword": "${env.GITHUB_PAT}",
              "repositoryReferenceName": getBranchReference(),
              "composeFile": "docker-compose.yml",
              "tlsskipVerify": true,
              "fromAppTemplate": false,
              "autoUpdate": null,
              "additionalFiles": null,
              "env":  envBody
            ]
            
            def requestBody = new groovy.json.JsonOutput().toJson(deployRequestBody)
            def deployResponse = portainerApi.deployStack(env.API_PROCESSOR_API, requestBody)

            echo "Stack deployed..."
            return
          }

          echo "Redeploying existing stacks..."

          for (stackToRedeploy in stacksToRedeploy) {
            def redeployRequestBody = [
              "endpointId": "${targetEnvironment.Id}",
              "stackId": "${stackToRedeploy.Id}",
              "repositoryAuthentication": true,
              "repositoryUsername": "lukasbriza",
              "repositoryPassword": '${env.GITHUB_PAT}',
              "repositoryReferenceName": getBranchReference(),
              "prune": true,
              "pullImage": true,
              "env": envBody
            ]

            def requestBody = new groovy.json.JsonOutput().toJson(redeployRequestBody)
            def redeployResponse = portainerApi.reDeployStack(env.API_PROCESSOR_API, "${stackToRedeploy.Id}", requestBody)

            echo "Redeploy of stack with Id: ${stackToRedeploy.Id} was succesfull..."
          }
        }
      }
    }
    */
  }
  post {
    always {
      script {
        echo "Cleaning up..."

        if (fileExists("${env.PROJECT_DIR}")) {
          dir ("${env.PROJECT_DIR}") {
            def ticker = getTicker()

            // DECIDE WHICH ENVIROMENT SHUT DOWN
            if (ticker == "--prod"){
              sh "docker compose -f docker-compose.prod.yaml down"
            } else {
              sh "docker compose -f docker-compose.dev.yaml down"
            }
          } 
            sh "rm -rf ${env.PROJECT_DIR}"
        }
        
        sh "docker system prune --volumes -f -a"
      }
    }
    success {
      echo "Build succeeded!"
    }
    failure {
      echo "Build failed!"
    }
  }
}
