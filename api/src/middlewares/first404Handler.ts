import { Request, Response, NextFunction } from 'express';

const first404Handler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: "404 not found" })
}

export default first404Handler;