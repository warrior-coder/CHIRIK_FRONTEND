import { AxiosError } from 'axios';
import { useState } from 'react';

import { useNavigateToAuth } from './use-navigate-to-auth';

export function useFetching(callback: any): [() => Promise<void>, boolean, string] {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigateToAuth = useNavigateToAuth();

    async function fetching() {
        try {
            setIsLoading(true);
            await callback();
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status == 401) {
                    navigateToAuth();
                } else {
                    const responseErrorMessage: string = error.response?.data.message;

                    setErrorMessage(responseErrorMessage.charAt(0).toUpperCase() + responseErrorMessage.slice(1) + '.');
                }
            }
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, errorMessage];
}
