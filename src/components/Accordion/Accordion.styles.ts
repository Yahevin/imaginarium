import styled from 'styled-components';
import { animated } from 'react-spring';

const Wrap = styled.div`
  overflow: hidden;
  height: auto;
  position: relative;
`;

export const Group = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const AnimatedWrap = animated(Wrap);
