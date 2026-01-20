# Environment Variables Configuration

This document describes all the environment variables used in the BookMyShow backend application.

## Required Variables

### Server Configuration
- **PORT** (Default: 3000)
  - The port on which the server will run
  - Example: `PORT=3000`

### Database Configuration
- **MONGO_URI** (Required)
  - MongoDB connection string
  - Example: `MONGO_URI=mongodb://localhost:27017/bookmyshow`
  - For MongoDB Atlas: `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bookmyshow`

- **NODE_ENV** (Default: development)
  - Environment mode (development, production)
  - Example: `NODE_ENV=development`

### JWT Configuration
- **JWT_SECRET** (Required)
  - Secret key for signing access tokens
  - Should be a long, random string (min 32 characters)
  - Example: `JWT_SECRET=your-super-secret-jwt-key-change-this-in-production`

- **REFRESH_TOKEN_SECRET** (Required)
  - Secret key for signing refresh tokens
  - Should be different from JWT_SECRET
  - Example: `REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-change-this`

- **JWT_EXPIRY** (Default: 24h)
  - Access token expiry time
  - Examples: `JWT_EXPIRY=24h`, `JWT_EXPIRY=1d`, `JWT_EXPIRY=3600`

### CORS Configuration
- **CORS_ORIGIN** (Default: *)
  - Allowed origins for CORS
  - Use specific URL in production: `CORS_ORIGIN=https://yourdomain.com`
  - For multiple origins: `CORS_ORIGIN=https://app.com,https://admin.com`

## Example .env File

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/bookmyshow

# JWT
JWT_SECRET=this-is-a-super-secret-key-please-change-in-production-12345
REFRESH_TOKEN_SECRET=another-super-secret-refresh-token-key-12345
JWT_EXPIRY=24h

# CORS
CORS_ORIGIN=*
```

## Production Configuration

For production environments, ensure:

1. **Strong JWT_SECRET**: Use a cryptographically secure random string
   ```bash
   # Generate on Linux/Mac:
   openssl rand -base64 32
   ```

2. **Secure MONGO_URI**: Use MongoDB Atlas or secure instance
   - Never commit credentials to git
   - Use environment variables
   - Consider IP whitelisting

3. **NODE_ENV**: Set to `production`

4. **CORS_ORIGIN**: Set to specific domain(s)
   - Example: `CORS_ORIGIN=https://app.yourdomain.com`

5. **Security Headers**: Consider additional middleware for production

## Security Notes

⚠️ **Never commit .env file to Git!**
- The file is listed in .gitignore
- Each environment should have its own .env file
- Use .env.example as template (commit this with dummy values)

## Example .env.example (for Git)

```env
PORT=3000
NODE_ENV=development

MONGO_URI=mongodb://localhost:27017/bookmyshow

JWT_SECRET=change-this-to-a-secure-random-string
REFRESH_TOKEN_SECRET=change-this-to-another-secure-random-string
JWT_EXPIRY=24h

CORS_ORIGIN=*
```

## Loading Environment Variables

The application uses `dotenv` package to load variables from .env file:

```typescript
// Automatically loads .env on startup
import 'dotenv/config';
```

Variables are accessed via:
```typescript
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
```

## Troubleshooting

**MongoDB connection fails:**
- Verify MONGO_URI is correct
- Check MongoDB service is running
- For Atlas, verify IP whitelist and credentials

**JWT authentication fails:**
- Ensure JWT_SECRET is set
- Check token hasn't expired
- Verify Bearer token format in Authorization header

**CORS errors:**
- Update CORS_ORIGIN to match your frontend URL
- Check request headers include proper origin

---

For more information, see [README.md](README.md)
