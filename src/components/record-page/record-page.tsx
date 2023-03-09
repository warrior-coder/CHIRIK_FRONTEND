import './record-page.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useFetching } from '../../hooks/use-fetch';
import { RecordsEntity } from '../../interfaces/records-entity';
import { RecordsService } from '../../services/records-service';
import Comment from '../comment/comment';
import Post from '../post/record';
import Sidebar from '../sidebar/sidebar';
import Widgets from '../widgets/widgets';

function RecordPage() {
    const { recordId = '' } = useParams<string>();
    const [record, setRecord] = useState<RecordsEntity>();
    const [recordComments, setRecordComments] = useState<RecordsEntity[]>([]);
    const [fetchRecord, isRecordLoading] = useFetching(async () => {
        const record = await RecordsService.getRecordById(recordId);
        const recordComments = await RecordsService.getRecordComments(recordId);

        setRecord(record);
        setRecordComments(recordComments);
    });
    const navigate = useNavigate();

    function navigateBack() {
        navigate(-1);
    }

    useEffect(() => {
        fetchRecord();
    }, [recordId]);

    return (
        <div className="RecordPage">
            <Sidebar activeElement="RecordPage" />
            <div className="RecordPage__container">
                <div className="RecordPage__header">
                    <ArrowBackIcon className="RecordPage__back-button" onClick={navigateBack} />
                    <h1 className="RecordPage__title">Tweet</h1>
                </div>
                {record ? <Post isClickable={false} record={record} /> : ''}
                <div className="RecordPage__comments-container">
                    <div className="RecordPage__comments-header">
                        <span className="RecordPage__comments-title">Comments:</span>
                    </div>
                    {recordComments.map(
                        (comment: RecordsEntity): JSX.Element => (
                            <Comment record={comment} key={comment.id} />
                        ),
                    )}
                </div>
            </div>
            <Widgets />
        </div>
    );
}

export default RecordPage;
