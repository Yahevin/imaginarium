import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";


import Avatar from "@/components/Avatar";
import ThinButton from "@/components/ThinButton";
import ProgressBar from "@/components/ProgressBar";

import {UserAction} from "@/store/user/action";
import {PageAction} from "@/store/page/action";
import PAGES from "@/constants/Pages";
import COLOR from "@/constants/Color";
import {TStore} from "@/store/reducer";
import Font_large from "@/styled/Font_large";


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
const LogOut = styled(ThinButton)`
  margin: 8px 0 0 auto;
`;

function UserAbout() {
    const dispatch = useDispatch();

    const nick_name = useSelector((state:TStore) => state.userReducer.nick_name);
    const experience = useSelector((state:TStore) => state.userReducer.experience);

    const logOut = useCallback(() => {
        dispatch(UserAction.setUserId(null));
        dispatch(PageAction.set(PAGES.START));
    },[]);

    return (
        <Wrap>
            <Avatar nick_name={nick_name} experience={experience}/>
            <UserInfo>
                <p>
                    {nick_name}
                </p>
                <ProgressBar experience={experience}/>

                <LogOut callback={logOut}>
                    Выйти
                </LogOut>
            </UserInfo>
        </Wrap>
    )
}

export default UserAbout;