import groovy.json.JsonOutput

@Library('jenkins-shared-library') _

/**
* SUPPORTS ENV VARIABLES FROM PASSBOLT:
* - NEXT_PUBLIC_GITHUB
* - NEXT_PUBLIC_MAIL
* - API_KEY
* - API_URL
* - DATABASE_PORT
* - BACKEND_PORT
* - FRONTEND_PORT
* - MONGODB_ROOT_PASSWORD
* - MONGODB_ROOT_USER
* - MONGODB_REPLICA_SET_KEY
* - NODE_ENV
* - POINTAINER_TARGET_ENVIRONMENT
* - DOCKER_PASSWORD
* - DOCKER_NAME
* - PORTAINER_API_KEY
* - GITHUB_PAT
* - MONGO_DATABASE_PATH
* - MONGODB_HOST_NAME
*/

pipeline {
  agent any
  environment {
    API_PROCESSOR_API = "http://api-processor:3002"
    GITHUB_URL = "github.com/lukasbriza/coincrusade-runner-game"
    PROJECT_DIR = "coincrusade-runner-game"
    PASSBOLT_FOLDER_TEST_ID = "7fc21eac-53da-4678-b2db-b6fb22a9f377"
    PASSBOLT_FOLDER_PROD_ID = "f6de24b5-3cad-4537-a34e-6528f7edcd44"
    PASSBOLT_SHARED_FOLDER_ID = "61ac7071-e34d-4d18-9651-6fd084c195f3"
    ROOT_VOLUME_FILE = "/build"
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
    stage("API health check") {
      steps {
        script {
          processorApiHealthCheck(env.API_PROCESSOR_API)
        }
      }
    }
    stage("Fetching secrets") {
      steps {
        script {
          println("Fetching secrets...")
          env.SHARED_SECRETS = passboltApi.getFolderSecrets(env.API_PROCESSOR_API, env.PASSBOLT_SHARED_FOLDER_ID)
          env.SECRETS = getEnvSpecificSecrets(env.API_PROCESSOR_API, env.PASSBOLT_FOLDER_TEST_ID, env.PASSBOLT_FOLDER_PROD_ID)

          println("Parsing secrets...")
          def secrets = new groovy.json.JsonSlurper().parseText(env.SECRETS)
          def sharedSecrets = new groovy.json.JsonSlurper().parseText(env.SHARED_SECRETS)
          
          println("Assigning secrets...")
          env.NEXT_PUBLIC_GITHUB = secrets["NEXT_PUBLIC_GITHUB"]
          env.NEXT_PUBLIC_MAIL = secrets["NEXT_PUBLIC_MAIL"]
          env.API_KEY = secrets["API_KEY"]
          env.DATABASE_PORT = secrets["DATABASE_PORT"]
          env.BACKEND_PORT = secrets["BACKEND_PORT"]
          env.FRONTEND_PORT = secrets["FRONTEND_PORT"]
          env.MONGODB_ROOT_PASSWORD = secrets["MONGODB_ROOT_PASSWORD"]
          env.MONGODB_ROOT_USER = secrets["MONGODB_ROOT_USER"]
          env.MONGODB_REPLICA_SET_KEY = secrets["MONGODB_REPLICA_SET_KEY"]
          env.MONGO_DATABASE_PATH = secrets["MONGO_DATABASE_PATH"]
          env.MONGODB_HOST_NAME = secrets["MONGODB_HOST_NAME"]
          env.API_URL = secrets["API_URL"]

          env.GITHUB_PAT = sharedSecrets["GITHUB_PAT"]
          env.PORTAINER_API_KEY = sharedSecrets["PORTAINER_API_KEY"]
          env.DOCKER_NAME = sharedSecrets["DOCKER_NAME"]
          env.DOCKER_PASSWORD = sharedSecrets["DOCKER_PASSWORD"]
          env.NODE_ENV = sharedSecrets["NODE_ENV"]
          env.POINTAINER_TARGET_ENVIRONMENT = sharedSecrets["POINTAINER_TARGET_ENVIRONMENT"]

          println("Constructing database url...")
          env.DATABASE_URL = createMongoDbUrl("${env.MONGODB_ROOT_USER}", "${env.MONGODB_ROOT_PASSWORD}", "${env.MONGODB_HOST_NAME}", "${env.DATABASE_NAME}")
        }
      }
    }
    stage("Clone branche") {
      steps {
        script {
          dockerApi.cloneEnvSpecificBranch("https://lukasbriza:${env.GITHUB_PAT}@${env.GITHUB_URL}.git")
        }
      }
    }
    stage("Build images") {
      steps {
        script {
            echo "Building images..."
            dir ("${env.PROJECT_DIR}") {
              dockerApi.buildDockerComposeImages()
            }
            sleep(3)
        }
      }
    }
    stage("Try to run compose stack") {
      steps {
        script {
          echo "Trying to run compose stack..."
          dir ("${env.PROJECT_DIR}") {
            // Create voluima folder
            sh "mkdir -p ${env.MONGO_DATABASE_PATH}"
            
            dockerApi.runEnvSpecificDockerCompose()
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
            dockerApi.stopEnvSpecificDockerCompose()
          }
          sleep(3)
        }
      }
    }
    stage("Push images") {
      steps {
        script {
          dockerApi.pushEnvSpecificDockerComposeImages(env.DOCKER_PASSWORD, env.DOCKER_NAME)
        }
      }
    }
    stage("Update/Create Portainer stack") {
      steps {
        script {
          def targetEnvironment = getTargetEnv(env.API_PROCESSOR_API, env.POINTAINER_TARGET_ENVIRONMENT)
          def stacksToRedeploy = getStacksToDeploy(env.API_PROCESSOR_API, "https://${env.GITHUB_URL}")
          def ticker = getTicker()
          
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
            ["name": "NODE_ENV", "value": "${env.NODE_ENV}"],
            ["name": "MONGO_DATABASE_PATH", "value": "${env.MONGO_DATABASE_PATH}"],
            ["name": "MONGODB_HOST_NAME", "value": "${env.MONGODB_HOST_NAME}"]
          ]
          
          if (stacksToRedeploy.size() == 0) {
            println("There is no deployed stack with source url https://${env.GITHUB_URL} in Portainer...")
            println("Initiate new stack...")
            
            def deployRequestBody = [
              "endpointId": "${targetEnvironment.Id}",
              "name": "coincrusade-runner-game${ticker}",
              "repositoryURL": "https://${env.GITHUB_URL}",
              "repositoryAuthentication": true,
              "repositoryUsername": "lukasbriza",
              "repositoryPassword": "${env.GITHUB_PAT}",
              "repositoryReferenceName": getBranchReference(),
              "composeFile": getComposeFileName(),
              "tlsskipVerify": true,
              "fromAppTemplate": false,
              "autoUpdate": null,
              "additionalFiles": null,
              "env":  envBody
            ]
            
            def requestBody = new groovy.json.JsonOutput().toJson(deployRequestBody)
            def deployResponse = portainerApi.deployStack(env.API_PROCESSOR_API, requestBody)

            println("Stack deployed...")
            return
          }

          println("Redeploying existing stacks...")

          for (stackToRedeploy in stacksToRedeploy) {
            println("Redeploying stack with Id: ${stackToRedeploy.Id}...")

            def redeployRequestBody = [
              "endpointId": "${targetEnvironment.Id}",
              "stackId": "${stackToRedeploy.Id}",
              "repositoryAuthentication": true,
              "repositoryUsername": "lukasbriza",
              "repositoryPassword": "${env.GITHUB_PAT}",
              "repositoryReferenceName": getBranchReference(),
              "prune": true,
              "pullImage": true,
              "env": envBody
            ]

            def requestBody = new groovy.json.JsonOutput().toJson(redeployRequestBody)
            def redeployResponse = portainerApi.reDeployStack(env.API_PROCESSOR_API, requestBody)

            println("Redeploy of stack with Id: ${stackToRedeploy.Id} was succesfull...")
          }
        }
      }
    }
  }
  post {
    always {
      script {
        println("Cleaning up...")

        if (fileExists("${env.PROJECT_DIR}")) {
          dir ("${env.PROJECT_DIR}") {
            dockerApi.stopEnvSpecificDockerCompose()
          } 
            sh "rm -rf ${env.PROJECT_DIR}"
        }
        
        dockerApi.cleanDocker()
        recursiveRemoveDir(env.MONGO_DATABASE_PATH)
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
