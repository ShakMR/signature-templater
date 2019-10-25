FROM node:carbon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY build /usr/src/app/build
COPY package-lock.json /usr/src/app
COPY server /usr/src/app/server

ENV NODE_ENV=production

RUN npm install --production

ENV VIRTUAL_HOST=signat.suilabs.com
ENV LETSENCRYPT_HOST=signat.suilabs.com
ENV LETSENCRYPT_EMAIL=borja.arias.upc@gmail.com

EXPOSE 5000

CMD [ "npm", "run", "start:server" ]
