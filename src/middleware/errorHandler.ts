import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode: number;
  isOperational?: boolean;
}

export const createError = (message: string, statusCode: number): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // TODO: Implement proper error handling
  // - Handle different types of errors (validation, not found, server errors)
  // - Return appropriate HTTP status codes
  // - Format error responses consistently
  // - Log errors appropriately
  
  // No console.error unless 5xx error (the no console errors task is in Success Criteria)
  const statusCode = err.statusCode || 500; // default to 500 error
  if (statusCode >= 500) {
    console.error(err);
  }

  // Default error response
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode,
      timestamp: new Date().toISOString(),
    },
  });
}; 