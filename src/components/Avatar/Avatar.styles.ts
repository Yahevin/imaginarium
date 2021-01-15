import styled, { css } from 'styled-components';
import { COLOR } from '@my-app/constants';

export const Box = styled.div`
  flex: 1 1 80px;
  height: auto;
  max-width: 100px;
  min-width: 60px;
`;
export const SubBox = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 100%;
  position: relative;
`;
export const Round = css`
  position: absolute;
  top: 0;
  text-transform: uppercase;
  text-align: center;
  border-radius: 50%;
`;
export const Face = styled.div<{ fontRate: number }>`
  ${Round};
  width: 100%;
  height: 100%;
  left: 0;
  line-height: ${(props) => 1 / props.fontRate};
  background: ${COLOR.white};
`;
export const Level = styled.div`
  ${Round};
  width: 24px;
  height: 24px;
  position: absolute;
  right: 0;
  font-size: 12px;
  line-height: 24px;
  background: ${COLOR.active};
`;
