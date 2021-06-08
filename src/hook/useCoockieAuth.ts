import deal from '@/helpers/deal';
import { TAuthVerify } from '@imaginarium/packages/interfaces';
import { ROUTES } from '@imaginarium/packages/constants';
import { UserAction } from '@/store/user/action';
import SocketAction from '@/web-socket/action';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const useCookieAuth = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const { hash } = window.location;
    if (hash.length === 0) return;

    (async () => {
      try {
        const { user_id, nick_name, experience } = await deal<TAuthVerify>({
          url: ROUTES.AUTH_VERIFY,
        });

        dispatch(
          UserAction.setUser({
            user_id,
            nick_name,
            experience,
          }),
        );
        SocketAction.auth(user_id);

        // TODO add join to party
        // history.replace(hash.replace(/#/, ''));
        history.replace('/main');
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
};
