FROM node:8

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV production
RUN npm run build

EXPOSE 8000
CMD ["node", "server.js"]
