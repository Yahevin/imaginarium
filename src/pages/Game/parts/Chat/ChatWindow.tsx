import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/Input/Input';
import { TMessage } from '@imaginarium/packages/types';
import { Chat } from '@/web-socket/controllers';
import { useSelector } from 'react-redux';
import { TStore } from '@/store/reducer';
import { throttle } from '@/helpers/throttle';
import {
  AbsoluteContainer,
  FixedWrapper,
  Message,
  MessagesField,
  MessagesScroll,
  Window,
  Draggable,
} from './ChatWindow.styles';

export const ChatWindow = () => {
  const lastCoords = useRef({ x: 0, y: 0 });
  const [text, setText] = useState('');
  const [messages, update] = useState<TMessage[]>([]);
  const nick_name = useSelector((store: TStore) => store.userReducer.nick_name) as string;

  useEffect(() => {
    Chat.subscribe({ nick_name, update });
  }, [nick_name]);

  useEffect(() => {
    if (messages.length === 0) return;
    const elements = document.querySelectorAll('#messages_field [data-id="message"]') as NodeListOf<HTMLDivElement>;
    if (elements.length === 0) return;
    const { offsetTop } = elements[elements.length - 1];

    document.getElementById('messages_scroll')?.scrollTo(0, offsetTop);
  }, [messages]);

  const sendMessage = () => {
    Chat.sendMessage(text);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onMouseMove = useCallback(
    throttle((event: MouseEvent) => {
      const x = event.pageX;
      const y = event.pageY;

      if (lastCoords.current.x !== 0 || lastCoords.current.y !== 0) {
        const deltaX = lastCoords.current.x - x;
        const deltaY = lastCoords.current.y - y;

        const container = document.getElementById('chat_container') as HTMLDivElement;

        const newY = container.style.top.replace('px', '');
        const newX = container.style.left.replace('px', '');

        container.style.top = `${parseInt(newY) - deltaY}px`;
        container.style.left = `${parseInt(newX) - deltaX}px`;
      }

      lastCoords.current.x = x;
      lastCoords.current.y = y;
    }, 50),
    [],
  );

  return (
    <FixedWrapper>
      <AbsoluteContainer id="chat_container" onDragStart={() => false} style={{ top: 0, left: 0 }}>
        <Draggable
          onMouseDown={() => {
            document.addEventListener('mousemove', onMouseMove);
          }}
          onMouseUp={() => {
            document.removeEventListener('mousemove', onMouseMove);
          }}
        />
        <Window>
          <MessagesScroll id="messages_scroll">
            <MessagesField id="messages_field">
              {messages.map((msg) => (
                <Message self={msg.nick_name === nick_name} key={msg.timeStamp} data-id="message">
                  {msg.message}
                </Message>
              ))}
            </MessagesField>
          </MessagesScroll>
        </Window>
        <Input
          name="chat"
          width="100%"
          onChangeEvent={(event) => {
            setText(event.currentTarget.value);
          }}
        />
        <div onClick={sendMessage}>ok</div>
      </AbsoluteContainer>
    </FixedWrapper>
  );
};
