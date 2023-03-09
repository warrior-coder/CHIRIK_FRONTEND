import './comment.css';
import React, { BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { RecordsEntity } from '../../interfaces/records-entity';
import PostBody from '../post/record-body/record-body';
import PostFooter from '../post/record-footer/record-footer';
import PostHeader from '../post/record-header/record-header';

interface CommentProps {
    record: RecordsEntity;
}

function Comment({ record }: CommentProps) {
    const navigate = useNavigate();

    function navigateToRecordId(event: BaseSyntheticEvent) {
        event.stopPropagation();
        navigate('/record/' + record.id);
    }

    return (
        <div className="Comment" onClick={navigateToRecordId}>
            <PostHeader record={record} />
            <span className="CreateCommentModal__replying-to">Replying to{record.author.name}</span>
            <PostBody record={record} />
            <PostFooter record={record} />
        </div>
    );
}

export default Comment;
