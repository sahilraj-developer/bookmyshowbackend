# Contributing to BookMyShow Backend

First off, thank you for considering contributing to BookMyShow Backend! It's people like you that make this project such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your environment details** (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the TypeScript/Node.js styleguides
* End all files with a newline
* Avoid platform-dependent code

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Example:
```
Add user authentication middleware

- Implement JWT token verification
- Add Bearer token parsing
- Validate token expiry

Fixes #123
```

### TypeScript Styleguide

* Use `const` for all declarations (never `var`)
* Use meaningful variable names
* Add type annotations where helpful
* Use interfaces for object types
* Keep functions small and focused
* Add comments for complex logic

Example:
```typescript
interface UserRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const getUser = async (req: UserRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### Express Route Styleguide

* Group related routes together
* Use descriptive route names
* Apply middleware in logical order
* Document complex routes

Example:
```typescript
const router = Router();

// Public routes
router.get('/', getAllMovies);
router.get('/:id', getMovieById);

// Protected routes
router.post('/', authMiddleware, authorize(['ADMIN']), createMovie);
router.put('/:id', authMiddleware, authorize(['ADMIN']), updateMovie);
router.delete('/:id', authMiddleware, authorize(['ADMIN']), deleteMovie);

export default router;
```

## Development Setup

1. Fork and clone the repository
```bash
git clone https://github.com/yourusername/bookmyshow-backend.git
cd bookmyshow-backend
```

2. Install dependencies
```bash
npm install
```

3. Create .env file from .env.example
```bash
cp .env.example .env
```

4. Update .env with your MongoDB URI and JWT secrets

5. Start development server
```bash
npm run dev
```

6. Run TypeScript compiler check
```bash
npm run build
```

## Testing Your Changes

Before submitting a pull request:

1. **Build the project**
```bash
npm run build
```

2. **Check for TypeScript errors**
```bash
npx tsc --noEmit
```

3. **Test API endpoints**
- Use Swagger UI at `http://localhost:3000/api-docs`
- Use Postman with provided collection
- Test both success and error cases

4. **Verify database operations**
- Check MongoDB for correct data
- Verify relationships between documents
- Test edge cases

## Project Structure

When adding new features, maintain this structure:

```
src/
├── models/          # MongoDB schemas
├── controllers/     # Business logic
├── routes/          # API routes
├── middleware/      # Express middleware
├── config/          # Configuration files
├── types/           # TypeScript types
└── utils/           # Utility functions
```

### Adding a New Feature

1. **Create the model** (src/models/Feature.ts)
2. **Create the controller** (src/controllers/featureController.ts)
3. **Create the routes** (src/routes/featureRoutes.ts)
4. **Add to main app** (src/index.ts)
5. **Update Swagger config** (src/config/swagger.ts)
6. **Add tests** if applicable

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `question` - Further information is requested

### Thank You!

Your contributions are valued and appreciated. Thank you for helping make BookMyShow Backend better!

---

For questions, create an issue or contact the maintainers.
