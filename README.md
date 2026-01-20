# BookMyShow Backend API

A production-ready Node.js/Express backend API for a movie ticket booking system built with TypeScript, MongoDB, and JWT authentication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Database Models](#database-models)
- [Contributing](#contributing)
- [License](#license)

## Features

✅ **User Management**
- User registration and login
- JWT-based authentication with access/refresh tokens
- Password hashing with bcrypt
- User profile management

✅ **Movie & Theatre Management**
- Browse cities and theatres
- Manage movie listings with details
- Create and manage screens and shows
- Price management

✅ **Booking System**
- Book movie tickets
- Cancel bookings
- Seat management
- Booking history

✅ **Reviews & Ratings**
- Leave reviews and ratings for movies
- View movie reviews
- Update/delete reviews

✅ **Security**
- Role-based access control (USER/ADMIN)
- Resource ownership validation
- Global error handling
- CORS protection

✅ **Documentation**
- Interactive Swagger/OpenAPI documentation at `/api-docs`
- Postman collection with all endpoints
- Comprehensive API documentation

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **API Documentation**: Swagger/OpenAPI with swagger-ui-express
- **Security**: CORS, dotenv for environment variables

## Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/bookmyshow-backend.git
cd bookmyshow-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Update .env with your configuration**
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookmyshow
NODE_ENV=development

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-change-this
JWT_EXPIRY=24h

CORS_ORIGIN=*
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/bookmyshow |
| `NODE_ENV` | Environment (development/production) | development |
| `JWT_SECRET` | Secret key for JWT signing | - |
| `REFRESH_TOKEN_SECRET` | Secret for refresh tokens | - |
| `JWT_EXPIRY` | Access token expiry time | 24h |
| `CORS_ORIGIN` | CORS allowed origins | * |

## Running the Server

### Development Mode
```bash
npm run dev
```
This starts the server with `ts-node` for hot-reload development.

### Production Build
```bash
npm run build
npm start
```

### Build Only
```bash
npm run build
```

The server will start on `http://localhost:3000` and MongoDB connection will be established.

## API Documentation

### Interactive Documentation

Access the interactive Swagger UI at:
```
http://localhost:3000/api-docs
```

### Base URL
```
http://localhost:3000/api
```

### Main Endpoints

#### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/refresh` - Refresh access token
- `GET /api/users/profile` - Get user profile (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `PUT /api/users/:id` - Update user (protected)
- `POST /api/users/:id/change-password` - Change password (protected)
- `GET /api/users` - Get all users (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

#### Cities
- `GET /api/cities` - Get all cities
- `GET /api/cities/:id` - Get city by ID
- `POST /api/cities` - Create city (admin only)
- `PUT /api/cities/:id` - Update city (admin only)
- `DELETE /api/cities/:id` - Delete city (admin only)

#### Theatres
- `GET /api/theatres` - Get all theatres
- `GET /api/theatres/:id` - Get theatre by ID
- `POST /api/theatres` - Create theatre (admin only)
- `PUT /api/theatres/:id` - Update theatre (admin only)
- `DELETE /api/theatres/:id` - Delete theatre (admin only)

#### Screens
- `GET /api/screens` - Get all screens
- `GET /api/screens/:id` - Get screen by ID
- `POST /api/screens` - Create screen (admin only)
- `PUT /api/screens/:id` - Update screen (admin only)
- `DELETE /api/screens/:id` - Delete screen (admin only)

#### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create movie (admin only)
- `PUT /api/movies/:id` - Update movie (admin only)
- `DELETE /api/movies/:id` - Delete movie (admin only)

#### Shows
- `GET /api/shows` - Get all shows
- `GET /api/shows/:id` - Get show by ID
- `POST /api/shows` - Create show (admin only)
- `PUT /api/shows/:id` - Update show (admin only)
- `DELETE /api/shows/:id` - Delete show (admin only)

#### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings/:id` - Get booking by ID (protected)
- `GET /api/bookings/user/:userId` - Get user's bookings (protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (protected)

#### Reviews
- `GET /api/reviews/movie/:movieId` - Get movie reviews
- `GET /api/reviews/user/:userId` - Get user reviews
- `POST /api/reviews` - Create review (protected)
- `PUT /api/reviews/:id` - Update review (protected)
- `DELETE /api/reviews/:id` - Delete review (protected)

## Project Structure

```
bookmyshow-backend/
├── src/
│   ├── config/
│   │   ├── database.ts          # MongoDB connection configuration
│   │   └── swagger.ts           # Swagger/OpenAPI configuration
│   ├── controllers/
│   │   ├── userController.ts    # User CRUD operations
│   │   ├── cityController.ts    # City management
│   │   ├── theatreController.ts # Theatre management
│   │   ├── screenController.ts  # Screen management
│   │   ├── movieController.ts   # Movie management
│   │   ├── showController.ts    # Show management
│   │   ├── bookingController.ts # Booking operations
│   │   └── reviewController.ts  # Review operations
│   ├── models/
│   │   ├── User.ts              # User schema
│   │   ├── City.ts              # City schema
│   │   ├── Theatre.ts           # Theatre schema
│   │   ├── Screen.ts            # Screen schema
│   │   ├── Movie.ts             # Movie schema
│   │   ├── Show.ts              # Show schema
│   │   ├── Booking.ts           # Booking schema
│   │   └── Review.ts            # Review schema
│   ├── middleware/
│   │   ├── authMiddleware.ts    # JWT verification
│   │   ├── authorizationMiddleware.ts # Role-based access control
│   │   └── errorHandler.ts      # Global error handling
│   ├── routes/
│   │   ├── userRoutes.ts        # User routes
│   │   ├── cityRoutes.ts        # City routes
│   │   ├── theatreRoutes.ts     # Theatre routes
│   │   ├── screenRoutes.ts      # Screen routes
│   │   ├── movieRoutes.ts       # Movie routes
│   │   ├── showRoutes.ts        # Show routes
│   │   ├── bookingRoutes.ts     # Booking routes
│   │   └── reviewRoutes.ts      # Review routes
│   ├── types/
│   │   └── auth.ts              # TypeScript type definitions
│   ├── utils/
│   │   └── jwt.ts               # JWT utility functions
│   └── index.ts                 # Application entry point
├── .env                         # Environment variables (not tracked)
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## Authentication

### JWT Tokens

The API uses JWT (JSON Web Tokens) for authentication with two types of tokens:

1. **Access Token** (24 hours)
   - Used to authenticate API requests
   - Include in Authorization header: `Bearer <access_token>`

2. **Refresh Token** (7 days)
   - Used to obtain new access tokens when expired
   - Stored securely by client

### Login Flow

```bash
1. User registers with email/password
2. User logs in and receives access + refresh tokens
3. Use access token for authenticated requests
4. When access token expires, use refresh token to get new one
5. If refresh token expires, user must login again
```

### Protected Routes

Routes marked with `(protected)` require valid JWT in Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Database Models

### User
- `email` (unique)
- `password` (hashed with bcrypt)
- `name`
- `role` (USER/ADMIN)
- `createdAt`/`updatedAt`

### City
- `name`
- `state`
- `country`
- `createdAt`/`updatedAt`

### Theatre
- `name`
- `city` (reference)
- `location`
- `createdAt`/`updatedAt`

### Screen
- `theatre` (reference)
- `screenNumber`
- `totalSeats`
- `createdAt`/`updatedAt`

### Movie
- `title`
- `genre`
- `duration` (minutes)
- `releaseDate`
- `language`
- `createdAt`/`updatedAt`

### Show
- `movie` (reference)
- `screen` (reference)
- `startTime`
- `price`
- `availableSeats`
- `createdAt`/`updatedAt`

### Booking
- `user` (reference)
- `show` (reference)
- `seats` (array)
- `totalPrice`
- `status` (CONFIRMED/CANCELLED)
- `createdAt`/`updatedAt`

### Review
- `user` (reference)
- `movie` (reference)
- `rating` (1-5)
- `comment`
- `createdAt`/`updatedAt`

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Support

For issues and questions, please create an issue in the GitHub repository.

---

**Built with ❤️ using Node.js, Express, and TypeScript**
