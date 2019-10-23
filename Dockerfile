FROM node:carbon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY src /usr/src/app/src
COPY package-lock.json /usr/src/app
COPY public /usr/src/app/public

ENV NODE_ENV=production

RUN npm install
RUN npm install -g serve

ENV VIRTUAL_HOST=signat.suilabs.com
ENV LETSENCRYPT_HOST=signat.suilabs.com
ENV LETSENCRYPT_EMAIL=borja.arias.upc@gmail.com

EXPOSE 5000

CMD [ "serve", "-s", "build" ]