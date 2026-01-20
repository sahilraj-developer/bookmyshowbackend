# API Documentation

Complete API reference for BookMyShow Backend.

## Base URL

```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Response Format

All responses are in JSON format:

**Success Response (2xx):**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { }
}
```

**Error Response (4xx, 5xx):**
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "error": "Detailed error message"
}
```

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Users Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /users/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h"
}
```

---

### Login User
Authenticate user and receive tokens.

**Endpoint:** `POST /users/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h"
}
```

---

### Refresh Token
Get a new access token using refresh token.

**Endpoint:** `POST /users/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Token refreshed",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h"
}
```

---

### Get User Profile
Retrieve authenticated user's profile.

**Endpoint:** `GET /users/profile`

**Authentication:** Required (Bearer token)

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "createdAt": "2024-01-21T10:30:00Z",
    "updatedAt": "2024-01-21T10:30:00Z"
  }
}
```

---

### Get User by ID
Retrieve user details by ID.

**Endpoint:** `GET /users/:id`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (path): User ID

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "createdAt": "2024-01-21T10:30:00Z",
    "updatedAt": "2024-01-21T10:30:00Z"
  }
}
```

---

### Update User
Update user information.

**Endpoint:** `PUT /users/:id`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (path): User ID

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "newemail@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User updated",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "newemail@example.com",
    "name": "Jane Doe",
    "role": "USER",
    "updatedAt": "2024-01-21T11:45:00Z"
  }
}
```

---

### Change Password
Change user password.

**Endpoint:** `POST /users/:id/change-password`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (path): User ID

**Request Body:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### Get All Users (Admin)
List all users in the system.

**Endpoint:** `GET /users`

**Authentication:** Required (Bearer token - Admin only)

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user1@example.com",
      "name": "User One",
      "role": "USER"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "ADMIN"
    }
  ]
}
```

---

### Delete User (Admin)
Delete a user account.

**Endpoint:** `DELETE /users/:id`

**Authentication:** Required (Bearer token - Admin only)

**Parameters:**
- `id` (path): User ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Cities Endpoints

### Get All Cities
List all cities.

**Endpoint:** `GET /cities`

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "cities": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "name": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "createdAt": "2024-01-20T10:00:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439021",
      "name": "Delhi",
      "state": "Delhi",
      "country": "India",
      "createdAt": "2024-01-20T10:00:00Z"
    }
  ]
}
```

---

### Get City by ID
Retrieve city details.

**Endpoint:** `GET /cities/:id`

**Parameters:**
- `id` (path): City ID

**Success Response (200):**
```json
{
  "success": true,
  "city": {
    "_id": "507f1f77bcf86cd799439020",
    "name": "Mumbai",
    "state": "Maharashtra",
    "country": "India",
    "createdAt": "2024-01-20T10:00:00Z"
  }
}
```

---

### Create City (Admin)
Add a new city.

**Endpoint:** `POST /cities`

**Authentication:** Required (Bearer token - Admin only)

**Request Body:**
```json
{
  "name": "Bangalore",
  "state": "Karnataka",
  "country": "India"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "City created",
  "city": {
    "_id": "507f1f77bcf86cd799439022",
    "name": "Bangalore",
    "state": "Karnataka",
    "country": "India",
    "createdAt": "2024-01-21T11:45:00Z"
  }
}
```

---

### Update City (Admin)
Modify city details.

**Endpoint:** `PUT /cities/:id`

**Authentication:** Required (Bearer token - Admin only)

**Parameters:**
- `id` (path): City ID

**Request Body:**
```json
{
  "name": "Bengaluru",
  "state": "Karnataka",
  "country": "India"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "City updated",
  "city": {
    "_id": "507f1f77bcf86cd799439022",
    "name": "Bengaluru",
    "state": "Karnataka",
    "country": "India",
    "updatedAt": "2024-01-21T12:00:00Z"
  }
}
```

---

### Delete City (Admin)
Remove a city.

**Endpoint:** `DELETE /cities/:id`

**Authentication:** Required (Bearer token - Admin only)

**Parameters:**
- `id` (path): City ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "City deleted"
}
```

---

## Theatres Endpoints

### Get All Theatres
List all theatres with city details.

**Endpoint:** `GET /theatres`

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "theatres": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "name": "PVR Cinemas",
      "location": "South Mumbai",
      "city": {
        "_id": "507f1f77bcf86cd799439020",
        "name": "Mumbai"
      },
      "createdAt": "2024-01-20T10:00:00Z"
    }
  ]
}
```

---

### Get Theatre by ID
Retrieve theatre details.

**Endpoint:** `GET /theatres/:id`

**Parameters:**
- `id` (path): Theatre ID

**Success Response (200):**
```json
{
  "success": true,
  "theatre": {
    "_id": "507f1f77bcf86cd799439030",
    "name": "PVR Cinemas",
    "location": "South Mumbai",
    "city": {
      "_id": "507f1f77bcf86cd799439020",
      "name": "Mumbai"
    },
    "createdAt": "2024-01-20T10:00:00Z"
  }
}
```

---

### Create Theatre (Admin)
Add a new theatre.

**Endpoint:** `POST /theatres`

**Authentication:** Required (Bearer token - Admin only)

**Request Body:**
```json
{
  "name": "INOX Cinemas",
  "city": "507f1f77bcf86cd799439020",
  "location": "Central Mumbai"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Theatre created",
  "theatre": {
    "_id": "507f1f77bcf86cd799439031",
    "name": "INOX Cinemas",
    "location": "Central Mumbai",
    "city": "507f1f77bcf86cd799439020",
    "createdAt": "2024-01-21T12:00:00Z"
  }
}
```

---

### Update Theatre (Admin)
Modify theatre details.

**Endpoint:** `PUT /theatres/:id`

**Authentication:** Required (Bearer token - Admin only)

**Parameters:**
- `id` (path): Theatre ID

**Request Body:**
```json
{
  "name": "INOX Premium",
  "location": "Downtown Mumbai"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Theatre updated",
  "theatre": {
    "_id": "507f1f77bcf86cd799439031",
    "name": "INOX Premium",
    "location": "Downtown Mumbai",
    "updatedAt": "2024-01-21T12:15:00Z"
  }
}
```

---

### Delete Theatre (Admin)
Remove a theatre.

**Endpoint:** `DELETE /theatres/:id`

**Authentication:** Required (Bearer token - Admin only)

**Parameters:**
- `id` (path): Theatre ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Theatre deleted"
}
```

---

## Screens Endpoints

### Get All Screens
List all screens with theatre details.

**Endpoint:** `GET /screens`

**Success Response (200):**
```json
{
  "success": true,
  "count": 4,
  "screens": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "screenNumber": 1,
      "totalSeats": 150,
      "theatre": {
        "_id": "507f1f77bcf86cd799439030",
        "name": "PVR Cinemas"
      },
      "createdAt": "2024-01-20T10:00:00Z"
    }
  ]
}
```

---

### Get Screen by ID
Retrieve screen details.

**Endpoint:** `GET /screens/:id`

**Parameters:**
- `id` (path): Screen ID

**Success Response (200):**
```json
{
  "success": true,
  "screen": {
    "_id": "507f1f77bcf86cd799439040",
    "screenNumber": 1,
    "totalSeats": 150,
    "theatre": {
      "_id": "507f1f77bcf86cd799439030",
      "name": "PVR Cinemas"
    },
    "createdAt": "2024-01-20T10:00:00Z"
  }
}
```

---

### Create Screen (Admin)
Add a new screen to a theatre.

**Endpoint:** `POST /screens`

**Authentication:** Required (Bearer token - Admin only)

**Request Body:**
```json
{
  "theatre": "507f1f77bcf86cd799439030",
  "screenNumber": 2,
  "totalSeats": 200
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Screen created",
  "screen": {
    "_id": "507f1f77bcf86cd799439041",
    "screenNumber": 2,
    "totalSeats": 200,
    "theatre": "507f1f77bcf86cd799439030",
    "createdAt": "2024-01-21T12:00:00Z"
  }
}
```

---

### Update Screen (Admin)
Modify screen details.

**Endpoint:** `PUT /screens/:id`

**Authentication:** Required (Bearer token - Admin only)

**Parameters:**
- `id` (path): Screen ID

**Request Body:**
```json
{
  "totalSeats": 220
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Screen updated",
  "screen": {
    "_id": "507f1f77bcf86cd799439041",
    "screenNumber": 2,
    "totalSeats": 220,
    "updatedAt": "2024-01-21T12:15:00Z"
  }
}
```

---

### Delete Screen (Admin)
Remove a screen.

**Endpoint:** `DELETE /screens/:id`

**Authentication:** Required (Bearer token - Admin only)

**Parameters:**
- `id` (path): Screen ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Screen deleted"
}
```

---

## Movies Endpoints

### Get All Movies
List all movies.

**Endpoint:** `GET /movies`

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "movies": [
    {
      "_id": "507f1f77bcf86cd799439050",
      "title": "The Shawshank Redemption",
      "genre": "Drama",
      "duration": 142,
      "releaseDate": "1994-10-14",
      "language": "English",
      "createdAt": "2024-01-20T10:00:00Z"
    }
  ]
}
```

---

### Get Movie by ID
Retrieve movie details.

**Endpoint:** `GET /movies/:id`

**Parameters:**
- `id` (path): Movie ID

**Success Response (200):**
```json
{
  "success": true,
  "movie": {
    "_id": "507f1f77bcf86cd799439050",
    "title": "The Shawshank Redemption",
    "genre": "Drama",
    "duration": 142,
    "releaseDate": "1994-10-14",
    "language": "English",
    "createdAt": "2024-01-20T10:00:00Z"
  }
}
```

---

### Create Movie (Admin)
Add a new movie.

**Endpoint:** `POST /movies`

**Authentication:** Required (Bearer token - Admin only)

**Request Body:**
```json
{
  "title": "Inception",
  "genre": "Sci-Fi",
  "duration": 148,
  "releaseDate": "2010-07-16",
  "language": "English"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Movie created",
  "movie": {
    "_id": "507f1f77bcf86cd799439051",
    "title": "Inception",
    "genre": "Sci-Fi",
    "duration": 148,
    "releaseDate": "2010-07-16",
    "language": "English",
    "createdAt": "2024-01-21T12:00:00Z"
  }
}
```

---

### Update Movie (Admin)
Modify movie details.

**Endpoint:** `PUT /movies/:id`

**Authentication:** Required (Bearer token - Admin only)

**Parameters:**
- `id` (path): Movie ID

**Request Body:**
```json
{
  "genre": "Sci-Fi/Thriller",
  "title": "Inception: Directors Cut"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Movie updated",
  "movie": {
    "_id": "507f1f77bcf86cd799439051",
    "title": "Inception: Directors Cut",
    "genre": "Sci-Fi/Thriller",
    "updatedAt": "2024-01-21T12:15:00Z"
  }
}
```

---

### Delete Movie (Admin)
Remove a movie.

**Endpoint:** `DELETE /movies/:id`

**Authentication:** Required (Bearer token - Admin only)

**Parameters:**
- `id` (path): Movie ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Movie deleted"
}
```

---

## Shows Endpoints

### Get All Shows
List all shows with movie and screen details.

**Endpoint:** `GET /shows`

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "shows": [
    {
      "_id": "507f1f77bcf86cd799439060",
      "startTime": "2024-01-25T18:00:00Z",
      "price": 250,
      "availableSeats": 50,
      "movie": {
        "_id": "507f1f77bcf86cd799439051",
        "title": "Inception"
      },
      "screen": {
        "_id": "507f1f77bcf86cd799439040",
        "screenNumber": 1
      },
      "createdAt": "2024-01-21T10:00:00Z"
    }
  ]
}
```

---

### Get Show by ID
Retrieve show details.

**Endpoint:** `GET /shows/:id`

**Parameters:**
- `id` (path): Show ID

**Success Response (200):**
```json
{
  "success": true,
  "show": {
    "_id": "507f1f77bcf86cd799439060",
    "startTime": "2024-01-25T18:00:00Z",
    "price": 250,
    "availableSeats": 50,
    "movie": {
      "_id": "507f1f77bcf86cd799439051",
      "title": "Inception"
    },
    "screen": {
      "_id": "507f1f77bcf86cd799439040",
      "screenNumber": 1
    },
    "createdAt": "2024-01-21T10:00:00Z"
  }
}
```

---

### Create Show (Admin)
Add a new show.

**Endpoint:** `POST /shows`

**Authentication:** Required (Bearer token - Admin only)

**Request Body:**
```json
{
  "movie": "507f1f77bcf86cd799439051",
  "screen": "507f1f77bcf86cd799439040",
  "startTime": "2024-01-25T18:00:00Z",
  "price": 250
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Show created",
  "show": {
    "_id": "507f1f77bcf86cd799439061",
    "startTime": "2024-01-25T18:00:00Z",
    "price": 250,
    "availableSeats": 150,
    "movie": "507f1f77bcf86cd799439051",
    "screen": "507f1f77bcf86cd799439040",
    "createdAt": "2024-01-21T12:00:00Z"
  }
}
```

---

### Update Show (Admin)
Modify show details.

**Endpoint:** `PUT /shows/:id`

**Authentication:** Required (Bearer token - Admin only)

**Parameters:**
- `id` (path): Show ID

**Request Body:**
```json
{
  "price": 300,
  "availableSeats": 45
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Show updated",
  "show": {
    "_id": "507f1f77bcf86cd799439061",
    "price": 300,
    "availableSeats": 45,
    "updatedAt": "2024-01-21T12:15:00Z"
  }
}
```

---

### Delete Show (Admin)
Remove a show.

**Endpoint:** `DELETE /shows/:id`

**Authentication:** Required (Bearer token - Admin only)

**Parameters:**
- `id` (path): Show ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Show deleted"
}
```

---

## Bookings Endpoints

### Create Booking
Book tickets for a show.

**Endpoint:** `POST /bookings`

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "user": "507f1f77bcf86cd799439011",
  "show": "507f1f77bcf86cd799439061",
  "seats": ["A1", "A2", "A3"],
  "totalPrice": 750
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Booking created",
  "booking": {
    "_id": "507f1f77bcf86cd799439070",
    "user": "507f1f77bcf86cd799439011",
    "show": "507f1f77bcf86cd799439061",
    "seats": ["A1", "A2", "A3"],
    "totalPrice": 750,
    "status": "CONFIRMED",
    "createdAt": "2024-01-21T15:30:00Z"
  }
}
```

---

### Get Booking by ID
Retrieve booking details.

**Endpoint:** `GET /bookings/:id`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (path): Booking ID

**Success Response (200):**
```json
{
  "success": true,
  "booking": {
    "_id": "507f1f77bcf86cd799439070",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe"
    },
    "show": {
      "_id": "507f1f77bcf86cd799439061",
      "startTime": "2024-01-25T18:00:00Z"
    },
    "seats": ["A1", "A2", "A3"],
    "totalPrice": 750,
    "status": "CONFIRMED",
    "createdAt": "2024-01-21T15:30:00Z"
  }
}
```

---

### Get User Bookings
Retrieve all bookings for a user.

**Endpoint:** `GET /bookings/user/:userId`

**Authentication:** Required (Bearer token)

**Parameters:**
- `userId` (path): User ID

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439070",
      "show": {
        "_id": "507f1f77bcf86cd799439061",
        "startTime": "2024-01-25T18:00:00Z",
        "price": 250
      },
      "seats": ["A1", "A2", "A3"],
      "totalPrice": 750,
      "status": "CONFIRMED",
      "createdAt": "2024-01-21T15:30:00Z"
    }
  ]
}
```

---

### Cancel Booking
Cancel an existing booking.

**Endpoint:** `PUT /bookings/:id/cancel`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (path): Booking ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Booking cancelled",
  "booking": {
    "_id": "507f1f77bcf86cd799439070",
    "status": "CANCELLED",
    "updatedAt": "2024-01-21T16:00:00Z"
  }
}
```

---

## Reviews Endpoints

### Get Movie Reviews
Retrieve all reviews for a movie.

**Endpoint:** `GET /reviews/movie/:movieId`

**Parameters:**
- `movieId` (path): Movie ID

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "reviews": [
    {
      "_id": "507f1f77bcf86cd799439080",
      "rating": 5,
      "comment": "Amazing movie!",
      "user": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-21T18:00:00Z"
    }
  ]
}
```

---

### Get User Reviews
Retrieve all reviews by a user.

**Endpoint:** `GET /reviews/user/:userId`

**Parameters:**
- `userId` (path): User ID

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "reviews": [
    {
      "_id": "507f1f77bcf86cd799439080",
      "rating": 5,
      "comment": "Amazing movie!",
      "movie": {
        "_id": "507f1f77bcf86cd799439051",
        "title": "Inception"
      },
      "createdAt": "2024-01-21T18:00:00Z"
    }
  ]
}
```

---

### Create Review
Leave a review for a movie.

**Endpoint:** `POST /reviews`

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "user": "507f1f77bcf86cd799439011",
  "movie": "507f1f77bcf86cd799439051",
  "rating": 5,
  "comment": "Amazing movie! Highly recommended."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Review created",
  "review": {
    "_id": "507f1f77bcf86cd799439081",
    "user": "507f1f77bcf86cd799439011",
    "movie": "507f1f77bcf86cd799439051",
    "rating": 5,
    "comment": "Amazing movie! Highly recommended.",
    "createdAt": "2024-01-21T18:30:00Z"
  }
}
```

---

### Update Review
Modify an existing review.

**Endpoint:** `PUT /reviews/:id`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (path): Review ID

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Great movie, very enjoyable!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Review updated",
  "review": {
    "_id": "507f1f77bcf86cd799439081",
    "rating": 4,
    "comment": "Great movie, very enjoyable!",
    "updatedAt": "2024-01-21T19:00:00Z"
  }
}
```

---

### Delete Review
Remove a review.

**Endpoint:** `DELETE /reviews/:id`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (path): Review ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Review deleted"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Email, password, and name are required",
  "statusCode": 400
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied",
  "statusCode": 403
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "User not found",
  "statusCode": 404
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error processing request",
  "statusCode": 500,
  "error": "Internal server error"
}
```

---

For more information, see [README.md](README.md) and [SECURITY.md](SECURITY.md)
