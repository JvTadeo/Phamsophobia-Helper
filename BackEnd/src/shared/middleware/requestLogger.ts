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
  const startTime = Date.now();
  
  // Log da requisição
  Logger.request(req.method, req.originalUrl);
  
  // Interceptar o final da resposta
  const originalSend = res.send;
  
  res.send = function(data) {
    const duration = Date.now() - startTime;
    const status = res.statusCode;
    
    // Log da resposta com status e duração
    Logger.request(req.method, req.originalUrl, status);
    Logger.debug(`Request completed in ${duration}ms`, {
      method: req.method,
      url: req.originalUrl,
      status,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
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
