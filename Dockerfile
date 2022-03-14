FROM node:16.14-alpine as base
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run build

FROM node:16.14-alpine as prod
RUN mkdir /app
WORKDIR /app
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npx","next", "start"]