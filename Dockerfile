FROM node:20.11.1
ADD ./ ./
RUN npm i pnpm -g
RUN pnpm i
RUN pnpm build
CMD [ "pnpm","start:prod" ]
EXPOSE 3000
