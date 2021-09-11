FROM node:14.7-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn
COPY . ./
ENV DISABLE_ESLINT_PLUGIN true
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"] 
