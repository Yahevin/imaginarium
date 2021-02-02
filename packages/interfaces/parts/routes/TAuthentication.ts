import { DB_user } from '@my-app/interfaces';

export type TAuthentication = Pick<DB_user, 'id' | 'experience'> & { token: string };
