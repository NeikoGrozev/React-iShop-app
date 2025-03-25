import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import ProductDetailsPage from './ProductDetailsPage';
import { ProductProps } from '../../interfaces/ProductProps';

fetchMock.enableMocks();

describe('ProductDetailsPage', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('displays product details after a successful fetch', async () => {
        const mockProduct: ProductProps = {
            id: '1',
            name: 'Test Product',
            image: 'test-thumbnail-url',
            description: 'Test Description'
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockProduct));

        render(
            <MemoryRouter initialEntries={['/product/1']}>
                <Routes>
                    <Route path="/product/:productId" element={<ProductDetailsPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

        expect(await screen.findByText(/Test Product/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Test Product/i)).toHaveAttribute('src', 'test-thumbnail-url');
    });
});