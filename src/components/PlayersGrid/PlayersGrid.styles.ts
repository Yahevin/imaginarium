import styled from 'styled-components';
import Font_small from '@/styled/Font_small';
import { COLOR } from '@my-app/constants';
import { PlayerAbout } from '@/components/PlayerAbout/PlayerAbout';

export const Player = styled(PlayerAbout)``;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-auto-rows: 1fr;
  grid-auto-flow: row;
  grid-gap: 40px 10px;
`;
export const Grid__item = styled.div`
  & > ${Player} {
    max-width: 80px;
    margin: 0 auto;
  }
  & > h5 {
    margin: 12px 0 0 0;
    ${Font_small};
    color: ${COLOR.slate};
    text-align: center;
  }
`;
