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
        stage('SSH into EC2') {
            steps {
                script {
                    sh """
                    ssh -o StrictHostKeyChecking=no -tt -i ${SSH_KEY} ${SSH_USER}@${EC2_IP} << EOF
                    exit
EOF
                    """
                }
            }
        }
        stage('Fetch Changes') {
            steps {
                script {
                    sh """
                    ssh -o StrictHostKeyChecking=no -tt -i ${SSH_KEY} ${SSH_USER}@${EC2_IP} << EOF
                        cd ${PROJECT_DIR}
                        sudo git pull
EOF
                    """
                }
            }
        }
        stage('Stop Docker Containers') {
            steps {
                script {
                    sh """
                    ssh -o StrictHostKeyChecking=no -tt -i ${SSH_KEY} ${SSH_USER}@${EC2_IP} << EOF
                        if [ \$(sudo docker ps -q) ]; then
                            sudo docker-compose down
                        fi
EOF
                    """
                }
            }
        }
        stage('Prune Docker Network') {
            steps {
                script {
                    sh """
                    ssh -o StrictHostKeyChecking=no -tt -i ${SSH_KEY} ${SSH_USER}@${EC2_IP} << EOF
                        sudo docker network prune -f || true
EOF
                    """
                }
            }
        }
        stage('Start Docker Containers') {
            steps {
                script {
                    sh """
                    ssh -o StrictHostKeyChecking=no -tt -i ${SSH_KEY} ${SSH_USER}@${EC2_IP} << EOF
                        sudo docker-compose up -d --build
EOF
                    """
                }
            }
        }
    }
}