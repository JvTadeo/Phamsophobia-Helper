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
  Logger.server('🚀 Backend running', PORT);
  Logger.info('📊 Health check endpoint available', `http://localhost:${PORT}/health`);
  Logger.info('📰 News endpoint available', `http://localhost:${PORT}/news?limit=5`);
  Logger.success('Clean Architecture backend started successfully!');
  Logger.info('🔧 CORS configured for Electron app');
  
  // Exemplo de log customizado com regex para colorir números
  Logger.custom(
    /(\d+)/g, 
    '\x1b[93m$1\x1b[0m', 
    `Server listening on port ${PORT} with custom colored numbers`
  );
  
  // Exemplo de log customizado para URLs
  Logger.custom(
    /(http:\/\/[^\s]+)/g,
    '\x1b[96m\x1b[4m$1\x1b[0m',
    `Access the app at http://localhost:${PORT} (clickable link)`
  );
});

export default app;
