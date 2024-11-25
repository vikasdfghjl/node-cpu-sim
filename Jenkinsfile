pipeline {
    agent any

    environment {
        EC2_IP = '3.6.43.50'
        SSH_USER = 'ubuntu'
        SSH_KEY = credentials('SECRET_KEY')
        GIT_REPO = 'github.com/vikasdfghjl/node-cpu-sim'
        PROJECT_DIR = '/home/ubuntu/node-cpu-sim'
        GITHUB_USERNAME = credentials('GITHUB_USERNAME')
        GITHUB_PASSWORD = credentials('GITHUB_PASSWORD')
    }

    stages {
        stage('Deploy Application') {
            steps {
                script {
                    sh """
                    docker --version
                    docker ps
                    if [ ! -d "${PROJECT_DIR}" ]; then
                        git clone https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@${GIT_REPO} ${PROJECT_DIR}
                    fi
                    cd ${PROJECT_DIR}
                    sudo git pull
                    if [ \$(docker ps -q) ]; then
                        sudo docker-compose down
                    fi
                    sudo docker-compose up -d --build
                    """
                }
            }
        }
    }
}