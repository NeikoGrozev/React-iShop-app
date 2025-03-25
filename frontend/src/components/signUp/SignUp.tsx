import { ChangeEvent, FormEvent, useState } from "react";
import { SignUpUserProps } from "../../interfaces/SignUpUserProps";
import Header from "../header/Header";
import styles from './signUp.module.css';
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { accountAction } from "../../store/account/slice";

const FormKeys = {
    FirstName: 'firstName',
    LastName: 'lastName',
    Email: 'email',
    Password: 'password',
}

const initialState: SignUpUserProps = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const SignUp = () => {
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

        fetch('/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
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
    }

    return (
        <>
            <Header>
                <h1>Sign Up</h1>
            </Header>
            <form onSubmit={handleSubmitForm}>
                <div className={styles.inputContainer}>
                    <label htmlFor={FormKeys.FirstName}>First Name: </label>
                    <input
                        type="text"
                        name={FormKeys.FirstName}
                        value={user.firstName}
                        onChange={onInputHandler}
                        placeholder="First name"
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor={FormKeys.LastName}>Last Name: </label>
                    <input
                        type="text"
                        name={FormKeys.LastName}
                        value={user.lastName}
                        onChange={onInputHandler}
                        placeholder="Last name"
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor={FormKeys.Email}>Email: </label>
                    <input
                        type="email"
                        name={FormKeys.Email}
                        value={user.email}
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
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}

export default SignUp;