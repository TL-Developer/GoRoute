FROM node:18.20.4-alpine

RUN npm install -g @nestjs/cli@10.4.9

# if error with SSL
# RUN apt update && \
#     apt install openssl procps -y && \
#     npm install -g @nestjs/cli@10.4.9

USER node

WORKDIR /home/node/nestjs

CMD [ "tail", "-f", "/dev/null" ]