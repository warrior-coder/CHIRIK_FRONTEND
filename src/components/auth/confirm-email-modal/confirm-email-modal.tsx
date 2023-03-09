import './confirm-email-modal.css';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { AxiosError } from 'axios';
import React, { BaseSyntheticEvent, useState } from 'react';

import { useNavigateTo } from '../../../hooks/use-navigate-to';
import { AuthService } from '../../../services/auth-service';
import { LocalStorageService } from '../../../services/local-storage-service';

interface ConfirmEmailModalProps {
    setIsVisible?: any;
    isVisible: boolean;
}

function ConfirmEmailModal({ isVisible, setIsVisible }: ConfirmEmailModalProps) {
    const [verificationCode, setVerificationCode] = useState<string>('');
    const navigateToHome = useNavigateTo('/home');
    const [errorMessage, setErrorMessage] = useState('');

    function closeConfirmEmailModal() {
        setIsVisible(false);
    }

    function changeVerificationCode(event: BaseSyntheticEvent) {
        setVerificationCode(event.target.value);
    }

    async function confirmUserEmail() {
        try {
            const userEntityWithJwtPair = await AuthService.confirmUserEmail(verificationCode);

            LocalStorageService.setCurrentUser(userEntityWithJwtPair.user);
            LocalStorageService.setAccessToken(userEntityWithJwtPair.accessToken);
            LocalStorageService.setRefreshToken(userEntityWithJwtPair.refreshToken);

            navigateToHome();
        } catch (error) {
            if (error instanceof AxiosError) {
                const responseErrorMessage: string = error.response?.data.message;

                setErrorMessage(responseErrorMessage.charAt(0).toUpperCase() + responseErrorMessage.slice(1) + '.');
            } else {
                setErrorMessage('Log in error.');
            }
        }
    }

    return (
        <div
            className={isVisible ? 'ConfirmEmailModal ConfirmEmailModal_active' : 'ConfirmEmailModal'}
            onClick={closeConfirmEmailModal}
        >
            <div
                className="ConfirmEmailModal__container"
                onClick={(event: BaseSyntheticEvent) => event.stopPropagation()}
            >
                <div className="ConfirmEmailModal__header">
                    <CloseIcon className="ConfirmEmailModal__close" onClick={closeConfirmEmailModal} />
                    <h1 className="ConfirmEmailModal__title">Enter verification code</h1>
                </div>
                <div className="ConfirmEmailModal__body">
                    <form action="POST" className="ConfirmEmailModal__form">
                        <span className="ConfirmEmailModal__text">
                            We just sent a verification code to your email. Enter that code below.
                        </span>
                        <input
                            value={verificationCode}
                            onChange={changeVerificationCode}
                            type="text"
                            placeholder="code"
                            className="ConfirmEmailModal__input"
                        />
                        <span className="ConfirmEmailModal__error-message">{errorMessage}</span>
                    </form>
                    <Button variant="outlined" className="ConfirmEmailModal__sign-up-button" onClick={confirmUserEmail}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmEmailModal;
