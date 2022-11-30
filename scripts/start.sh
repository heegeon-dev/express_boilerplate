#!/bin/bash
NAME="season_backend"
PORT=""

dpkg -l | grep docker
dockerInstall=$?

if [ $dockerInstall == 1 ];then
        sudo apt update -y
        sudo apt upgrade -y
        sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common -y
        sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
        sudo add-apt-repository \
                "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
                $(lsb_release -cs) \
                stable"

        sudo apt update -y && sudo apt install docker-ce -y
        sudo usermod -aG docker $USER
fi

image=`cat /home/ubuntu/$NAME/imagedefinitions.json`

echo $image

sudo docker stop $NAME
sudo docker rm $NAME

aws --version
awsInstall=$?

if [ $awsInstall != 0 ];then
        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
        unzip awscliv2.zip
        sudo ./aws/install
fi

sudo aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $awsid.dkr.ecr.ap-northeast-2.amazonaws.com

docker pull $image

docker run -d -p $PORT:$PORT --env NODE_ENV=dev -e TZ=Asia/Seoul --name $NAME $image 
