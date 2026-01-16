# 🚀 Quick Reference Guide

## Project Structure

```
src/
├── app/                      # Pages & routing
├── components/               # Reusable components
│   └── chat/                # Chat feature components
├── lib/                     # Business logic
│   ├── api/                 # API services
│   └── config/              # Constants
└── config/                  # App configuration
    └── env.js               # Environment variables
```

## Common Tasks

### Add New API Endpoint

1. Add endpoint to `src/lib/config/constants.js`:
```javascript
export const API_ENDPOINTS = {
  CHAT: '/ai/chat',
  NEW_ENDPOINT: '/api/new',  // Add here
};
```

2. Add service method in `src/lib/api/chatService.js`:
```javascript
export const chatService = {
  newMethod: async (data) => {
    const response = await apiClient.post(API_ENDPOINTS.NEW_ENDPOINT, data);
    return response.data;
  },
};
```

### Add New Environment Variable

1. Add to `.env.local`:
```env
NEXT_PUBLIC_NEW_VAR=value
```

2. Add to `.env.example`:
```env
NEXT_PUBLIC_NEW_VAR=default_value
```

3. Add to `src/config/env.js`:
```javascript
export const env = {
  newVar: process.env.NEXT_PUBLIC_NEW_VAR || 'default',
};
```

### Create New Component

```javascript
// src/components/feature/ComponentName.jsx
"use client";

const ComponentName = ({ prop }) => {
  return <div>{prop}</div>;
};

export default ComponentName;
```

### Add New Page

```javascript
// src/app/pagename/page.jsx
export default function PageName() {
  return <div>Page Content</div>;
}
```

## Import Paths

Use `@/` alias for clean imports:

```javascript
// ✅ Good
import { chatService } from '@/lib/api/chatService';
import Chatbox from '@/components/chat/Chatbox';
import { env } from '@/config/env';

// ❌ Avoid
import { chatService } from '../../lib/api/chatService';
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `Chatbox.jsx`)
- **Pages**: lowercase (e.g., `about/page.jsx`)
- **Services**: camelCase (e.g., `chatService.js`)
- **Config**: camelCase (e.g., `constants.js`)

## Environment Variables

### Client-side (Browser)
```javascript
// Must start with NEXT_PUBLIC_
NEXT_PUBLIC_API_BASE_URL=http://localhost:5455
```

### Server-side only
```javascript
// No prefix needed
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret123
```

## Common Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint

# Dependency management
npm install package-name
npm update
npm audit
```

## Troubleshooting

### Environment variables not loading
1. Restart dev server after changing `.env.local`
2. Verify variable starts with `NEXT_PUBLIC_` for client-side
3. Check `src/config/env.js` exports the variable

### Import errors
1. Verify file path is correct
2. Check `jsconfig.json` has `@` alias configured
3. Restart IDE/dev server

### API calls failing
1. Check backend server is running
2. Verify `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
3. Check browser console for CORS errors
4. Verify endpoint in `constants.js`

## Code Style

```javascript
// ✅ Good practices
const handleClick = async () => {
  try {
    const data = await chatService.sendMessage(text);
    setResponse(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// ❌ Avoid
const handleClick = () => {
  chatService.sendMessage(text).then(data => {
    setResponse(data);
  }).catch(error => {
    console.log(error);
  });
};
```

## Git Workflow

```bash
# Before committing
git status                    # Check staged files
git diff                      # Review changes

# Commit
git add .
git commit -m "feat: add new feature"

# Push
git push origin main
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- Project README: `README.md`
- Security Guide: `SECURITY.md`
- Migration Guide: `MIGRATION.md`
