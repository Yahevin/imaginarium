import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Avatar } from '@/components/Avatar/Avatar';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';

import { PAGES } from '@my-app/constants';
import { UserAction } from '@/store/user/action';
import { TStore } from '@/store/reducer';
import { LEVEL_COST } from '@my-app/constants/parts/LEVEL_COST';
import { LogOut, UserInfo, Wrap } from './UserAbout.styles';

export const UserAbout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useSelector((state: TStore) => state.userReducer.user_id);
  const nick_name = useSelector((state: TStore) => state.userReducer.nick_name);
  const experience = useSelector((state: TStore) => state.userReducer.experience);

  const score = (experience ?? 0) % LEVEL_COST;

  const logOut = useCallback(() => {
    dispatch(UserAction.setUserId(null));
    history.push(PAGES.START);
  }, [dispatch, history]);

  if (id && nick_name && experience) {
    return (
      <Wrap>
        <Avatar id={id} nick_name={nick_name} experience={experience} />
        <UserInfo>
          <p>{nick_name}</p>
          <ProgressBar score={score} />

          <LogOut callback={logOut}>Выйти</LogOut>
        </UserInfo>
      </Wrap>
    );
  }

  return <div>Undefined user</div>;
};
