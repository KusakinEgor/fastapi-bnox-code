FROM node:22.18.0-alpine

WORKDIR /frontend

COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
