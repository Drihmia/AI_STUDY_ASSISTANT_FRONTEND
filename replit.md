# AI Study Assistant - Frontend

## Overview
This is the frontend for the AI Study Assistant, a study tool that uses AI to help students learn more effectively. The application is built with React, TypeScript, and Tailwind CSS, and uses Clerk for secure user authentication.

## Recent Changes (October 01, 2025)
- Set up project for Replit environment
- Configured React development server to work with Replit's proxy (port 5000)
- Installed all dependencies
- Created workflow for frontend development server
- Added .gitignore for Node.js projects
- Configured deployment settings

## Project Architecture

### Frontend (This Repository)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Router**: React Router v6
- **Internationalization**: i18next (supports English, French, Arabic)
- **Build Tool**: React Scripts (Create React App)

### Backend
The backend is a separate Python application using MongoDB. 
Repository: https://github.com/Drihmia/AI_STUDY_ASSISTANT_BACKEND

## Key Features
- AI-powered study assistance
- Cross-device conversation history via Clerk authentication
- Multi-language support (EN, FR, AR)
- Interactive learning components
- SEO-optimized headers

## Development Setup

### Environment Variables Required
The application requires the following secret to run:
- `REACT_APP_VITE_CLERK_PUBLISHABLE_KEY`: Clerk publishable key for authentication

To add this secret, use the Replit Secrets tool in the left sidebar.

### Running the Application
The workflow "Frontend" is configured to run the development server on port 5000.
- Command: `npm start`
- Port: 5000
- Host: 0.0.0.0 (configured for Replit proxy)

### Project Structure
```
/
├── public/               # Static files
├── src/
│   ├── components/       # React components
│   ├── context/          # Global context providers
│   ├── locales/         # Translation files
│   ├── App.js           # Main app component
│   └── index.tsx        # Entry point
├── server/              # Express server for production builds
└── package.json         # Dependencies and scripts
```

## Production Deployment
The server directory contains an Express server that serves the production build with compression and caching optimized for performance.

## Notes
- The dev server is configured to bypass host header verification (required for Replit's proxy)
- The application uses lazy loading for Chat and WelcomePage components
- Google Tag Manager and Google Tag components are included for analytics
