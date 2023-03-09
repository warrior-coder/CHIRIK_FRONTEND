import { RecordsEntity } from './records-entity';

export interface RecordImagesEntity {
    id: string;
    name: string;
    record?: RecordsEntity;
}
