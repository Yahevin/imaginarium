import { useEffect, useRef } from 'react';
import SocketAction from '@/web-socket/action';
import { PartyAction } from '@/store/party/action';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const useLeave = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const prevLocation = useRef('');

  useEffect(() => {
    history.listen(({ pathname }) => {
      if (prevLocation.current === '/lobby' || prevLocation.current === '/game' || prevLocation.current === '/scores') {
        if (pathname === '/' || pathname === '/main' || pathname === 'create') {
          SocketAction.leave();

          dispatch(PartyAction.leave());
        }
      }
      prevLocation.current = pathname;
    });
  }, [history, dispatch]);
};
