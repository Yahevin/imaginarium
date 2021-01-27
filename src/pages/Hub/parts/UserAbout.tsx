import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@/components/Button/Button';
import { Avatar } from '@/components/Avatar/Avatar';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';

import { COLOR, PAGES } from '@my-app/constants';
import { UserAction } from '@/store/user/action';
import { TStore } from '@/store/reducer';
import Font_large from '@/styled/Font_large';
import { LEVEL_COST } from '@my-app/constants/parts/LEVEL_COST';

const Wrap = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 1300px;
  padding: 30px 60px;
  color: ${COLOR.slate};
`;
const UserInfo = styled.div`
  margin: 6px 0 0 16px;
  flex: 1 1 auto;
  align-self: flex-end;

  & > p {
    ${Font_large};
    margin: 0 0 14px 0;
  }
`;
const LogOut = styled(Button)`
  margin: 8px 0 0 auto;
`;

function UserAbout() {
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
}

export default UserAbout;
