import { DB_user } from '@imaginarium/packages/interfaces';

export type TAuthentication = (props: {
  nick_name: string;
  password: string;
}) => Pick<DB_user, 'id' | 'experience'> & { token: string };
