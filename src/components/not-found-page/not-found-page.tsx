import './not-found-page.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../sidebar/sidebar';
import Widgets from '../widgets/widgets';

function NotFoundPage() {
    const navigate = useNavigate();

    function backButtonOnCLick() {
        navigate('/home');
    }

    return (
        <div className="NotFoundPage">
            <Sidebar activeElement="" />

            <div className="NotFoundPage__container">
                <div className="NotFoundPage__header">
                    <ArrowBackIcon className="NotFoundPage__back-button" onClick={backButtonOnCLick} />
                    <h1 className="NotFoundPage__title">Page not found</h1>
                </div>
                <div className="NotFoundPage__body">
                    <span className="NotFoundPage__text">Page not found.</span>
                </div>
            </div>

            <Widgets />
        </div>
    );
}

export default NotFoundPage;
