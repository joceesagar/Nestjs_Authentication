# 📘 NestJS Bookmarks API

A production-ready REST API built with **NestJS**, **Prisma ORM**, **PostgreSQL**, **Docker**, and **JWT authentication**.  
This project was developed while following the freeCodeCamp NestJS course and demonstrates modern backend development practices.

---

## 🚀 Features

### 🔐 Authentication

- User registration & login
- Secure password hashing using **argon2**
- JWT-based authentication using **Passport**
- Protected routes using **Guards**

### 📑 Bookmark Management

- Create new bookmarks
- Retrieve all bookmarks of the authenticated user
- Retrieve a single bookmark by ID
- Update bookmark details
- Delete bookmark

### 🛠 Tech Stack

- **NestJS** – Modular backend framework
- **Prisma** – Type-safe ORM
- **PostgreSQL** – Relational database
- **Docker** – Database containerization
- **Pactum** – End-to-end API testing
- **TypeScript**

---

## 📜 Available Scripts

| Script                   | Description                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `npm run db:dev:restart` | Removes the dev DB container, recreates it, waits 1s, and deploys Prisma migrations. |
| `npm run build`          | Builds the NestJS application.                                                       |
| `npm run format`         | Formats all `.ts` files using Prettier.                                              |
| `npm run start`          | Starts the application.                                                              |
| `npm run start:dev`      | Starts the app in watch mode (development).                                          |
