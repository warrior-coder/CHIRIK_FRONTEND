import './record-footer.css';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import RepeatIcon from '@mui/icons-material/Repeat';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';

import { RecordFooterInfo } from '../../../interfaces/record-footer-info';
import { RecordsEntity } from '../../../interfaces/records-entity';
import { CommentsService } from '../../../services/comments-service';
import CreateCommentModal from '../../create-comment-modal/create-comment-modal';

interface RecordFooterProps {
    record: RecordsEntity;
}

function RecordFooter({ record }: RecordFooterProps) {
    const [isVisibleCreateCommentModal, setVisibleCreateCommentModal] = useState(false);
    const [postFooterInfo, setRecordFooterInfo] = useState<RecordFooterInfo>({
        commentsCount: 0,
        retweetsCount: 0,
        likesCount: 0,
    });

    async function loadFooterInfo() {
        try {
            const commentsCount = await CommentsService.getRecordCommentsCount(record.id);

            setRecordFooterInfo({
                ...postFooterInfo,
                commentsCount: commentsCount.commentsCount,
            });
        } catch (error) {
            // console.error(error);
        }
    }

    useEffect(() => {
        loadFooterInfo();
    }, []);

    function showCreateCommentModal(event: BaseSyntheticEvent) {
        event.stopPropagation();

        setVisibleCreateCommentModal(true);
    }

    function showCreateRetweetModal(event: BaseSyntheticEvent) {
        event.stopPropagation();
    }

    function createLikeOnRecord(event: BaseSyntheticEvent) {
        event.stopPropagation();
    }

    function showShareRecordModal(event: BaseSyntheticEvent) {
        event.stopPropagation();
    }

    return (
        <div className="RecordFooter">
            <div className="RecordFooter__comment" onClick={showCreateCommentModal}>
                <ChatBubbleOutlineIcon fontSize="small" className="RecordFooter__comment-icon" />
                <span>{postFooterInfo.commentsCount ? postFooterInfo.commentsCount : ''}</span>
            </div>
            <div className="RecordFooter__retweet" onClick={showCreateRetweetModal}>
                <RepeatIcon fontSize="small" className="RecordFooter__retweet-icon" />
                <span>{postFooterInfo.retweetsCount ? postFooterInfo.retweetsCount : ''}</span>
            </div>
            <div className="RecordFooter__like" onClick={createLikeOnRecord}>
                <FavoriteBorderIcon fontSize="small" className="RecordFooter__like-icon" />
                <span>{postFooterInfo.likesCount ? postFooterInfo.likesCount : ''}</span>
            </div>
            <div className="RecordFooter__share">
                <IosShareIcon fontSize="small" className="RecordFooter__share-icon" onClick={showShareRecordModal} />
            </div>

            <CreateCommentModal
                isVisibleCreateCommentModal={isVisibleCreateCommentModal}
                setVisibleCreateCommentModal={setVisibleCreateCommentModal}
                parentRecord={record}
            />
        </div>
    );
}

export default RecordFooter;
