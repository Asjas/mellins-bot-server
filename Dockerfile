FROM node:16.10.0

EXPOSE 6500

RUN mkdir /app
WORKDIR /app

COPY . .
RUN npm i

RUN npm run prisma:generate

RUN npm run build

CMD ["node", "dist/index.js"]
