node {

    stage('Init'){
        echo 'Starting pipeline'
    }

    stage('Git checkout') {
        git 'https://github.com/ValeHenriquez/user-management.git'
        script {
            env.BRANCH_NAME = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
        }
        echo "Branch name: ${env.BRANCH_NAME}"
    }
    
    stage('Docker Build image') {
        sh 'docker image build -t $JOB_NAME:v1.$BUILD_ID .'
    }
    
    stage('Docker Image tagging') {
        sh 'docker image tag $JOB_NAME:v1.$BUILD_ID valehenriquez/$JOB_NAME:v1.$BUILD_ID'
        sh 'docker image tag $JOB_NAME:v1.$BUILD_ID valehenriquez/$JOB_NAME:latest'
    }
    
    stage('Push docker images to docker hub') {
        withCredentials([string(credentialsId: 'dockehub_password', variable: 'dockehub_password')]) {
            sh "docker login -u valehenriquez -p ${dockehub_password}"
            sh 'docker image push valehenriquez/$JOB_NAME:v1.$BUILD_ID'
            sh 'docker image push valehenriquez/$JOB_NAME:latest'
        }
    }
    
    stage('Copy files to Kubernetes server') {
        sshagent(['ansible_demo']) {
            sh "ssh -o StrictHostKeyChecking=no ubuntu@172.31.16.140"
            sh 'scp -r /var/lib/jenkins/workspace/pipeline-devops/* ubuntu@172.31.16.140:/home/ubuntu'
        }
    }
    
    stage('Deploy k8s') {
        sshagent(['ansible_demo']) {
            if (env.BRANCH_NAME == 'dev') {
                echo 'Deploying to development environment'
                sh 'ssh -o StrictHostKeyChecking=no ubuntu@172.31.16.140 kubectl delete -f /home/ubuntu/DevDeployment.yml --ignore-not-found=true'
                sh 'ssh -o StrictHostKeyChecking=no ubuntu@172.31.16.140 kubectl delete -f /home/ubuntu/DevService.yml --ignore-not-found=true'
                sh 'ssh -o StrictHostKeyChecking=no ubuntu@172.31.16.140 kubectl apply -f /home/ubuntu/DevDeployment.yml --validate=false'
                sh 'ssh -o StrictHostKeyChecking=no ubuntu@172.31.16.140 kubectl apply -f /home/ubuntu/DevService.yml --validate=false'
            } else if (env.BRANCH_NAME == 'master') {
                echo 'Deploying to production environment'
                sh 'ssh -o StrictHostKeyChecking=no ubuntu@172.31.16.140 kubectl delete -f /home/ubuntu/Deployment.yml --ignore-not-found=true'
                sh 'ssh -o StrictHostKeyChecking=no ubuntu@172.31.16.140 kubectl delete -f /home/ubuntu/Service.yml --ignore-not-found=true'
                sh 'ssh -o StrictHostKeyChecking=no ubuntu@172.31.16.140 kubectl apply -f /home/ubuntu/Deployment.yml --validate=false'
                sh 'ssh -o StrictHostKeyChecking=no ubuntu@172.31.16.140 kubectl apply -f /home/ubuntu/Service.yml --validate=false'
            } else {
                echo 'Branch not recognized. No deployment will be performed.'
            }
        }
    }
}
