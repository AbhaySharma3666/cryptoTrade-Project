# Crypto Trading AI - Next.js Application

A professional Next.js application for real-time cryptocurrency trading with AI-powered chat assistance.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Backend server running on port 5455

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5455
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
react-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/             # About page
│   │   ├── layout.js          # Root layout
│   │   ├── page.js            # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   └── chat/              # Chat-related components
│   ├── lib/                   # Business logic
│   │   ├── api/               # API service layer
│   │   └── config/            # App constants
│   └── config/                # Configuration files
│       └── env.js             # Environment variables
├── public/                    # Static assets
├── .env.local                 # Local environment (DO NOT COMMIT)
├── .env.example              # Environment template
└── .gitignore                # Git ignore rules
```

## 🔐 Environment Variables

All sensitive data is managed through environment variables:

- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_APP_VERSION` - App version

**⚠️ NEVER commit `.env.local` to version control!**

## 🏗️ Architecture

### Service Layer Pattern
- API calls are centralized in `src/lib/api/`
- Components remain clean and focused on UI
- Easy to mock for testing

### Configuration Management
- Constants in `src/lib/config/constants.js`
- Environment wrapper in `src/config/env.js`
- Type-safe configuration access

### Component Organization
- Feature-based grouping (e.g., `components/chat/`)
- Reusable UI components separated
- Clear naming conventions

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Key Dependencies

- **Next.js 16** - React framework
- **React 19** - UI library
- **Axios** - HTTP client
- **Tailwind CSS 4** - Styling
- **tsParticles** - Background animations

## 🔒 Security Best Practices

1. ✅ Environment variables for all secrets
2. ✅ `.env.local` excluded from Git
3. ✅ API calls through service layer
4. ✅ Input sanitization in components
5. ✅ No hardcoded credentials

## 📝 Development Guidelines

### Adding New Features
1. Create components in appropriate feature folder
2. Add API calls to service layer
3. Use constants from config files
4. Update environment variables if needed

### Code Style
- Use functional components
- Implement proper error handling
- Keep components focused and small
- Use meaningful variable names

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production
Set these in your deployment platform:
- `NEXT_PUBLIC_API_BASE_URL` - Production API URL

## 📄 License

Private - All rights reserved

## 🤝 Contributing

1. Follow the existing code structure
2. Use the service layer for API calls
3. Add constants to config files
4. Never commit sensitive data
