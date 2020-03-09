FROM node:12.6-alpine

WORKDIR /usr/src/app

COPY . .
RUN yarn install --silent
RUN yarn global add jest

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && yarn start