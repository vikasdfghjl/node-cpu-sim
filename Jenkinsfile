pipeline {
    agent any

    environment {
        EC2_IP = '13.234.12.112'
        SSH_USER = 'ubuntu'
        SSH_KEY = credentials('SECRET_KEY')
        GIT_REPO = 'https://github.com/vikasdfghjl/node-cpu-sim'
        PROJECT_DIR = '/home/ubuntu/node-cpu-sim'
        GITHUB_USERNAME = credentials('GITHUB_USERNAME')
        GITHUB_PASSWORD = credentials('GITHUB_PASSWORD')
    }

    stages {
        stage('SSH into EC2 and Fetch Changes') {
            steps {
                script {
                    sh """
                    ssh -o StrictHostKeyChecking=no -tt -i ${SSH_KEY} ${SSH_USER}@${EC2_IP} << EOF
                        cd ${PROJECT_DIR}
                        git pull https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@${GIT_REPO}
                        if [ \$(docker ps -q) ]; then
                            docker-compose down
                        fi
                        docker-compose up -d --build
                    EOF
                    """
                }
            }
        }
    }
}