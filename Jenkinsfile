pipeline {
    agent any
    environment {
      GITHUB_URL = "https://github.com/lukasbriza/coincrusade-runner-game"
      PROJECT_DIR = "coincrusade-runner-game"
      PORTAINER_API = "https://portainer.lukasbriza.eu/api"
      TARGET_POINTAINER_ENVIRONMENT = "Homeport"
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
      stage("Checkout") {
        steps {
          echo "Checking out branch..."
          sh "git clone ${env.GITHUB_URL}.git"
        }
      }
      stage("Build images") {
        steps {
          echo "Building images..."
          dir ("${env.PROJECT_DIR}") {
            sh "docker compose build"
          }
        }
      }
      stage("Try to run compose stack") {
        steps {
          echo "Trying to run compose stack..."
          dir ("${env.PROJECT_DIR}") {
            sh "docker compose up -d"
          }
        }
      }
      stage("Stop stack") {
        steps {
          echo "Stopping composed stack..."
          dir ("${env.PROJECT_DIR}") {
            sh "docker compose down"
          }
        }
      }
      stage("Update/Create Portainer stack") {
        steps {
          script {
            withCredentials([
              string(credentialsId:"GITHUB_PAT", variable: "GITHUB_PAT"),
              string(credentialsId:"PORTAINER_API_KEY", variable: "PORTAINER_API_KEY"),
            ])
            echo "Requesting existing stacks..."
            def stacksResponse = httpRequest customHeaders: [[name: "X-API-KEY", value: "$PORTAINER_API_KEY"]], 
                  httpMode: "GET",
                  url: "${env.PORTAINER_API}/stacks"

            if (stacksResponse.status != 200) {
              echo "Requesting for stacks failed..."
              currentBuild.result = 'FAILURE'
              return
            }
            
            echo "Requesting existing environments..."
            def environmentsResponse = httpRequest customHeaders: [[name: "X-API-KEY", value: "$PORTAINER_API_KEY"]],
                  httpMode: "GET",
                  url: "${env.PORTAINER_API}/endpoints"
            
            if (environmentsResponse.status != 200) {
              echo "Requesting for environments failed..."
              currentBuild.result = 'FAILURE'
              return
            }

            def stacksContent = new groovy.json.JsonSlurper().parseText(stacksResponse.content)
            def environmentsContent = new groovy.json.JsonSlurper().parseText(environmentsResponse.content)

            if (environmentsContent.size() == 0) {
              echo "No available environments for stack initialization..."
              currentBuild.result = 'FAILURE'
              return
            }

            def targetEnvironment = environmentsContent.find { content -> content.Name == "${env.TARGET_POINTAINER_ENVIRONMENT}"}

            if (targetEnvironment == null) {
              echo "There is no environment ${env.TARGET_POINTAINER_ENVIRONMENT} in Portainer..."
              currentBuild.result = 'FAILURE'
              return
            }

            def stacksToRedeploy = stacksContent.findAll { stack -> stack.GitConfig.URL == "${env.GITHUB_URL}"}

            if (stacksToRedeploy.size() == 0) {
              echo "There is no deployed stack with source url ${env.GITHUB_URL} in Portainer..."
              echo "Initiate new stack..."

              def deployUrl = "${env.PORTAINER_API}/stacks/create/standalone/repository?endpointId=${targetEnvironment.Id}"
                
              echo "Creating new stack by calling ${deployUrl}..."

              def deployConnection = new URL(deployUrl).openConnection()
              deployConnection.setRequestMethod("POST")
              deployConnection.setRequestProperty("Content-Type", "application/json")
              deployConnection.setRequestProperty("X-API-KEY", "$PORTAINER_API_KEY")
              deployConnection.doOutput = true
              def deployRequestBody = new groovy.json.JsonOutput().toJson([
                "name": "coincrusade-runner-game",
                "repositoryURL": "https://github.com/lukasbriza/coincrusade-runner-game",
                "repositoryAuthentication": true,
                "repositoryUsername": "lukasbriza",
                "repositoryPassword": "$GITHUB_PAT",
                "repositoryReferenceName": "refs/heads/master",
                "composeFile": "docker-compose.yml",
                "tlsskipVerify": false,
                "fromAppTemplate": false,
                "autoUpdate": null,
                "additionalFiles": null,
                "env": null
              ])
              deployConnection.outputStream.write(deployRequestBody.getBytes("UTF-8"))
              deployConnection.outputStream.close()
              def deployResponseStatus = deployConnection.getResponseCode()

              if (deployResponseStatus != 200) {
                echo "Deploying new stack into Portainer failed..."
                currentBuild.result = 'FAILURE'
                return
              }

              return              
            }

            echo "Redeploying existing stacks..."

            for (stackToRedeploy in stacksToRedeploy) {
              def redeployUrl = "${env.PORTAINER_API}/stacks/${stackToRedeploy.Id}/git/redeploy?endpointId=${targetEnvironment.Id}"
              echo "Redeploying stack with Id: ${stackToRedeploy.Id} calling ${redeployUrl}..."

              def redeployConnection = new URL(redeployUrl).openConnection()
              redeployConnection.setRequestMethod("PUT")
              redeployConnection.setRequestProperty("Content-Type", "application/json")
              redeployConnection.setRequestProperty("X-API-KEY", "$PORTAINER_API_KEY")
              redeployConnection.doOutput = true
              def redeployRequestBody = new groovy.json.JsonOutput().toJson([
                "env": [],
                "repositoryAuthentication": true,
                "repositoryUsername": "lukasbriza",
                "repositoryPassword": "${env.GITHUB_PAT}",
                "repositoryReferenceName": "refs/heads/master",
                "prune": false,
                "pullImage": false
              ])
              redeployConnection.outputStream.write(redeployRequestBody.getBytes("UTF-8"))
              redeployConnection.outputStream.close()
              def redeployResponseStatus = redeployConnection.getResponseCode()

              if (redeployResponseStatus != 200) {
                echo "Redeployin of stack with Id: ${stackToRedeploy.Id} failed..."
                currentBuild.result = 'FAILURE'
                return
              }

              echo "Redeploy of stack with Id: ${stackToRedeploy.Id} was succesfull..."
            }
          }
        }
      }
    }
    post {
      always {
        script {
          echo "Cleaning up..."

          if (fileExists("${env.PROJECT_DIR}")) {
            dir ("${env.PROJECT_DIR}") {
              sh "docker compose down"
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
