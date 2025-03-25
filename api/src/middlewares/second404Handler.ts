import { Request, Response, NextFunction } from "express";

const second404Handler = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found') as any;
    error.statusCode = 404;
    next(error);
}

export default second404Handler;