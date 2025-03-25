import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProductInBasket, getTotalPrice } from "../../store/cart/selector";
import { cartAction } from "../../store/cart/slice";
import { messageAction } from "../../store/message/slice";
import Header from "../header/Header";
import styles from './cartPage.module.css';
import { useNavigate } from "react-router-dom";
const Cookies = require('js-cookie');

const CartPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const basket = useAppSelector(getProductInBasket);
    const totalPrice = useAppSelector(getTotalPrice);

    const onClickAddProductHandler = (product: any) => {
        dispatch(cartAction.addProduct(product));
    };

    const onClickRemoveProductHandler = (product: any) => {
        dispatch(cartAction.removeProduct(product.productId));
    };

    const onClickCreateOrderHandler = () => {
        const authToken = Cookies.get('authToken');

        fetch('/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${authToken}`
            },
            body: JSON.stringify({ basket: basket })
        })
            .then(res => res.json())
            .then(data => {
                dispatch(messageAction.showMessage(data.message));

                if (data.message === 'Order created!') {
                    dispatch(cartAction.removeBasket());
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Header>
                <h1>Cart Page</h1>
            </Header>

            {basket?.map((product, index) =>
            (<div className={styles.productContainer} key={index}>
                <div className={styles.index}>{index + 1}.</div>
                <div><img src={product.smallImage} alt={product.name} /></div>
                <div className={styles.name}>{product.name}</div>
                {product.colorName &&
                    <div className={styles.columnContainer}>
                        <div className={styles.columnTitle}>Color</div>
                        <div className={styles.columnValue}>{product.colorName}</div>
                    </div>}
                {product.sizeName &&
                    <div className={styles.columnContainer}>
                        <div className={styles.columnTitle}>Size</div>
                        <div className={styles.columnValue}>{product.sizeName}</div>
                    </div>}
                <div className={styles.columnContainer}>
                    <div className={styles.columnTitle}>Quantity</div>
                    <div className={styles.quantityContainer}>
                        <div className={styles.quantityButton} onClick={() => onClickRemoveProductHandler(product)}>-</div>
                        <div className={styles.quantity}>{product.quantity}</div>
                        <div className={styles.quantityButton} onClick={() => onClickAddProductHandler(product)}>+</div>
                    </div>
                </div>

                <div className={styles.columnContainer}>
                    <div className={styles.columnTitle}>Price</div>
                    <div className={styles.columnValue}>{product.price}</div>
                </div>
                <div className={styles.columnContainer}>
                    <div className={styles.columnTitle}>Total Product Price</div>
                    <div className={styles.columnValue}>{product.totalPrice}</div>
                </div>
            </div>
            ))}

            {!!basket.length &&
                <div className={styles.bottomContainer}>
                    <div className={styles.totalPriceContainer} >
                        <div className={styles.totalPriceTitle}>Total Price: <span className={styles.totalPriceValue}>$ {totalPrice}</span></div>
                    </div>
                    <div className={styles.checkoutButton} onClick={() => onClickCreateOrderHandler()}>Checkout</div>
                </div>
            }

            {!basket.length && <div className={styles.emptyBasket}>Basket is empty!!!</div>}

        </>
    )
}

export default CartPage;