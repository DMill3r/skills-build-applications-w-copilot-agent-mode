import express, { Express, Request, Response } from 'express';
import { connectDatabase } from './config/database';
import { PORT, getBaseUrl, NODE_ENV } from './config/environment';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import activityRoutes from './routes/activityRoutes';
import teamRoutes from './routes/teamRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import workoutRoutes from './routes/workoutRoutes';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    baseUrl: getBaseUrl(),
  });
});

// Environment check
app.get('/api/env', (req: Request, res: Response) => {
  res.json({
    environment: NODE_ENV,
    codespaceName: process.env.CODESPACE_NAME || "-8000.app.github.dev",  
    apiPort: Number(PORT),
    baseUrl: getBaseUrl(),
  });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Start Server
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`✓ Server running on ${getBaseUrl()}`);
      console.log(`✓ API endpoints available at ${getBaseUrl()}/api/`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
