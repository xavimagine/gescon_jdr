FROM node:18

WORKDIR /usr/app_aaee_jdr

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/jdr/index.js"]
