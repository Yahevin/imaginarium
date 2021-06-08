import styled, { css } from 'styled-components';
import { COLOR } from '@imaginarium/packages/constants';
import Font_small from '@/styled/Font_small';

export const Absolute = css`
  position: absolute;
  left: 0;
  top: 0;
`;
export const Bar = styled.div`
  height: 16px;
  width: 100%;
  background: ${COLOR.passive};
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;
const ProgressBar = css`
  ${Absolute};
  height: 100%;
  max-width: 110%;
  border-radius: 8px;
  left: -10%;
`;
export const Progress = styled.div<{ width?: string }>`
  ${ProgressBar};
  width: ${(props) => (props.width ? props.width : `auto`)};
  z-index: 2;
  background: ${COLOR.active};
`;
export const ProgressNew = styled.div`
  ${ProgressBar};
  z-index: 1;
  background: ${COLOR.rust};
`;
export const Digit = styled.span`
  ${Absolute};
  ${Font_small};
  z-index: 5;
  color: ${COLOR.white};
  margin: 0 0 0 8px;
`;
