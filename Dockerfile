FROM node:16.9.1-alpine

EXPOSE 3000

ENV NODE_ENV production

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --production && npm cache clear --force
COPY --chown=node:node . .

RUN npm run prisma:generate

RUN npm run build:docker

CMD ["node", "dist/index.mjs"]
