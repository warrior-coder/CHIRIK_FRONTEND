import './home-page-feed.css';
import React, { useEffect, useState } from 'react';

import { eventEmitter } from '../../../event-emitter/event-emitter';
import { useFetching } from '../../../hooks/use-fetch';
import { useNavigateTo } from '../../../hooks/use-navigate-to';
import { RecordsEntity } from '../../../interfaces/records-entity';
import { TweetsService } from '../../../services/tweets-service';
import Post from '../../post/record';

function HomePageFeed() {
    const [records, setRecords] = useState<RecordsEntity[]>([]);
    const navigateToAuth = useNavigateTo('/auth');
    const [page, setPage] = useState<number>(0);
    const limit = 5;
    const [fetchAllFeed, isAllFeedLoading] = useFetching(async () => {
        try {
            const records = await TweetsService.getPaginatedAllTweets(page, limit);

            setRecords(records);
        } catch (error) {
            navigateToAuth();
        }
    });

    useEffect(() => {
        fetchAllFeed();

        eventEmitter.addListener('create-tweet', fetchAllFeed);
    }, []);

    async function viewMoreTweets() {
        try {
            const moreRecords = await TweetsService.getPaginatedAllTweets(page + 1, limit);

            setPage(page + 1);
            setRecords([...records, ...moreRecords]);
        } catch (error) {
            navigateToAuth();
        }
    }

    return (
        <div className="HomePageFeed">
            {records.map(
                (record: RecordsEntity): JSX.Element => (
                    <Post record={record} key={record.id} />
                ),
            )}
            <span className="HomePageFeed__view-more" onClick={viewMoreTweets}>
                View more
            </span>
        </div>
    );
}

export default HomePageFeed;
