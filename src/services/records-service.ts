import axios, { AxiosRequestConfig } from 'axios';

import { baseUrl } from '../constants/base-url';
import { RecordsEntity } from '../interfaces/records-entity';

import { LocalStorageService } from './local-storage-service';

export class RecordsService {
    public static async getRecordById(recordId: string): Promise<RecordsEntity> {
        const requestUrl = baseUrl + '/records/' + recordId;
        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: requestUrl,
            headers: {
                Authorization: 'Bearer ' + LocalStorageService.getAccessToken(),
            },
        };
        const response = await axios(requestConfig);
        const record: RecordsEntity = response.data;

        return record;
    }

    public static async getRecordComments(recordId: string): Promise<RecordsEntity[]> {
        const requestUrl = baseUrl + '/comments/upper-lever/record/' + recordId;
        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: requestUrl,
            headers: {
                Authorization: 'Bearer ' + LocalStorageService.getAccessToken(),
            },
        };
        const response = await axios(requestConfig);
        const recordComments: RecordsEntity[] = response.data;

        return recordComments;
    }
}
