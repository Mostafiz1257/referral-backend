import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

interface ErrorMessage {
  path: string;
  message: string;
}

interface MongooseValidationError extends Error {
  errors: Record<string, { path: string; message: string }>;
}

interface MongoCastError extends Error {
  path: string;
}

interface MongoDuplicateError extends Error {
  code: number;
}

const errorMiddleware = (
  err:
    | Error
    | ZodError
    | MongooseValidationError
    | MongoCastError
    | MongoDuplicateError,
  req: Request,
  res: Response,
  _next: NextFunction, // Prefix with underscore to indicate intentionally unused
) => {
  let statusCode = 500;
  let message = err.message || 'Internal Server Error';
  let errorMessages: ErrorMessage[] = [{ path: '', message }];

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    const mongooseError = err as MongooseValidationError;
    errorMessages = Object.values(mongooseError.errors).map((el) => ({
      path: el.path,
      message: el.message,
    }));
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Cast Error';
    const castError = err as MongoCastError;
    errorMessages = [{ path: castError.path, message: 'Invalid ID format' }];
  } else if ('code' in err && err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate Entry';
    errorMessages = [{ path: '', message: err.message }];
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errorMessages = err.errors.map((error) => ({
      path: error.path.join('.'),
      message: error.message,
    }));
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorMiddleware;
