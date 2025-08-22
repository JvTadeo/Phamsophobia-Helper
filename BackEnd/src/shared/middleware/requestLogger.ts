import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/Logger';

export interface RequestLog {
  method: string;
  url: string;
  ip: string;
  userAgent?: string;
  timestamp: Date;
  duration?: number;
  status?: number;
}

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  // Log da requisição
  Logger.request(req.method, req.originalUrl);
  
  // Interceptar o final da resposta
  const originalSend = res.send;
  
  res.send = function(data) {
    const status = res.statusCode;
    
    Logger.request(req.method, req.originalUrl, status);
    
    return originalSend.call(this, data);
  };
  
  next();
};

export const errorLogger = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  Logger.error('Request error occurred', {
    error: error.message,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    stack: error.stack
  });
  
  next(error);
};
