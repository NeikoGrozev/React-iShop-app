import express, { Request, Response } from 'express';
import { getProductsData, getProductData } from '../helpers/productHelpers';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const { query }: {query?: string} = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Missing query parameter' })
    }

    try {
        const productsData = await getProductsData(query);

        return res.json(productsData.hits);
    } catch {
        return res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.get('/details/:id', async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!productId) {
        return res.status(400).json({ error: 'Missing product id' })
    }
    try {
        const productData = await getProductData(productId);
        
        return res.json(productData);
    } catch {
        return res.status(500).json({ error: 'Failed to fetch product' });
    }
});

export default router;