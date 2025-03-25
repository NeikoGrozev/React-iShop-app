import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { pdpAction } from "../../store/pdp/slice";
import { getProductDescription, getProductName, getProductPrice } from "../../store/pdp/selectors";
import { useAppDispatch, useAppSelector } from "../../hooks";

import Header from "../header/Header";
import ImageSlider from "../imageSlider/ImageSlider";
import ColorSelector from "./colorSelector/ColorSelector";
import SizeSelector from "./sizeSelector/SizeSelector";
import PATHS from "../../path";
import styles from './productDetailsPage.module.css';
import AddToCartButton from "../addToCartButton/AddToCartButton";
import { isLoggedIn } from "../../store/account/selectors";

const ProductDetailsPage = () => {
    const dispatch = useAppDispatch();
    const { productId } = useParams();

    const name = useAppSelector(getProductName);
    const description = useAppSelector(getProductDescription);
    const price = useAppSelector(getProductPrice);
    const isAuthenticated = useAppSelector(isLoggedIn);

    useEffect(() => {
        fetch(`/products/details/${productId}`)
            .then(res => res.json())
            .then(data => {
                dispatch(pdpAction.setProduct({ ...data }));
            })
            .catch(err => console.log(err));
    }, [dispatch, productId]);

    return (
        <>
            <div className={styles.productDetailsContainer}>
                <Header>
                    <h1>{name}</h1>
                </Header>
                <div className={styles.imgContainer}>
                    <ImageSlider />
                </div>
                <ColorSelector />
                <SizeSelector />
                {description && <div className={styles.textContainer}>
                    <p><span className={styles.text}>Description: </span>{description}</p>
                </div>}
                <div>
                    <h3>Price: ${price}</h3>
                    {isAuthenticated && <AddToCartButton />}
                </div>
                <div className={styles.button}>
                    <Link to={PATHS.ProductListPage}>&lt; Back</Link>
                </div>
            </div>
        </>
    );
}

export default ProductDetailsPage;