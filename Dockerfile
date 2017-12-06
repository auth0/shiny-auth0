FROM node:boron

WORKDIR /usr/src/app
VOLUME .:/usr/src/app

COPY . /usr/src/app
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
