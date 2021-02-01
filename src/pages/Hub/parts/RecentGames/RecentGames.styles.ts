import styled from 'styled-components';
import { FlexColumn } from '@/styled/Flex';
import { COLOR } from '@my-app/constants';

export const GamesList = styled.article`
  ${FlexColumn};
`;

export const GamesList__item = styled.section`
  width: 100%;
  max-width: 600px;
  padding: 16px 12px;
  background: ${COLOR.light_bg};
  border-radius: 12px;

  & + & {
    margin-top: 24px;
  }
`;

export const GameTitle = styled.h6``;

export const GameCreated = styled.div`
  & span {
  }
`;

export const PartnersList = styled.div`
  margin: 16px auto 0 0;
  display: inline-grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 8px;
`;

export const PartnersList__item = styled.div<{ isGameMaster: boolean }>`
  width: 100%;
  padding: 6px 12px;
  color: ${COLOR.white};
  background: ${COLOR.dark_bg};
  box-shadow: ${(props) => (props.isGameMaster ? `0 0 2px 2px ${COLOR.passive}` : 'none')};
  border-radius: 8px;
  text-align: center;
`;
