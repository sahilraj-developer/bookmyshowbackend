import swaggerJsDoc from 'swagger-jsdoc';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookMyShow Backend API',
      version: '1.0.0',
      description: 'Complete API documentation for BookMyShow backend with JWT authentication and role-based access control',
      contact: {
        name: 'API Support',
        email: 'support@bookmyshow.com'
      },
      license: {
        name: 'ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server'
      },
      {
        url: 'https://api.bookmyshow.com',
        description: 'Production Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password (hashed)'
            },
            name: {
              type: 'string',
              description: 'User full name'
            },
            role: {
              type: 'string',
              enum: ['USER', 'ADMIN'],
              default: 'USER',
              description: 'User role'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        City: {
          type: 'object',
          required: ['name'],
          properties: {
            _id: {
              type: 'string'
            },
            name: {
              type: 'string',
              description: 'City name'
            },
            state: {
              type: 'string',
              description: 'State/Province'
            },
            country: {
              type: 'string',
              description: 'Country'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Theatre: {
          type: 'object',
          required: ['name', 'city', 'location'],
          properties: {
            _id: {
              type: 'string'
            },
            name: {
              type: 'string',
              description: 'Theatre name'
            },
            city: {
              type: 'string',
              description: 'City ID'
            },
            location: {
              type: 'string',
              description: 'Theatre location/address'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Screen: {
          type: 'object',
          required: ['theatre', 'screenNumber', 'totalSeats'],
          properties: {
            _id: {
              type: 'string'
            },
            theatre: {
              type: 'string',
              description: 'Theatre ID'
            },
            screenNumber: {
              type: 'integer',
              description: 'Screen number'
            },
            totalSeats: {
              type: 'integer',
              description: 'Total number of seats'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Movie: {
          type: 'object',
          required: ['title', 'genre', 'duration'],
          properties: {
            _id: {
              type: 'string'
            },
            title: {
              type: 'string',
              description: 'Movie title'
            },
            genre: {
              type: 'string',
              description: 'Movie genre'
            },
            duration: {
              type: 'integer',
              description: 'Movie duration in minutes'
            },
            releaseDate: {
              type: 'string',
              format: 'date'
            },
            language: {
              type: 'string',
              description: 'Movie language'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Show: {
          type: 'object',
          required: ['movie', 'screen', 'startTime', 'price'],
          properties: {
            _id: {
              type: 'string'
            },
            movie: {
              type: 'string',
              description: 'Movie ID'
            },
            screen: {
              type: 'string',
              description: 'Screen ID'
            },
            startTime: {
              type: 'string',
              format: 'date-time',
              description: 'Show start time'
            },
            price: {
              type: 'number',
              description: 'Ticket price'
            },
            availableSeats: {
              type: 'integer',
              description: 'Number of available seats'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Booking: {
          type: 'object',
          required: ['user', 'show', 'seats'],
          properties: {
            _id: {
              type: 'string'
            },
            user: {
              type: 'string',
              description: 'User ID'
            },
            show: {
              type: 'string',
              description: 'Show ID'
            },
            seats: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of seat numbers'
            },
            totalPrice: {
              type: 'number',
              description: 'Total booking price'
            },
            status: {
              type: 'string',
              enum: ['CONFIRMED', 'CANCELLED'],
              default: 'CONFIRMED'
            },
            bookingDate: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Review: {
          type: 'object',
          required: ['user', 'movie', 'rating'],
          properties: {
            _id: {
              type: 'string'
            },
            user: {
              type: 'string',
              description: 'User ID'
            },
            movie: {
              type: 'string',
              description: 'Movie ID'
            },
            rating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              description: 'Rating from 1 to 5'
            },
            comment: {
              type: 'string',
              description: 'Review comment'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean'
            },
            message: {
              type: 'string'
            },
            user: {
              $ref: '#/components/schemas/User'
            },
            accessToken: {
              type: 'string',
              description: 'JWT access token (24 hours)'
            },
            refreshToken: {
              type: 'string',
              description: 'JWT refresh token (7 days)'
            },
            expiresIn: {
              type: 'string',
              description: 'Token expiration time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string'
            },
            statusCode: {
              type: 'integer'
            },
            error: {
              type: 'object'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and registration'
      },
      {
        name: 'Users',
        description: 'User management endpoints'
      },
      {
        name: 'Cities',
        description: 'City management'
      },
      {
        name: 'Theatres',
        description: 'Theatre management'
      },
      {
        name: 'Screens',
        description: 'Screen management'
      },
      {
        name: 'Movies',
        description: 'Movie management'
      },
      {
        name: 'Shows',
        description: 'Show management'
      },
      {
        name: 'Bookings',
        description: 'Booking management'
      },
      {
        name: 'Reviews',
        description: 'Review management'
      }
    ]
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts'
  ]
};

export const swaggerSpec = swaggerJsDoc(options);
