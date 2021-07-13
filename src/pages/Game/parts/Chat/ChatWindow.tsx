import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { TMessage } from '@imaginarium/packages/types';
import { TStore } from '@/store/reducer';
import { throttle } from '@/helpers/throttle';
import { Chat } from '@/web-socket/controllers';
import { Input } from '@/components/Input/Input';
import {
  AbsoluteContainer,
  FixedWrapper,
  Message,
  MessagesField,
  MessagesScroll,
  Window,
  Draggable,
} from './ChatWindow.styles';
import { scrollToNewMessage } from './utils/scrollToNewMessage';

export const ChatWindow = () => {
  const lastCoords = useRef({ x: 0, y: 0 });
  const [text, setText] = useState('');
  const [messages, update] = useState<TMessage[]>([]);
  const nick_name = useSelector((store: TStore) => store.userReducer.nick_name) as string;

  useEffect(() => {
    Chat.subscribe({ nick_name, update });
  }, [nick_name]);

  useEffect(() => {
    scrollToNewMessage();
  }, [messages]);

  const sendMessage = () => {
    Chat.sendMessage(text);
    setText('');
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
    }, 10),
    [],
  );

  return (
    <FixedWrapper>
      <AbsoluteContainer id="chat_container" onDragStart={() => false} style={{ top: 0, left: 0 }}>
        <Draggable
          onMouseDown={() => {
            document.body.style.userSelect = 'none';
            document.addEventListener('mousemove', onMouseMove);
          }}
          onMouseUp={() => {
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', onMouseMove);
          }}
        />
        <Window>
          <MessagesScroll id="messages_scroll">
            <MessagesField id="messages_field">
              <div className="spacer" />
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
          value={text}
          onChangeEvent={(event) => {
            setText(event.currentTarget.value);
          }}
          onEnterEvent={sendMessage}
        />
        <div onClick={sendMessage}>ok</div>
      </AbsoluteContainer>
    </FixedWrapper>
  );
};
