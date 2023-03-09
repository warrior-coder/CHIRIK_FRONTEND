import './record-header.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { baseUrl } from '../../../constants/base-url';
import { formatDateString } from '../../../formatters/format-date-string';
import { RecordsEntity } from '../../../interfaces/records-entity';

interface RecordHeaderProps {
    record: RecordsEntity;
}

function RecordHeader({ record }: RecordHeaderProps) {
    const navigate = useNavigate();

    function userNameOnClick(event: BaseSyntheticEvent) {
        event.stopPropagation();

        navigate('/profile/' + record.author.id);
    }

    function avatarOnClick(event: BaseSyntheticEvent) {
        event.stopPropagation();

        navigate('/profile/' + record.author.id);
    }

    return (
        <div className="RecordHeader">
            <div className="RecordHeader__body">
                <img
                    src={baseUrl + '/default-user-profile-images/' + 'default-user-avatar.png'}
                    alt="avatar"
                    className="RecordHeader__avatar"
                    onClick={avatarOnClick}
                />
                <div className="RecordHeader__user-name" onClick={userNameOnClick}>
                    {record.author.name}
                </div>
                <div className="RecordHeader__created-at">
                    <span>{formatDateString(record.createdAt)}</span>
                </div>
            </div>

            <MoreHorizIcon className="RecordHeader__more" />
        </div>
    );
}

export default RecordHeader;
