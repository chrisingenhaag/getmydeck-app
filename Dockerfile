FROM node:18-alpine

LABEL org.opencontainers.image.source=https://github.com/chrisingenhaag/getmydeck-app

WORKDIR /app

COPY build/ /app/
COPY package*.json /app/

RUN npm ci --production --ignore-scripts

EXPOSE 3000

CMD ["node", "./index.js"]

HEALTHCHECK --interval=5s --timeout=1s \
  CMD wget -S -q -O /dev/null http://localhost:3000 || exit 1