import './auth-page.css';
import Twitter from '@mui/icons-material/Twitter';
import React from 'react';

import AuthInfoWidget from './auth-info-widget/auth-info-widget';
import AuthWidget from './auth-widget/auth-widget';

function AuthPage() {
    return (
        <div className="AuthPage">
            <div className="AuthPage__left-container">
                <Twitter className="AuthPage__left-container__background" />
                <AuthInfoWidget />
            </div>
            <div className="AuthPage__right-container">
                <AuthWidget />
            </div>
        </div>
    );
}

export default AuthPage;
