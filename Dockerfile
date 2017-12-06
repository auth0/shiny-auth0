FROM node:boron

WORKDIR /usr/src/app
VOLUME .:/usr/src/app

COPY package.json package-lock.json ./
RUN npm install
COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]
