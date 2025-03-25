import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getColorVariation, getDifferentColorImages, getSelectedColorId } from "../../../store/pdp/selectors";
import { pdpAction } from "../../../store/pdp/slice";
import styles from './colorSelector.module.css';

const ColorSelector = () => {
    const dispatch = useAppDispatch();
    const differentColorImages = useAppSelector(getDifferentColorImages);
    const colors = useAppSelector(getColorVariation);
    const selectedColor = useAppSelector(getSelectedColorId);

    const onColorClickHandler = (colorName: string, colorId: string) => {
        dispatch(pdpAction.setSelectedColor({ colorName, colorId }));
    }

    return (
        <>
            {differentColorImages && (
                <>
                    <div className={styles.colorVariationTitle}>Color</div>
                    <div className={styles.colorVariationContainer}>
                        {differentColorImages?.map((item, index) => (
                            <Link
                                to={`/product/details/${item.productId}`}
                                key={index}
                                className={`${styles.colorVariationItem} ${item.color === selectedColor ? styles.colorActive : ''}`}
                                onClick={() => onColorClickHandler(colors[item.color], item.color)}
                            >
                                <img className={styles.colorVariationImage} src={item.colorImage} alt="" />
                                <p className={styles.colorVariationName}>{colors[item.color]}</p>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default ColorSelector;