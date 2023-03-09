import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { baseUrl } from '../constants/base-url';
import { CommentsCount } from '../interfaces/comments-count.interface';

import { LocalStorageService } from './local-storage-service';

export class CommentsService {
    public static createComment(recordId: string, text: string, imageFiles: File[]) {
        const requestUrl = baseUrl + '/comments/record/' + recordId;
        const formData = new FormData();

        formData.append('text', text);

        imageFiles.forEach((imageFile: File) => {
            formData.append('imageFiles', imageFile, imageFile.name);
        });

        const requestConfig: AxiosRequestConfig<FormData> = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: requestUrl,
            headers: {
                Authorization: 'Bearer ' + LocalStorageService.getAccessToken(),
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        };

        return axios(requestConfig);
    }

    public static async getRecordCommentsCount(recordId: string): Promise<CommentsCount> {
        const requestUrl = baseUrl + '/comments/count/record/' + recordId;
        const requestConfig: AxiosRequestConfig = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: requestUrl,
            headers: {
                Authorization: 'Bearer ' + LocalStorageService.getAccessToken(),
            },
        };
        const response = await axios(requestConfig);
        const commentsCount: CommentsCount = response.data;

        return commentsCount;
    }
}
