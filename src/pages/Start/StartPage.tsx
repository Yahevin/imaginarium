import React, { useState } from 'react';
import { Modal } from '@/components/Modal/Modal';
import Auth from '@/pages/Start/Auth/Auth';
import { ENTER_WINDOW, TEnterWindow } from '@/pages/Start/constants/EnterWindow';
import { BallFall } from '@/pages/Start/BallFall/BallFall';
import { LeftSide, RightSide, SideTitle } from '@/pages/Start/StartPage.styles';

export const StartPage = () => {
  const [action, setAction] = useState(null as TEnterWindow);
  const [modelOpen, setModalOpen] = useState(false);

  const openAuth = () => {
    setModalOpen(true);
    setAction(ENTER_WINDOW.AUTHENTICATE);
  };

  const openReg = () => {
    setModalOpen(true);
    setAction(ENTER_WINDOW.REGISTRATION);
  };

  return (
    <>
      <Modal
        isOpen={modelOpen}
        close={() => {
          setModalOpen(false);
        }}
      >
        <Auth action={action} setAction={setAction} />
      </Modal>

      <LeftSide onClick={openAuth}>
        <SideTitle>{ENTER_WINDOW.AUTHENTICATE}</SideTitle>
      </LeftSide>
      <RightSide onClick={openReg}>
        <SideTitle>{ENTER_WINDOW.REGISTRATION}</SideTitle>
      </RightSide>

      <BallFall />
    </>
  );
};
