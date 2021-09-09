FROM node:14.7-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn
COPY . ./
EXPOSE 3000
CMD ["yarn", "start"] 
# ENV CI true #https://github.com/facebook/create-react-app/issues/8688
