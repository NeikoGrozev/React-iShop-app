import { Link } from "react-router-dom";
import { ProductProps } from "../../interfaces/ProductProps";
import styles from './card.module.css';

const Card = ({ id, name, image }: ProductProps) => {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.titleContainer}>
                    <p className={styles.title}>{name}</p>
                </div>
                <div className={styles.imgContainer}>
                    <img src={image} alt={name} />
                </div>
                <div className={styles.button}>
                    <Link to={`/product/details/${id}`}>Details...</Link>
                </div>
            </div>
        </>
    );
}

export default Card;