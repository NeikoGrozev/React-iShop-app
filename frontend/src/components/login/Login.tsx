import { ChangeEvent, FormEvent, useState } from "react";
import { LoginUserProps } from "../../interfaces/LoginUserProps";
import Header from "../header/Header";
import styles from './login.module.css';
import { useAppDispatch } from "../../hooks";
import { accountAction } from "../../store/account/slice";
import { useNavigate } from "react-router-dom";

const FormKeys = {
    Username: 'username',
    Password: 'password',
}

const initialState: LoginUserProps = {
    username: '',
    password: ''
}

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(initialState);

    const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setUser(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(`/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch(accountAction.loginOrSignUp(data));
                setUser(initialState);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            <Header>
                <h1>Login</h1>
            </Header>
            <form onSubmit={handleSubmitForm}>
                <div className={styles.inputContainer}>
                    <label htmlFor={FormKeys.Username}>Email: </label>
                    <input
                        type="email"
                        name={FormKeys.Username}
                        value={user.username}
                        onChange={onInputHandler}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor={FormKeys.Password}>Password: </label>
                    <input
                        type="password"
                        name={FormKeys.Password}
                        value={user.password}
                        onChange={onInputHandler}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login;