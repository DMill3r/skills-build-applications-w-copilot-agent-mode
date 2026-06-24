# OctoFit Tracker - React 19 Frontend

Presentation tier for the OctoFit Tracker multi-tier application built with React 19, Vite, React Router DOM, and Bootstrap.

## Features

- **React 19** with Vite for fast development and optimized builds
- **React Router DOM** for client-side navigation between pages
- **Bootstrap 5** for responsive UI styling
- **Codespaces Support** with automatic API URL detection
- Component-based architecture for Users, Activities, Teams, Leaderboard, and Workouts

## Setup

### Prerequisites

- Node.js (LTS)
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the frontend directory with the following variable:

```
VITE_CODESPACE_NAME=
```

**Important:** The `VITE_CODESPACE_NAME` variable must be defined for the API URL to work correctly.

- **In GitHub Codespaces:** This variable is automatically set by the Codespaces environment and will be populated with your Codespace name (e.g., `dreamy-space-fiesta-xyz`).
- **Locally:** Leave it empty or unset to default to `http://localhost:8000`.

### API URL Detection

The application automatically constructs the API base URL based on the environment:

```javascript
const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName.trim().length > 0) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};
```

This ensures:
- In Codespaces: `https://$CODESPACE_NAME-8000.app.github.dev`
- Locally: `http://localhost:8000`
- No undefined URLs in production

## Development

### Start Dev Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` and will connect to the backend API at the URL determined by `VITE_CODESPACE_NAME`.

### Build for Production

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── App.jsx              # Main app with routing and navigation
├── main.jsx             # React 19 entry point
├── index.css            # Global styles
├── App.css              # App-specific styles
└── components/
    ├── Users.jsx        # User management
    ├── Activities.jsx   # Activity logging
    ├── Teams.jsx        # Team management
    ├── Leaderboard.jsx  # Rankings display
    └── Workouts.jsx     # Workout planning
```

## Pages

- **Home** (`/`) — Health check and welcome message
- **Users** (`/users`) — Create and view users
- **Activities** (`/activities`) — Log and view activities
- **Teams** (`/teams`) — Create and view teams
- **Leaderboard** (`/leaderboard`) — View user and team rankings
- **Workouts** (`/workouts`) — Create and view workout plans

## Backend API Integration

The frontend communicates with the backend API at the address determined by `VITE_CODESPACE_NAME`. Ensure the backend server is running on port 8000 (or the port specified in your backend configuration).

API endpoints used:
- `GET /api/health` — Health check
- `GET /api/users` — List users
- `POST /api/users` — Create user
- `GET /api/activities` — List activities
- `POST /api/activities` — Log activity
- `GET /api/teams` — List teams
- `POST /api/teams` — Create team
- `GET /api/leaderboard` — Get leaderboard rankings
- `GET /api/workouts` — List workouts
- `POST /api/workouts` — Create workout
