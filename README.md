# Template NestJS Service

This is a template repository for creating a new NestJS service.

## Prerequisites

- Node.js (version 18 or higher is recommended).
- Docker.
- Git (for cloning the repository).
- PostgreSQL.

## Project Setup

### 1. Clone the repository

Clone the Template NestJS Service repository and navigate into the project directory:

```sh
git clone <repository-url> template-nestjs-service
cd template-nestjs-service
```

```sh
Replace <repository-url> with the actual URL of the repository.
```

### 2. Install dependencies

Inside the project directory, run the following command to install all the dependencies defined in package.json:

```sh
npm install
```

### 3. Run Docker Compose

Inside the project directory, run the following command to launch additional service:

```sh
docker-compose up -d
```

## Running the Service

There are several scripts in the package.json file that can be used to run the service in different modes:

### Start the service in development mode

```sh
npm run start:dev
```

This command starts the service in development mode with hot-reloading enabled.

### Start the service in debug mode

```sh
npm run start:debug
```

This command starts the service in debug mode, which is useful for debugging purposes.

### Start the service in production mode

First, build the project:

```sh
npm run build
```

Now, start the service:

```sh
npm run start:prod
```

This command starts the service in production mode.
