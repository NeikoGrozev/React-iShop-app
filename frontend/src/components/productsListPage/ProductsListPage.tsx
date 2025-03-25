import SearchBar from "../searchBar/SearchBar";
import Card from "../card/Card";
import { ProductProps } from "../../interfaces/ProductProps";
import { useAppDispatch, useAppSelector } from "../../hooks";

import Header from "../header/Header";
import { plpAction } from "../../store/plp/slice";
import styles from './productListPage.module.css';

const ProductsListPage = () => {
    const dispatch = useAppDispatch();
    const query = useAppSelector((state) => state.plp.query);
    const products = useAppSelector((state) => state.plp.products);

    const onSearch = () => {
        fetch(`/products?query=${query}`)
            .then(res => res.json())
            .then(data => {
                const modifiedData = data.map((item: any) => ({
                    ...item,
                    id: item.product_id,
                    name: item.product_name,
                    image: item.image.link
                }));
                dispatch(plpAction.setProducts(modifiedData));
            })
            .catch(err => {
                dispatch(plpAction.setProducts([]));
                console.log(err);
            });
    };

    return (
        <>
            <Header>
                <h1>Product List Page</h1>
            </Header>
            <SearchBar onSearch={onSearch} />
            <div className={styles.productListWrapper}>
                {products?.map((product: ProductProps) => (
                    <Card key={product.id} {...product} />
                ))}
                {!products?.length && <p className={styles.text}>Product not found!</p>}
            </div>
        </>
    );
}

export default ProductsListPage;