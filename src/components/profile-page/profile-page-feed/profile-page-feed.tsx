import './profile-page-feed.css';
import React from 'react';

import { RecordsEntity } from '../../../interfaces/records-entity';
import Post from '../../post/record';

interface ProfilePageFeedProps {
    records: RecordsEntity[];
}

function ProfilePageFeed({ records }: ProfilePageFeedProps) {
    return (
        <div className="ProfilePageFeed">
            {records.map(
                (record: RecordsEntity): JSX.Element => (
                    <Post record={record} key={record.id} />
                ),
            )}
        </div>
    );
}

export default ProfilePageFeed;
