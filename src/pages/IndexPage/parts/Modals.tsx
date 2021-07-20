import React from 'react';
import { useSelector } from 'react-redux';
import { TStore } from '@/store/reducer';
import { ChatWindow } from './ChatWindow/ChatWindow';

export const Modals = () => {
  const room_id = useSelector((store: TStore) => store.partyReducer.room_id);

  return room_id ? <ChatWindow /> : null;
};
