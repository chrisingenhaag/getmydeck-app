FROM node:16-alpine

WORKDIR /app

COPY build/ /app/
COPY package*.json /app/

RUN npm ci --ignore-scripts

EXPOSE 3000

CMD ["node", "./index.js"]

HEALTHCHECK --interval=5s --timeout=1s \
  CMD curl -f http://localhost:3000 || exit 1