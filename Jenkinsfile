#!/usr/bin/env groovy

node {

    jdk = tool name: 'JDK9'
    env.JAVA_HOME = "${jdk}"

    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        sh "${jdk}/bin/java -version"
    }

    stage('clean') {
        sh "chmod +x mvnw"
        sh "./mvnw -ntp clean"
    }

    stage('install tools') {
        sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:install-node-and-npm -DnodeVersion=v10.16.3 -DnpmVersion=6.11.3"
    }

    stage('npm install') {
        sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:npm"
    }

    stage('backend tests') {
        try {
            sh "./mvnw -ntp verify"
        } catch(err) {
            throw err
        } finally {
            junit '**/target/test-results/**/TEST-*.xml'
        }
    }

    stage('packaging') {
        sh "./mvnw -ntp verify -Pprod,war,swagger -DskipTests"
        archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
    }
}
