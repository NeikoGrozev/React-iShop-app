import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

import App from "./App";

describe(App, () => {

    beforeEach(() => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
    });

    test('render home page', () => {
        const homePageText = screen.getByText(/home page/i);

        expect(homePageText).toBeInTheDocument();
    });

    test('render products list page', () => {
        const productsButton = screen.getByText(/products/i);
        fireEvent.click(productsButton);
        const productListPageText = screen.getByText(/product list page/i);

        expect(productListPageText).toBeInTheDocument();
    });

    test('render home page after click button', () => {
        const productsButton = screen.getByText(/products/i);
        fireEvent.click(productsButton);

        const homeButton = screen.getByText(/home/i);
        fireEvent.click(homeButton);
        const homePageText = screen.getByText(/home page/i);

        expect(homePageText).toBeInTheDocument();
    });
});
