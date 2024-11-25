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
        SSH_CMD = "ssh -o StrictHostKeyChecking=no -tt -i ${SSH_KEY} ${SSH_USER}@${EC2_IP}"
    }

    stages {
        stage('SSH into EC2') {
            steps {
                script {
                    sh "${SSH_CMD} exit"
                }
            }
        }
        stage('Fetch Changes') {
            steps {
                script {
                    sh """
                        ${SSH_CMD} << EOF
                        cd ${PROJECT_DIR}
                        git pull
                        EOF
                    """
                }
            }
        }
        stage('Manage Docker Containers') {
            steps {
                script {
                    sh """
                        ${SSH_CMD} << EOF
                        if [ \$(sudo docker ps -q) ]; then
                            sudo docker-compose down
                        fi
                        sudo docker network prune -f || true
                        sudo docker-compose up -d --build
                        EOF
                    """
                }
            }
        }
    }
}
