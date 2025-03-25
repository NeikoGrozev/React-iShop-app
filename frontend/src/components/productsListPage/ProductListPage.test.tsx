import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

import ProductsListPage from './ProductsListPage';
import { ProductProps } from '../../interfaces/ProductProps';

fetchMock.enableMocks();

describe('ProductsListPage', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('displays products after a successful fetch', async () => {
        const mockProducts: ProductProps[] = [
            { id: '1', name: 'Product 1', description: 'Description 1', image: 'url1' },
            { id: '2', name: 'Product 2', description: 'Description 2', image: 'url2' },
        ];

        fetchMock.mockResponseOnce(JSON.stringify({ products: mockProducts }));

        render(<Router><ProductsListPage /></Router>);

        const searchBar = screen.getByPlaceholderText(/search/i);
        fireEvent.change(searchBar, { target: { value: 'test' } });

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

        const productCards = screen.getAllByText(/Product/);
        expect(productCards.length).toBe(3);
    });

    test('displays "Product not found!"', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ products: [] }));

        // render(<ProductsListPage />);
        render(<Router><ProductsListPage /></Router>);


        const searchBar = screen.getByPlaceholderText(/search/i);
        fireEvent.change(searchBar, { target: { value: 'test' } });

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

        const notFoundMessage = screen.getByText(/Product not found!/i);
        expect(notFoundMessage).toBeInTheDocument();
    });

    test('handles fetch error gracefully', async () => {
        fetchMock.mockReject(new Error('Failed to fetch'));

        // render(<ProductsListPage />);
        render(<Router><ProductsListPage /></Router>);


        const searchBar = screen.getByPlaceholderText(/search/i);
        fireEvent.change(searchBar, { target: { value: 'test' } });

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

        const errorMessage = screen.getByText(/Product not found!/i);
        expect(errorMessage).toBeInTheDocument();
    });
});