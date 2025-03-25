import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import Home from "./components/home/Home";
import SignUp from "./components/signUp/SignUp";
import Login from "./components/login/Login";
import ProductsListPage from "./components/productsListPage/ProductsListPage";
import ProductDetailsPage from "./components/productDetailsPage/ProductDetailsPage";
import Footer from "./components/footer/Footer";

import './App.css';
import PATHS from "./path";
import { useAppDispatch } from "./hooks";
import { accountAction } from "./store/account/slice";
import CartPage from "./components/cartPage/cartPage";
import Message from "./components/message/Message";
const Cookies = require('js-cookie');

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = Cookies.get('authToken');
        const username = Cookies.get('username');

        if (token) {
            dispatch(accountAction.loginOrSignUp({ username, token }));
        }
    }, [dispatch]);

    return (
        <>
            <div className="wrapper">
                <Message />
                <Routes>
                    <Route path={PATHS.Home} element={<Home />} />
                    <Route path={PATHS.SignUp} element={<SignUp />} />
                    <Route path={PATHS.Login} element={<Login />} />
                    <Route path={PATHS.ProductListPage} element={<ProductsListPage />} />
                    <Route path={PATHS.ProductDetailsPage} element={<ProductDetailsPage />} />
                    <Route path={PATHS.CartPage} element={<CartPage />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
}

export default App;