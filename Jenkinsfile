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
                    ssh -o StrictHostKeyChecking=no -tt -i ${SSH_KEY} ${SSH_USER}@${EC2_IP} << EOF
                    cd ${PROJECT_DIR}
                    git pull
                    if [ \$(docker ps -q) ]; then
                        sudo docker-compose down
                    fi
                    sudo docker-compose up -d --build
                    exit
                    EOF
                    """
                }
            }
        }
    }
}