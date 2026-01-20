# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-21

### Added
- Initial release of BookMyShow Backend API
- User authentication with JWT and refresh tokens
- User management (register, login, profile, password change)
- Role-based access control (USER/ADMIN roles)
- City management endpoints
- Theatre management endpoints
- Screen management endpoints
- Movie management endpoints
- Show management endpoints
- Booking system (create, view, cancel)
- Review and rating system
- Swagger/OpenAPI documentation at `/api-docs`
- Global error handling middleware
- Request logging middleware
- CORS protection
- MongoDB integration with Mongoose ODM
- Password hashing with bcrypt
- Environment-based configuration
- TypeScript support with strict type checking
- Comprehensive API documentation
- Postman collection for API testing
- Contributing guidelines
- Security documentation
- MIT License

### Features
- ✅ Register and login users
- ✅ JWT-based authentication (24h access + 7d refresh tokens)
- ✅ Password hashing and verification
- ✅ User profile management
- ✅ Browse cities and theatres
- ✅ Movie listings with metadata
- ✅ Screen and show management
- ✅ Book movie tickets
- ✅ Cancel bookings
- ✅ Leave and view reviews
- ✅ Admin controls for data management
- ✅ Interactive API documentation
- ✅ Error handling and logging

### Security
- Implemented JWT authentication with access/refresh tokens
- Password hashing with bcrypt (10 salt rounds)
- Role-based authorization (USER/ADMIN)
- Resource ownership validation
- CORS protection with configurable origins
- Environment variable protection
- Input validation and sanitization
- Global error handler preventing info leakage

### Documentation
- Comprehensive README with setup instructions
- API documentation with all endpoints
- Environment configuration guide
- Security best practices documentation
- Contributing guidelines
- License information

---

## Future Enhancements

### Planned Features
- [ ] Email verification for new accounts
- [ ] Password reset via email
- [ ] User profile pictures
- [ ] Advanced search and filtering
- [ ] Movie recommendations
- [ ] Rating aggregation and statistics
- [ ] Seat selection UI integration
- [ ] Payment gateway integration
- [ ] Admin dashboard endpoints
- [ ] User notification system
- [ ] Two-factor authentication (2FA)
- [ ] API rate limiting
- [ ] Caching with Redis
- [ ] Database indexing optimization
- [ ] API versioning support

### Improvements
- [ ] Unit and integration tests
- [ ] API performance optimization
- [ ] Database query optimization
- [ ] Request validation schemas
- [ ] API pagination support
- [ ] Advanced logging and monitoring
- [ ] Automated CI/CD pipeline
- [ ] Docker containerization
- [ ] Database migration system

---

## [Unreleased]

### Development
- Working on test suite
- Planning payment integration
- Designing advanced features

---

For more information, see [README.md](README.md)
