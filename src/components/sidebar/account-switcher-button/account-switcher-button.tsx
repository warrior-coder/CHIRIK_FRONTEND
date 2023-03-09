import './account-switcher-button.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useState } from 'react';

import { useNavigateTo } from '../../../hooks/use-navigate-to';
import { UsersEntity } from '../../../interfaces/users-entity';
import { AuthService } from '../../../services/auth-service';
import { LocalStorageService } from '../../../services/local-storage-service';

interface AccountSwitcherButtonProps {
    currentUser: UsersEntity;
}

function AccountSwitcherButton({ currentUser }: AccountSwitcherButtonProps) {
    const navigateToAuth = useNavigateTo('/auth');
    const [isVisibleAccountSwitcherMenu, setVisibleAccountSwitcherMenu] = useState(false);

    function showAccountSwitcherMenu() {
        setVisibleAccountSwitcherMenu(!isVisibleAccountSwitcherMenu);
    }

    function logOutUser() {
        AuthService.logOutUser();

        LocalStorageService.removeCurrentUser();
        LocalStorageService.removeAccessToken();
        LocalStorageService.removeRefreshToken();

        navigateToAuth();
    }

    return (
        <div className="AccountSwitcherButton" onClick={showAccountSwitcherMenu}>
            <div className="AccountSwitcherButton__body">
                <img
                    src={require('../../../static/images/avatar.png')}
                    alt="avatar"
                    className="AccountSwitcherButton__user-avatar"
                />
                <span className="AccountSwitcherButton__user-name">{currentUser.name}</span>
            </div>

            <MoreHorizIcon className="AccountSwitcherButton__more" />

            <div
                className={
                    isVisibleAccountSwitcherMenu
                        ? 'AccountSwitcherMenu AccountSwitcherMenu_active'
                        : 'AccountSwitcherMenu'
                }
            >
                <div className="AccountSwitcherMenu__log-out" onClick={logOutUser}>
                    Log out
                </div>
            </div>
        </div>
    );
}

export default AccountSwitcherButton;
