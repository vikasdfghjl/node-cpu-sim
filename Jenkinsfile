pipeline {
    agent any

    environment {
        EC2_IP = '13.234.12.112'
        SSH_USER = 'ubuntu'
        SSH_KEY = 'path-to-your-private-key'
        GIT_REPO = 'https://github.com/vikasdfghjl/node-cpu-sim'
        PROJECT_DIR = '/home/ubuntu/node-cpu-sim'
    }

    stages {
        stage('SSH into EC2 and Fetch Changes') {
            steps {
                script {
                    sh """
                    ssh -i ${SSH_KEY} ${SSH_USER}@${EC2_IP} << EOF
                        cd ${PROJECT_DIR}
                        git pull ${GIT_REPO}
                        ./build.sh
                        docker-compose down
                        docker-compose up -d
                    EOF
                    """
                }
            }
        }
    }
}