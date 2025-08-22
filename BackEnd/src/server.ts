import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from '@/presentation/routes';
import { Logger } from '@/shared/utils/Logger';
import { requestLogger } from '@/shared/middleware/requestLogger';
import { errorHandler, notFoundHandler } from '@/shared/middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middlewares
app.use(cors({
  origin: true,  // Permite qualquer origem (ideal para Electron)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(requestLogger);

// Routes
app.use(routes);

// 404 handler (antes do error handler)
app.use('*', notFoundHandler);

// Error handler (sempre por último!)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  Logger.success('Server started');
});

export default app;
