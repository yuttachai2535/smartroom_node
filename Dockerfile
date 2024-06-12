FROM node:14

WORKDIR /app

COPY package*.json ./

RUN apt-get update && \
    apt-get install -y nano && \
    rm -rf /var/lib/apt/lists/*
    
RUN npm install
RUN npm install -g nodemon
RUN npm install express socket.io

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]