pipeline {
    agent any

    environment {
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
                    git pull
                    """
                }
            }
        }
        stage('Stop Docker Containers') {
            steps {
                script {
                    sh """
                    CONTAINERS_RUNNING=\$(docker ps -q)
                    if [ -n "\$CONTAINERS_RUNNING" ]; then
                        docker-compose down 
                    else
                        echo "No running containers"
                    fi
                    """
                }
            }
        }
        stage('Start Docker Containers') {
            steps {
                script {
                    sh """
                    docker-compose up -d --build
                    """
                }
            }
        }
    }
}