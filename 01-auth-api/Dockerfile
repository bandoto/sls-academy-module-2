FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

COPY ./build ./build

CMD ["npm", "run", "dev"]