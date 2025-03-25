import { Request, Response, NextFunction } from 'express';

export const DUMMYauthHandler = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(' ')[1];
    console.log(req.headers.authorization);
    

    if (!accessToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
}