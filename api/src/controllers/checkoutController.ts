import express, { Request, Response } from 'express';
import { DUMMYauthHandler } from '../middlewares/DUMMYauthHandler';
const router = express.Router();

router.post('/', DUMMYauthHandler, (req: Request, res: Response) => {
    return res.json({message: 'Order created!'})
});

export default router;