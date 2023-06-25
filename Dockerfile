FROM node:18.10.0-alpine

ENV DATABASE_HOST examplevalue
ENV DATABASE_PORT examplevalue
ENV DATABASE_USER examplevalue
ENV DATABASE_PASSWORD examplevalue
ENV DATABASE_NAME examplevalue
ENV MIRGATIONS_RUN examplevalue
ENV AWS_ACCESS_KEY examplevalue
ENV AWS_SECRET_ACCESS_KEY examplevalue
ENV AWS_SESSION examplevalue
ENV COGNITO_CLIENT_ID examplevalue
ENV COGNITO_REGION examplevalue
ENV COGNITO_POOL_ID examplevalue

WORKDIR /app

COPY . .

RUN yarn install --production=false --frozen-lockfile

RUN ["chmod", "+x", "entrypoint.sh"]

ENTRYPOINT [ "./entrypoint.sh" ]