FROM node:16
ENV NODE_ENV=production
WORKDIR /server
RUN df -h
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY ./build .
EXPOSE 5000
CMD ["node", "server.js"]
 