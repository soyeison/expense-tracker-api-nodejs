# Expense Tracker API

Expense Tracker API is a basic RESTful API built with NestJS and TypeORM, using PostgreSQL as the database. It provides authentication via JWT and includes a `docker-compose` file for running a local test database.

## Features

- Authentication using JWT
- CRUD operations for four main entities
- PostgreSQL database integration
- TypeORM for database management
- Docker support for local testing

## Requirements

- Node.js 20+
- Docker (for local database testing)
- PostgreSQL

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/soyeison/expense-tracker-api.git
   cd expense-tracker-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the root directory and set the required environment variables like .env.example file.

## Running the Application

### Start the PostgreSQL Database Locally

If you want to use a local database for testing, start it with Docker:

```sh
   docker-compose up -d
```

### Start the Development Server

```sh
   npm run start
```

### Start in Watch Mode (Hot Reload)

```sh
   npm run start:dev
```

## API Documentation

You can access the API documentation via Swagger once the application is running:

```
   http://localhost:3000/api
```

## License

This project is licensed under the MIT License.

This project is one of begginner projects in Roadmap.sh: https://roadmap.sh/projects/expense-tracker-api
