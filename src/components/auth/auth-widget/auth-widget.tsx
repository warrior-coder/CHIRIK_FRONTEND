import './auth-widget.css';
import { Button } from '@material-ui/core';
import TwitterIcon from '@mui/icons-material/Twitter';
import React, { useState } from 'react';

import ConfirmEmailModal from '../confirm-email-modal/confirm-email-modal';
import LogInModal from '../log-in-modal/log-in-modal';
import SignUpModal from '../sign-up-modal/sign-up-modal';

function AuthWidget() {
    const [isVisibleSignUpModal, setIsVisibleSignUpModal] = useState(false);
    const [isVisibleLogInModal, setIsVisibleLogInModal] = useState(false);
    const [isVisibleConfirmEmailModal, setIsVisibleConfirmEmailModal] = useState(false);

    function showConfirmEmailModal() {
        setIsVisibleConfirmEmailModal(true);
    }

    function signUpButtonOnClick() {
        setIsVisibleSignUpModal(true);
    }

    function logInButtonOnClick() {
        setIsVisibleLogInModal(true);
    }

    return (
        <div className="AuthWidget">
            <div className="AuthWidget__header">
                <TwitterIcon className="AuthWidget__logo" />
                <h1 className="AuthWidget__title">See what&apos;s happening in the world now </h1>
            </div>
            <div className="AuthWidget__body">
                <h2 className="AuthWidget__subtitle">Join Twitter today!</h2>

                <Button
                    variant="outlined"
                    className="AuthWidget__sign-up-button"
                    fullWidth
                    onClick={signUpButtonOnClick}
                >
                    Sign Up
                </Button>

                <Button variant="outlined" className="AuthWidget__log-in-button" fullWidth onClick={logInButtonOnClick}>
                    Log in
                </Button>

                <SignUpModal
                    isVisible={isVisibleSignUpModal}
                    setIsVisible={setIsVisibleSignUpModal}
                    show={showConfirmEmailModal}
                />

                <LogInModal isVisible={isVisibleLogInModal} setIsVisible={setIsVisibleLogInModal} />

                <ConfirmEmailModal
                    isVisible={isVisibleConfirmEmailModal}
                    setIsVisible={setIsVisibleConfirmEmailModal}
                />
            </div>
        </div>
    );
}

export default AuthWidget;
