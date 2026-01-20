# Security Documentation

## Overview

This document outlines the security measures implemented in the BookMyShow backend API.

## Authentication

### JWT (JSON Web Tokens)

The API uses industry-standard JWT for stateless authentication:

- **Access Tokens**: 24-hour validity for API requests
- **Refresh Tokens**: 7-day validity for obtaining new access tokens
- **Signature**: HMAC SHA-256 algorithm
- **Storage**: Tokens stored client-side (not in cookies by default)

### Password Security

- **Hashing**: bcrypt with 10 salt rounds
- **No Plain Text**: Passwords never stored or transmitted in plain text
- **Change Password**: Dedicated endpoint with current password verification

### Login Flow

```
User Registration/Login
         ↓
Verify Credentials
         ↓
Hash Password (bcrypt)
         ↓
Generate JWT Tokens
         ↓
Return Access + Refresh Tokens
```

## Authorization

### Role-Based Access Control (RBAC)

Two user roles implemented:

1. **USER** (Default)
   - Can view public data (cities, theatres, movies, shows)
   - Can create/manage own bookings
   - Can create/edit own reviews
   - Cannot manage system data

2. **ADMIN**
   - Can perform all USER actions
   - Can create/edit/delete cities, theatres, screens, movies, shows
   - Can view all users
   - Can delete users

### Middleware Protection

```typescript
// Public endpoint
GET /api/movies

// Protected endpoint (authentication required)
GET /api/users/profile
[authMiddleware]

// Admin-only endpoint
POST /api/cities
[authMiddleware, authorize(['ADMIN'])]
```

### Resource Ownership

- Users can only modify their own bookings and reviews
- Verified with ownerOrAdmin middleware
- Admin can override ownership restrictions

## Data Protection

### Input Validation

- Email format validation on registration
- Password strength requirements (enforced by client)
- MongoDB injection prevention through Mongoose
- Type validation with TypeScript

### Error Handling

- Generic error messages (no sensitive info leaked)
- Stack traces only in development
- Proper HTTP status codes
- Logging for debugging

Example:
```
Bad Request: ❌ "Database error: connection lost"
Good Request: ✅ "Error processing request. Please try again."
```

### Database Security

- MongoDB connection string in environment variables
- No default credentials in code
- Indexed unique fields (email)
- Proper schema validation

## Network Security

### CORS (Cross-Origin Resource Sharing)

```typescript
// Whitelist specific origins in production
CORS_ORIGIN=https://app.yourdomain.com

// Allow credentials
credentials: true
```

### HTTPS (Production)

- Enforce HTTPS in production environments
- Use SSL/TLS certificates
- Redirect HTTP to HTTPS

### Rate Limiting (Recommended)

Consider implementing rate limiting for:
- Login attempts
- Password reset requests
- API endpoints

Example implementation:
```typescript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts'
});

router.post('/login', loginLimiter, loginUser);
```

## Environment Security

### Secrets Management

- JWT_SECRET: Long random string (min 32 chars)
- MONGO_URI: Credentials in environment, not code
- Never commit .env file
- Use .env.example as template

### Environment Isolation

- Development: Local MongoDB, loose CORS
- Production: MongoDB Atlas, strict CORS, HTTPS

## Audit & Logging

### Request Logging

All requests logged with:
- Timestamp (ISO 8601)
- HTTP method
- Endpoint
- Status code
- Response time

### Error Logging

- Error messages recorded
- Stack traces in development
- User-friendly messages in production

## Token Management

### Access Token

- **Duration**: 24 hours
- **Purpose**: Authenticate API requests
- **Storage**: Client localStorage/memory
- **Transmission**: Authorization header (Bearer token)

### Refresh Token

- **Duration**: 7 days
- **Purpose**: Obtain new access token
- **Storage**: Secure http-only cookie (recommended)
- **Rotation**: Issue new refresh token on use (optional)

### Token Revocation

Currently not implemented. Consider adding:
- Token blacklist for logout
- Redis cache for token validity
- Automatic token expiration

## Security Checklist

Production deployment checklist:

- [ ] Change JWT_SECRET to strong random string
- [ ] Change REFRESH_TOKEN_SECRET to strong random string
- [ ] Set NODE_ENV=production
- [ ] Set CORS_ORIGIN to specific domain(s)
- [ ] Use MongoDB Atlas or secure MongoDB instance
- [ ] Enable HTTPS/SSL certificates
- [ ] Enable MongoDB authentication
- [ ] Setup proper logging/monitoring
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Implement rate limiting
- [ ] Setup automated backups
- [ ] Monitor error logs
- [ ] Document security policies

## Dependency Vulnerabilities

Run security audit:
```bash
npm audit
```

To fix vulnerabilities:
```bash
npm audit fix
```

Check dependency versions:
```bash
npm outdated
```

## Best Practices

1. **Keep Secrets Secure**
   - Use environment variables
   - Never commit secrets
   - Rotate regularly

2. **Validate Everything**
   - Input validation
   - Type checking with TypeScript
   - Schema validation with Mongoose

3. **Log & Monitor**
   - Track all errors
   - Monitor failed login attempts
   - Alert on suspicious activity

4. **Update Dependencies**
   - Keep npm packages updated
   - Monitor security advisories
   - Test updates in staging

5. **HTTPS Always**
   - Use SSL/TLS in production
   - Enforce HTTPS redirects
   - Use secure cookies

6. **Database Security**
   - Strong credentials
   - Network access restrictions
   - Regular backups

---

For more information, see [README.md](README.md)
