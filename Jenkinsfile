@Library('jenkins-shared-library') _

import api.ApiProcessor
import api.DockerApi


pipeline {
  agent any
  environment {
    GITHUB_URL = "github.com/lukasbriza/coincrusade-runner-game"
    PROJECT_DIR = "coincrusade-runner-game"
  }
  stages {
    stage("Check workspace") {
      when {
        expression { fileExists(env.PROJECT_DIR) }
      }
      steps {
        script {
          checkWorkspace("${env.PROJECT_DIR}")
        }
      }
    }

    stage("Checking prerequisities") {
      steps {
        script {
          // Creates in env: PLATFORM, PROJECT_NAME, ENVIRONMENT, VERSION, COMPOSE_FILE_NAME
          checkPrerequisities(4, env.BRANCH_NAME, env.API_PROCESSOR_API)
        }
      }
    }

    stage("Fetch secrets") {
      steps {
        script {
          def api = new ApiProcessor(this)
          def sharedSecrets = api.getProjectSecrets(env.API_PROCESSOR_API, env.PLATFORM, "shared", env.ENVIRONMENT)
          def secrets = api.getProjectSecrets(env.API_PROCESSOR_API, env.PLATFORM, env.PROJECT_NAME, env.ENVIRONMENT)

          env.DOCKER_NAME = sharedSecrets["DOCKER_NAME"]
          env.DOCKER_PASSWORD = sharedSecrets["DOCKER_PASSWORD"]
          env.SEND_EMAIL_ADDRESS = sharedSecrets["SEND_EMAIL_ADDRESS"]
          env.GITHUB_PAT = sharedSecrets["GITHUB_PAT"]

          // COMMON
          env.NODE_ENV = secrets["NODE_ENV"]
          env.API_KEY = secrets["API_KEY"]
          env.POSTGRES_PASSWORD = secrets["POSTGRES_PASSWORD"]
          env.POSTGRES_USER = secrets["POSTGRES_USER"]
          env.POSTGRES_HOST = secrets["POSTGRES_HOST"]
          env.DATABASE_NAME = secrets["DATABASE_NAME"]
          
          // FRONTEND
          env.HOST_FRONTEND_PORT = secrets["HOST_FRONTEND_PORT"]
          env.NEXT_PUBLIC_GITHUB = secrets["NEXT_PUBLIC_GITHUB"]
          env.NEXT_PUBLIC_MAIL = secrets["NEXT_PUBLIC_MAIL"]
          env.API_URL = secrets["API_URL"]

          // BACKEND
          env.DATABASE_URL = secrets["DATABASE_URL"]
          env.HOST_BACKEND_PORT = secrets["HOST_BACKEND_PORT"]
          env.MAIL_RECIPIENT = secrets["MAIL_RECIPIENT"]
          env.MAIL_MODULE_HOST = secrets["MAIL_MODULE_HOST"]
          env.MAIL_MODULE_USER = secrets["MAIL_MODULE_USER"]
          env.MAIL_MODULE_PASSPHRASE = secrets["MAIL_MODULE_PASSPHRASE"]

          // DATABASE
          env.HOST_DATABASE_PORT = secrets["HOST_DATABASE_PORT"]
          env.HOST_DATABASE_PATH = secrets["HOST_DATABASE_PATH"]
        }
      }
    }

    stage("Clone branch") {
      steps {
        script {
          cloneBranch("https://lukasbriza:${env.GITHUB_PAT}@${env.GITHUB_URL}.git")
        }
      }
    }

    stage("Run tests") {
      steps {
        script {
          runComposeFile("docker/tests/docker-compose-run-tests.yaml", [env.HOST_DATABASE_PATH], false)
        }
      }
    }

    stage("Build Docker images") {
      steps {
        script {
          buildImages(env.COMPOSE_FILE_NAME)
        }
      }
    }

    stage("Try to run stack") {
      steps {
        script {
          runComposeFile(env.COMPOSE_FILE_NAME, [env.HOST_DATABASE_PATH])
        }
      }
    }

    stage("Stop stack") {
      steps {
        script {
          stopComposeStack(env.COMPOSE_FILE_NAME)
        }
      }
    }

    stage("Push images") {
      steps {
        script {
          retry(2){
            pushComposeFile(env.DOCKER_PASSWORD, env.DOCKER_NAME, env.COMPOSE_FILE_NAME)
          }
        }
      }
    }

    stage("Deploy application") {
      steps {
        script {
          deploy(
            env.API_PROCESSOR_API,
            env.PLATFORM,
            env.PROJECT_NAME,
            env.ENVIRONMENT,
            "https://${env.GITHUB_URL}",
            "lukasbriza",
            env.GITHUB_PAT,
            env.COMPOSE_FILE_NAME,
            [
              ["name": "NEXT_PUBLIC_GITHUB", "value": "${env.NEXT_PUBLIC_GITHUB}"],
              ["name": "NEXT_PUBLIC_MAIL", "value": "${env.NEXT_PUBLIC_MAIL}"],
              ["name": "API_KEY", "value": "${env.API_KEY}"],
              ["name": "API_URL", "value": "${env.API_URL}"],
              ["name": "DATABASE_PORT", "value": "${env.DATABASE_PORT}"],
              ["name": "BACKEND_PORT", "value": "${env.BACKEND_PORT}"],
              ["name": "FRONTEND_PORT", "value": "${env.FRONTEND_PORT}"],
              ["name": "POSTGRES_PASSWORD", "value": "${env.POSTGRES_PASSWORD}"],
              ["name": "POSTGRES_USER", "value": "${env.POSTGRES_USER}"],
              ["name": "DATABASE_URL", "value": "${env.DATABASE_URL}"],
              ["name": "DATABASE_NAME", "value": "${env.DATABASE_NAME}"],
              ["name": "NODE_ENV", "value": "${env.NODE_ENV}"],
              ["name": "DATABASE_PATH", "value": "${env.DATABASE_PATH}"],
              ["name": "POSTGRES_HOST", "value": "${env.POSTGRES_HOST}"],
              ["name": "MAIL_RECIPIENT", "value": "${env.MAIL_RECIPIENT}"],
              ["name": "MAIL_MODULE_HOST", "value": "${env.MAIL_MODULE_HOST}"],
              ["name": "MAIL_MODULE_USER", "value": "${env.MAIL_MODULE_USER}"],
              ["name": "MAIL_MODULE_PASSPHRASE", "value": "${env.MAIL_MODULE_PASSPHRASE}"],
              ["name": "HOST_BACKEND_PORT", "value": "${env.HOST_BACKEND_PORT}"],
              ["name": "HOST_FRONTEND_PORT", "value": "${env.HOST_FRONTEND_PORT}"],
              ["name": "HOST_DATABASE_PATH", "value": "${env.HOST_DATABASE_PATH}"],
              ["name": "HOST_DATABASE_PORT", "value": "${env.HOST_DATABASE_PORT}"]
            ]
          )
        }
      }
    }
  }
  post {
    always {
      script {
        echo "ℹ️ Cleaning up"
        def dockerApi = new DockerApi(this)

        if (fileExists("${env.PROJECT_DIR}")) {
          dir ("${env.PROJECT_DIR}") {
            dockerApi.stopDockerCompose(env.COMPOSE_FILE_NAME)
          } 
            sh "rm -rf ${env.PROJECT_DIR}"
        }
        
        dockerApi.cleanDocker()
        def utils = new Utils(this)
        utils.recursiveRemoveDir(env.HOST_DATABASE_PATH)
      }
    }

    success {
      echo "✅ Job succeeded!"

      mail to: "${env.SEND_EMAIL_ADDRESS}",
        subject: "Jenkins: Job of tag/branch ${env.BRANCH_NAME} ${env.BUILD_DISPLAY_NAME} succeeded!",
        body: """
          Project ${env.PROJECT_DIR}:
          Job ${env.BUILD_DISPLAY_NAME} with url ${env.JOB_URL} succeeded!
          For more information visit url above. 
        """
    }

    failure {
      echo "❎ Build failed!"

       mail to: "${env.SEND_EMAIL_ADDRESS}",
        subject: "Jenkins: Job of tag/branch ${env.PROJECT_DIR} ${env.BUILD_DISPLAY_NAME} failed!",
        body: """
          Project ${env.PROJECT_DIR}:
          Job ${env.BUILD_DISPLAY_NAME} with url ${env.JOB_URL} failed!
          For more information visit url above. 
        """
    }
  }
}
