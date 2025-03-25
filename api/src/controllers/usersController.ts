import express, { Request, Response } from 'express';
import { loginUser, signUpUser, validateCustomer } from '../helpers/userHelpers';
const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = validateCustomer(req.body);
        
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'Missing user parameter' })
        }

        const userData = {
            "customer": {
                "login": email,
                "email": email,
                "first_name": firstName,
                "last_name": lastName
            },
            "password": password
        };

        const responseSignUpData = await signUpUser(userData);
        const data = await responseSignUpData.json();

        if (data.fault) {
            throw new Error(data.fault.message);
        }

        const token = responseSignUpData.headers.get('authorization') || '';
        const response = {
            username: data.login,
            token
        }

        return res.json(response);
    } catch {
        return res.status(500).json({ error: 'Failed to fetch user registration!' });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { username, password }: { username?: string, password?: string } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Missing user parameter' })
    }

    try {
        const responseLoginData = await loginUser(username, password);
        const data = await responseLoginData.json();

        if (data.fault) {
            throw new Error(data.fault.message);
        }

        const token = responseLoginData.headers.get('authorization') || '';
        const response = {
            username: data.login,
            token
        };

        return res.json(response);
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Failed to fetch user login!' });
    }
});

export default router;