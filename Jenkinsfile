node{
    stage('SCM checkout'){
        git branch: 'main', credentialsId: '47443100-f4b6-4ca3-8183-62fc68353c7a', url: 'https://github.com/F21AO/Patient-Management-System.git'
    }
    stage('Create a build'){
 bat 'npm install'
    }
    stage('Continous testing'){
        bat 'npm test'
    }
    stage('Build Docker Image'){
        bat 'docker build -t devopsgroup1/devops-stage2:testimg .'
    }
    stage('Push Docker Image'){
        bat '''docker login --username=devopsgroup1 --password=1234567890
docker push devopsgroup1/devops-stage2:testimg'''
    }
    stage('Run container on the prod server'){
       bat '''docker rm -f  devpipelinecontainer
docker run -p 8881:8081 -d --name devpipelinecontainer devopsgroup1/devops-stage2:testimg'''
    }
    stage('Deploying into k8s'){
        bat 'kubectl apply -f C:\\Users\\admin\\Desktop\\deployment.yaml'
    }
    
}
