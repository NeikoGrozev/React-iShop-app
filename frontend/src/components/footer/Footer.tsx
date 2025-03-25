import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styles from './footer.module.css';

const Footer = () => {
    return (
        <>
            <footer className={styles.wrapper}>
                <p className={styles.copyright}>Copyright © 2024. All rights reserved.</p>
                <div className={styles.iconContainer}>
                    <Link to='https://www.facebook.com/' className={styles.icon}><FontAwesomeIcon icon={faFacebook} /></Link>
                    <Link to='https://www.instagram.com/' className={styles.icon}><FontAwesomeIcon icon={faInstagram} /></Link>
                </div>
            </footer>
        </>
    );
}

export default Footer;