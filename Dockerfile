FROM node:11

WORKDIR /todo

COPY . .

RUN npm install

CMD ["npm","start"]