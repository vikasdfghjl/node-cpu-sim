pipeline {
    agent any

    environment {
        EC2_IP = '3.6.43.50'
        SSH_USER = 'ubuntu'
        GIT_REPO = 'github.com/vikasdfghjl/node-cpu-sim'
        PROJECT_DIR = '/home/ubuntu/node-cpu-sim'
        GITHUB_USERNAME = credentials('GITHUB_USERNAME')
        GITHUB_PASSWORD = credentials('GITHUB_PASSWORD')
    }

    stages {
        stage('Check Docker') {
            steps {
                script {
                    sh """
                    docker --version
                    docker ps
                    ls
                    """
                }
            }
        }
        stage('Update Repository') {
            steps {
                script {
                    sh """
                    cd ${PROJECT_DIR}
                    sudo git pull
                    """
                }
            }
        }
        stage('Stop Docker Containers') {
            steps {
                script {
                    sh """
                    if [ \$(docker ps -q) ]; then
                        sudo docker-compose down
                    fi
                    """
                }
            }
        }
        stage('Start Docker Containers') {
            steps {
                script {
                    sh """
                    sudo docker-compose up -d --build
                    """
                }
            }
        }
    }
}