import { render, screen } from "@testing-library/react";
import Card from "./Card";
import { ProductProps } from "../../interfaces/ProductProps";

jest.mock('../button/Button', () => {
    return ({ href, text }: { href: string; text: string }) => (
        <a href={href}>{text}</a>
    );
});

describe(Card, () => {
    const cardData: ProductProps = {
        id: '1',
        name: 'Card test',
        image: 'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png',
        description: 'Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.'
    };



    test('render card', () => {
        render(<Card {...cardData} />);

        const title = screen.getByText('Card test');
        expect(title).toHaveTextContent('Card test');

        const img = screen.getByAltText(/Card test/i);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png');
    });
});