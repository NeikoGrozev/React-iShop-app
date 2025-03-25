import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getProductImages } from "../../store/pdp/selectors";
import { useAppSelector } from "../../hooks";
import { Image } from "../../interfaces/ImageProps";
import styles from './imageSlider.module.css';

const ImageSlider = () => {
    const images = useAppSelector(getProductImages);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0'
    };

    return (
        <>
            {images && <Slider {...settings}>
                {images?.map((image: Image, index: number) => (
                    <div className={styles.image} key={index}>
                        <img className={styles.image} src={image.link} alt={image.alt} />
                    </div>
                ))}
            </Slider>}
        </>
    );
}

export default ImageSlider;