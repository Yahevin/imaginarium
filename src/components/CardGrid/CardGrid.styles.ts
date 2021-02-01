import styled from 'styled-components';
import { COLOR } from '@my-app/constants';

export const Grid = styled.div`
  margin: 0 auto;
  height: auto;
  width: 80vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;
  justify-items: center;

  & > img {
    display: block;
    height: calc((80vw / 3 - 40px / 3) * 16 / 9);
    width: 100%;
    object-fit: contain;
    background: ${COLOR.passive};
    border-radius: 10px;
    &.active {
      box-shadow: 1px 1px 1px gold;
    }
    &:nth-child(3n + 1) {
      justify-self: end;
    }
    &:nth-child(3n + 3) {
      justify-self: start;
    }
  }
`;
