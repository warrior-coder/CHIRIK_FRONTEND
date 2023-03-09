import './profile-page-info.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from 'react';

import { baseUrl } from '../../../constants/base-url';
import { formatDateString } from '../../../formatters/format-date-string';
import { UsersEntity } from '../../../interfaces/users-entity';

interface ProfilePageInfoProps {
    user: UsersEntity;
}

function ProfilePageInfo({ user }: ProfilePageInfoProps) {
    const defaultUserCoverUrl = baseUrl + '/default-user-profile-images/' + 'default-user-cover.png';
    const defaultUserAvatarUrl = baseUrl + '/default-user-profile-images/' + 'default-user-avatar.png';

    return (
        <div className="ProfilePageInfo">
            <div
                className="ProfilePageInfo__background"
                style={{
                    backgroundImage: `url(${defaultUserCoverUrl})`,
                }}
            ></div>

            <div className="ProfilePageInfo__header">
                <img src={defaultUserAvatarUrl} alt="avatar" className="ProfilePageInfo__avatar" />
            </div>

            <div className="ProfilePageInfo__body">
                <span className="ProfilePageInfo__user-name">{user.name}</span>
                <div className="ProfilePageInfo__joined-container">
                    <CalendarMonthIcon className="ProfilePageInfo__joined-icon" />
                    <span className="ProfilePageInfo__joined-date">Joined {formatDateString(user.createdAt)}</span>
                </div>
                <div className="ProfilePageInfo__following-and-followers">
                    <div className="ProfilePageInfo__following">
                        <span className="ProfilePageInfo__following-count">23</span> Following
                    </div>
                    <div className="ProfilePageInfo__followers">
                        <span className="ProfilePageInfo__followers-count">176</span> Followers
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePageInfo;
