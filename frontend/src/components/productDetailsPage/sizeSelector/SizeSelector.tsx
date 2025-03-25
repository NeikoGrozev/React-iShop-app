import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getSelectedSizeId, getSizeVariation } from '../../../store/pdp/selectors';
import { pdpAction } from '../../../store/pdp/slice';
import styles from './sizeSelector.module.css';

const SizeSelector = () => {
    const dispatch = useAppDispatch();
    const sizeVariation = useAppSelector(getSizeVariation);
    const selectedSize = useAppSelector(getSelectedSizeId);

    const onSizeClickHandler = (sizeName: string, sizeId: string) => {
        dispatch(pdpAction.setSelectedSize({ sizeName, sizeId }));
    }

    return (
        <>
            {sizeVariation && (
                <>
                    <div className={styles.sizeVariationTitle}>Size</div>
                    <div className={styles.sizeVariationContainer}>
                        {Object.keys(sizeVariation).map((key: string) => (
                            <div
                                key={key}
                                className={`${styles.sizeVariationItem} ${key === selectedSize ? styles.activeSize : ''}`}
                                onClick={() => onSizeClickHandler(sizeVariation[key], key)}
                            >
                                {sizeVariation[key]}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default SizeSelector;