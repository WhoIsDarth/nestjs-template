FROM node:18-alpine

# Bundle app source
COPY . .

RUN apt update -y && apt install -y openssl

RUN npm install && \
    npm run prisma -- generate && \
    npm run build

# Expose port and start application
EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]
