import styled, { css } from 'styled-components';

export const FlexRow = css`
  display: flex;
  flex-direction: row;
`;

export const FlexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const FlexRowBox = styled.div`
  ${FlexRow};
`;
