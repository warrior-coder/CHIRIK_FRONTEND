import './sign-up-modal.css';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { AxiosError } from 'axios';
import React, { BaseSyntheticEvent, useState } from 'react';

import { AuthService } from '../../../services/auth-service';
import { LocalStorageService } from '../../../services/local-storage-service';

interface SignUpModalProps {
    setIsVisible?: any;
    isVisible: boolean;
    show: any;
}

function SignUpModal({ isVisible, setIsVisible, show }: SignUpModalProps) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function close() {
        setIsVisible(false);
    }

    function changeUserEmail(event: BaseSyntheticEvent) {
        setUserEmail(event.target.value);
    }

    function changeUserPassword(event: BaseSyntheticEvent) {
        setUserPassword(event.target.value);
    }

    function changeUserName(event: BaseSyntheticEvent) {
        setUserName(event.target.value);
    }

    async function signUpUser() {
        setErrorMessage('');

        try {
            await AuthService.signUpUser(userName, userEmail, userPassword);

            show();
        } catch (error) {
            if (error instanceof AxiosError) {
                const responseErrorMessage: string = error.response?.data.message;

                setErrorMessage(responseErrorMessage.charAt(0).toUpperCase() + responseErrorMessage.slice(1) + '.');
            } else {
                setErrorMessage('Sign up error.');
            }
        }
    }

    return (
        <div className={isVisible ? 'SignUpModal SignUpModal_active' : 'SignUpModal'} onClick={close}>
            <div className="SignUpModal__container" onClick={(event: BaseSyntheticEvent) => event.stopPropagation()}>
                <div className="SignUpModal__header">
                    <CloseIcon className="SignUpModal__close" onClick={close} />
                    <h1 className="SignUpModal__title">Create an account</h1>
                </div>
                <div className="SignUpModal__body">
                    <form action="POST" className="SignUpModal__form">
                        <input
                            type="text"
                            placeholder="name"
                            className="SignUpModal__input"
                            value={userName}
                            onChange={changeUserName}
                        />
                        <input
                            type="text"
                            placeholder="email"
                            className="SignUpModal__input"
                            value={userEmail}
                            onChange={changeUserEmail}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            className="SignUpModal__input"
                            value={userPassword}
                            onChange={changeUserPassword}
                        />
                        <span className="SignUpModal__error-message">{errorMessage}</span>
                    </form>
                    <Button variant="outlined" className="SignUpModal__sign-up-button" onClick={signUpUser}>
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SignUpModal;
