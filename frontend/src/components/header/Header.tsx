import { Link, useNavigate } from 'react-router-dom';
import { accountAction } from '../../store/account/slice';
import { isLoggedIn } from '../../store/account/selectors';
import { getTotalQuantity } from '../../store/cart/selector';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import PATHS from "../../path";
import HeaderProps from '../../interfaces/HeaderProps';
import styles from './header.module.css';


const Header = ({ children }: HeaderProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useAppSelector(isLoggedIn);
    const totalQuantity = useAppSelector(getTotalQuantity);

    const onClickLogoutHandler = () => {
        dispatch(accountAction.logout());
        navigate('/');
    };

    return (
        <>
            <div className={styles.headerContainer}>
                <Link to={PATHS.Home} className={styles.logo}>
                    <p>REACT CAMPUS</p>
                </Link>
                <div className={styles.menuContainer}>
                    <div className={styles.button}>
                        <Link to={PATHS.Home}>Home</Link>
                    </div>
                    <div className={styles.button}>
                        <Link to={PATHS.ProductListPage}>Products</Link>
                    </div>
                    {isAuthenticated && <div className={`${styles.button} ${styles.basket}`}>
                        <Link to={PATHS.CartPage} className={styles.icon}><FontAwesomeIcon icon={faCartShopping} />
                            <span className={styles.totalQuantity}>{totalQuantity}</span>
                        </Link>
                    </div>}
                    {!isAuthenticated && <div className={styles.button}>
                        <Link to={PATHS.Login}>Login</Link>
                    </div>}
                    {!isAuthenticated && <div className={styles.button}>
                        <Link to={PATHS.SignUp}>Sign Up</Link>
                    </div>}
                    {isAuthenticated && <div className={styles.button} onClick={() => onClickLogoutHandler()}>
                        <Link to={''}>Logout</Link>
                    </div>}
                </div>
            </div>
            {children}
        </>
    );
}

export default Header;