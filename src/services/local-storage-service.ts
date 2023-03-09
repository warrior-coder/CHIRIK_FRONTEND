import { UsersEntity } from '../interfaces/users-entity';

export class LocalStorageService {
    public static getAccessToken(): string {
        const accessToken: string | null = localStorage.getItem('accessToken');

        if (!accessToken) {
            throw new Error('access token user not found');
        }

        return accessToken;
    }

    public static getRefreshToken(): string {
        const refreshToken: string | null = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            throw new Error('refresh token user not found');
        }

        return refreshToken;
    }

    public static setAccessToken(accessToken: string): void {
        localStorage.setItem('accessToken', accessToken);
    }

    public static setRefreshToken(refreshToken: string): void {
        localStorage.setItem('refreshToken', refreshToken);
    }

    public static setCurrentUser(currentUser: UsersEntity): void {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    public static getCurrentUser(): UsersEntity | null {
        const currentUserString: string | null = localStorage.getItem('currentUser');

        if (!currentUserString) {
            return null;
        }

        return JSON.parse(currentUserString);
    }

    public static removeCurrentUser(): void {
        localStorage.removeItem('currentUser');
    }

    public static removeAccessToken(): void {
        localStorage.removeItem('accessToken');
    }

    public static removeRefreshToken(): void {
        localStorage.removeItem('refreshToken');
    }
}
