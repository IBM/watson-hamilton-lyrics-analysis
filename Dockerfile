FROM node:8-alpine

COPY . /

RUN npm install

EXPOSE 6001

CMD ["node", "app.js"]

