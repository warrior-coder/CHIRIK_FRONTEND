import './record.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useNavigateTo } from '../../hooks/use-navigate-to';
import { RecordsEntity } from '../../interfaces/records-entity';

import RecordBody from './record-body/record-body';
import RecordFooter from './record-footer/record-footer';
import RecordHeader from './record-header/record-header';

interface RecordProps {
    record: RecordsEntity;
    isClickable?: boolean;
}

function Record({ isClickable = true, record }: RecordProps): JSX.Element {
    const navigate = useNavigate();

    function navigateToRecordId() {
        navigate('/record/' + record.id);
    }

    function RecordOnClick() {
        if (isClickable) {
            navigateToRecordId();
        }
    }

    return (
        <div className={isClickable ? 'Record Record_hoverable' : 'Record'} onClick={RecordOnClick}>
            <RecordHeader record={record} />
            <RecordBody record={record} />
            <RecordFooter record={record} />
        </div>
    );
}

export default Record;
