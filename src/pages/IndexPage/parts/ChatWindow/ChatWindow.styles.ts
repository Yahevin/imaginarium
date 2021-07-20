import styled from 'styled-components';
import { COLOR } from '@imaginarium/packages/constants';
import { Button } from '@/components/Button/Button';

export const FixedWrapper = styled.div`
  width: 0;
  height: 0;
  position: fixed;
  left: 100px;
  top: 500px;
  z-index: 10;
`;

export const AbsoluteContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 300px;
  height: 30px;
  background: ${COLOR.light_blue};
`;

export const Window = styled.div`
  width: 100%;
  position: absolute;
  top: 30px;
  left: 0;
  overflow: hidden;
  background: ${COLOR.passive};
  border-radius: 0 0 10px 10px;
`;

export const MessagesScroll = styled.div`
  max-height: 200px;
  overflow-y: scroll;
`;

export const MessagesField = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-rows: auto;
  grid-gap: 12px;
  width: 100%;
  min-height: 100%;
  padding: 12px;
  background: ${COLOR.passive};
`;

export const Message = styled.div<{ self: boolean }>`
  height: auto;
  width: fit-content;
  padding: 4px;
  border-radius: 10px;
  background: ${(props) => (props.self ? COLOR.active : COLOR.red)};
  justify-self: ${(props) => (props.self ? 'flex-end' : 'flex-start')};
`;

export const Draggable = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
export const ChatButton = styled(Button)`
  margin: 0 4px;
  padding: 2px 8px;
  position: relative;
`;
