import styled from 'styled-components';
import { COLOR } from '@imaginarium/packages/constants';

export const FixedWrapper = styled.div`
  width: 0;
  height: 0;
  position: fixed;
  left: 100px;
  top: 500px;
  z-index: 10;
`;

export const AbsoluteContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 30px;
  background: ${COLOR.light_blue};
`;

export const Window = styled.div`
  width: 100%;
  position: absolute;
  bottom: 30px;
  left: 0;
`;

export const Draggable = styled.div`
  height: 30px;
  width: 30px;
  position: absolute;
  right: -30px;
  top: 0;
  background: rebeccapurple;
`;

export const MessagesScroll = styled.div`
  height: 400px;
  overflow-y: scroll;
`;

export const MessagesField = styled.div`
  display: grid;
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
