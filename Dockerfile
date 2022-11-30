FROM node:16.13.1 AS builder

LABEL title=""
LABEL company=""
LABEL companyMail=""
LABEL author="hgkim"
LABEL devEmail=""

ENV NODE_ENV=dev
WORKDIR /home/mapsea_dev/season_backend
COPY . .
RUN npm install
RUN npm i -g pm2 
RUN pm2 install pm2-logrotate

CMD pm2-runtime start ecosystem.config.js --env $NODE_ENV
# ENTRYPOINT [ "pm2-runtime start ecosystem.config.js --env " ,$ENV ]