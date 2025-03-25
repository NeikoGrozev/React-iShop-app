import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSelectedColorId, getSelectedSizeId, getVariants, getIsMasterOrVariationProduct, getProduct, getSelectedColorName, getSelectedSizeName } from "../../store/pdp/selectors";
import { getSelectedProductId } from "../../helpers/productHelper";
import { cartAction } from "../../store/cart/slice";
import styles from './addToCartButton.module.css';

const AddToCartButton = () => {
    const dispatch = useAppDispatch();
    let product = useAppSelector(getProduct);
    const isMasterOrVariationProduct: boolean = useAppSelector(getIsMasterOrVariationProduct);
    const selectedColorId = useAppSelector(getSelectedColorId);
    const selectedColorName = useAppSelector(getSelectedColorName);
    const selectedSizeId = useAppSelector(getSelectedSizeId);
    const selectedSizeName = useAppSelector(getSelectedSizeName);
    const variants = useAppSelector(getVariants);

    const onClickButtonHandler = () => {

        if (isMasterOrVariationProduct) {
            const productVariant = getSelectedProductId(selectedColorId, selectedSizeId, variants);
            let productVariantData = {
                productId: productVariant?.productId,
                name: product.name,
                colorId: productVariant?.color,
                colorName: selectedColorName,
                sizeId: productVariant?.size,
                sizeName: selectedSizeName,
                price: productVariant?.price,
                smallImage: product.smallImage
            };

            dispatch(cartAction.addProduct(productVariantData));
        } else {
            dispatch(cartAction.addProduct(product));
        }
    }

    return (
        <>
            <button
                className={styles.button}
                onClick={() => onClickButtonHandler()}
            >
                Add to cart
            </button>
        </>
    )
}

export default AddToCartButton;