import styled, { css } from 'styled-components';
import { COLOR } from '@my-app/constants';
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
`;
export const Progress = styled.div<{ width: number }>`
  ${Absolute};
  width: calc(${(props) => props.width}% + 8px);
  height: 100%;
  border-radius: 8px;
  background: ${COLOR.active};
`;
export const Digit = styled.span`
  ${Absolute};
  ${Font_small};
  color: ${COLOR.white};
  margin: 0 0 0 8px;
`;
