import './profile-page.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetching } from '../../hooks/use-fetch';
import { useNavigateTo } from '../../hooks/use-navigate-to';
import { RecordsEntity } from '../../interfaces/records-entity';
import { UsersEntity } from '../../interfaces/users-entity';
import { TweetsService } from '../../services/tweets-service';
import { UsersService } from '../../services/users-service';
import Sidebar from '../sidebar/sidebar';
import Widgets from '../widgets/widgets';

import ProfilePageFeed from './profile-page-feed/profile-page-feed';
import ProfilePageHeader from './profile-page-header/profile-page-header';
import ProfilePageInfo from './profile-page-info/profile-page-info';

function ProfilePage() {
    const { userId = '' } = useParams<string>();
    const [records, setRecords] = useState<RecordsEntity[]>([]);
    const navigateToAuth = useNavigateTo('/auth');
    const currentUser = UsersService.getCurrentUser();
    if (!currentUser) {
        navigateToAuth();

        return <div className="ProfilePage"></div>;
    }

    const [fetchAllFeed, isAllFeedLoading] = useFetching(async () => {
        try {
            const records = await TweetsService.getAllUserTweets(userId);

            setRecords(records);
        } catch (error) {
            navigateToAuth();
        }
    });

    useEffect(() => {
        fetchAllFeed();
    }, []);

    return (
        <div className="ProfilePage">
            <Sidebar activeElement="ProfilePage" />

            <div className="ProfilePage__container">
                <ProfilePageHeader user={currentUser} />
                <ProfilePageInfo user={currentUser} />
                <ProfilePageFeed records={records} />
            </div>

            <Widgets />
        </div>
    );
}

export default ProfilePage;
