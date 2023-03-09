import { UsersEntity } from './users-entity';

export interface UserEntityWithJwtPair {
    accessToken: string;
    refreshToken: string;
    user: UsersEntity;
}
