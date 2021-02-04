import styled from 'styled-components';
import { COLOR } from '@my-app/constants';

export const Grid = styled.div`
  margin: 0 auto;
  height: auto;
  width: 80vw;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;
  justify-items: center;
`;

export const Grid__Item = styled.div<{ isActive: boolean }>`
  width: 100%;
  position: relative;
  padding-top: calc(100% / 9 * 16);
  box-shadow: ${(props) => (props.isActive ? '0 0 6px 4px gold' : 'none')};
  border-radius: 10px;
`;

export const Grid__Img = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  background: ${COLOR.passive};
`;
