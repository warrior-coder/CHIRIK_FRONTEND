import './profile-page-header.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UsersEntity } from '../../../interfaces/users-entity';

interface ProfilePageHeaderProps {
    user: UsersEntity;
}

function ProfilePageHeader({ user }: ProfilePageHeaderProps) {
    const navigate = useNavigate();

    function navigateToHome() {
        navigate('/home');
    }

    return (
        <div className="ProfilePageHeader">
            <ArrowBackIcon className="ProfilePageHeader__back-button" onClick={navigateToHome} />
            <div className="ProfilePageHeader__body">
                <h1 className="ProfilePageHeader__user-name">{user.name}</h1>
                <span className="ProfilePageHeader__tweets-count">17 Tweets</span>
            </div>
        </div>
    );
}

export default ProfilePageHeader;
