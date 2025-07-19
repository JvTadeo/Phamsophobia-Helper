import { Request, Response, NextFunction } from 'express';

// 🎯 Wrapper que captura erros automaticamente
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
