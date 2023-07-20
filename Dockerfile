FROM node:16-alpine
WORKDIR /app
COPY . .
RUN yarn

ENV NEXT_PUBLIC_API_URL="https://api.thithuthpt.click/server/web"
ENV NEXT_PUBLIC_API_UPLOAD="https://api.thithuthpt.click/server/uploads"
ENV NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY="cookie_access_token_key"
ENV NEXT_PUBLIC_COOKIE_REFRESH_ACCESS_TOKEN_KEY="cookie_refresh_access_token_key"
EXPOSE 3000
RUN yarn build
CMD ["yarn", "start"]
