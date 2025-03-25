import Header from "../header/Header";
import styles from "./home.module.css";

const Home = () => {
    return (
        <>
            <Header>
                <h1>Home page</h1>
            </Header>

            <div className={styles.mainText}>REACT CAMPUS</div>
        </>
    );
}

export default Home;