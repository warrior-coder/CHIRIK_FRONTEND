import './record-body.css';
import React from 'react';

import { baseUrl } from '../../../constants/base-url';
import { RecordImagesEntity } from '../../../interfaces/record-images-entity';
import { RecordsEntity } from '../../../interfaces/records-entity';

interface RecordBodyProps {
    record: RecordsEntity;
}

function RecordBody({ record }: RecordBodyProps) {
    const staticImagesPath = baseUrl + '/images';

    return (
        <div className="RecordBody">
            <p className="RecordBody__text">{record.text}</p>
            <div className="RecordBody__images-container">
                {record.images.map((recordImage: RecordImagesEntity) => (
                    <img
                        src={staticImagesPath + '/' + recordImage.name}
                        alt="record-image"
                        key={recordImage.id}
                        className="RecordBody__image"
                    />
                ))}
            </div>
        </div>
    );
}

export default RecordBody;
