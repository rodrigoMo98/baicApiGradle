pipeline {
    agent {
        label'ubuntu'
    }
    environment {
        REGISTRY_LINK = '//192.168.100.24:8081/repository/'
        NEXUSPULL= credentials('NEXUS_PULL')
        NEXUSPUSH= credentials('NEXUS_PUSH')
    }
    stages{
//         stage('Build'){
//             steps{
//                 echo 'Build'
//                 sh 'npm install'
//                 sh 'chmod 777 -R node_modules/'
//                 sh 'npm run build'
//             }
//         }
stage('Build') {
      steps {
        withGradle {
          sh 'chmod 777 -R ./'
          sh '''
            ./gradlew registrySetup \
                      nodeSetup \
                      npmInstall \
                      npm_run_build \
                      -PregistryUrl=$REGISTRY_LINK \
                      -PauthToken=$NEXUSPUSH
          '''
        }
      }
    }
        stage('Publish'){
            steps{
//                 echo 'Publish'
//                 sh 'rm -f ${HOME}/.npmrc'
//                 sh 'echo ${REGISTRY_LINK}npm-private/:_authToken=${NEXUSPUSH} > ${HOME}/.npmrc'
//                 sh 'cp ./data.json ./dist/'
//                 sh 'npm publish ./dist --registry=http:${REGISTRY_LINK}npm-private/'
//             }
sh 'cp ./data.json ./dist/'
withGradle {
          sh '''
            ./gradlew npm_publish
          '''
        }
        }
        }
        stage('Deploy'){
            agent {
                label 'ubuntu-deploy'
            }
            options {
                skipDefaultCheckout true
            }
            steps{
                echo 'Deploy'
                sh 'rm -f ${HOME}/.npmrc'
                sh 'echo ${REGISTRY_LINK}npm-private/:_authToken=${NEXUSPULL} > ${HOME}/.npmrc'
                sh 'npm install MybasicApi --registry=http:${REGISTRY_LINK}npm-group/'
                sh 'cp node_modules/MybasicApi/data.json ./'
                //sh 'node ./node_modules/MybasicApi/bundle.js'
            }
        }
    }
}