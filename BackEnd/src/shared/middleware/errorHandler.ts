import { Request, Response, NextFunction } from 'express';
import { AppError } from '../exceptions/AppError';
import { Logger } from '../utils/Logger';

const StatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

const ErrorMessages = {
  ROUTE_NOT_FOUND: 'Route not found',
  INTERNAL_SERVER_ERROR: 'Internal server error'
};

export const errorHandler = (
  error: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  // Log do erro
  Logger.error('Error caught by error handler', {
    error: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });

  // ✅ Se for um erro operacional conhecido (AppError)
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message
    });
    return;
  }

  // 🔍 Tratar erros específicos comuns
  
  // Erro de validação (Use Case)
  if (error.message.includes('Limit must be between')) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message
    });
    return;
  }

  // Erro do Steam API
  if (error.message.includes('Steam API') || error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: 'Steam API is currently unavailable. Please try again later.'
    });
    return;
  }

  // Erro de parsing JSON
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: 'Invalid JSON format'
    });
    return;
  }

  // ❌ Erro não tratado - resposta genérica
  Logger.error('Unhandled error occurred', error);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'ERROR',
    timestamp: new Date().toISOString(),
    error: ErrorMessages.INTERNAL_SERVER_ERROR,
    ...(process.env.NODE_ENV === 'development' && { 
      debug: error.message,
      stack: error.stack 
    })
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  Logger.warn('Route not found', { 
    path: req.originalUrl, 
    method: req.method,
    ip: req.ip 
  });
  
  res.status(StatusCodes.NOT_FOUND).json({
    status: 'ERROR',
    timestamp: new Date().toISOString(),
    error: ErrorMessages.ROUTE_NOT_FOUND,
    path: req.originalUrl
  });
};
