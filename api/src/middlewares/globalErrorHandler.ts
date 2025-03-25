import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.errorMessage || 'Unknown server error';
    res.status(statusCode).json({ error: errorMessage });
}

export default globalErrorHandler;