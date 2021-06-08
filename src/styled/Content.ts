import styled, { css } from 'styled-components';
import { MEDIA_QUERY } from '@imaginarium/packages/constants';

export const ContentSize = css`
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
`;

export const ContentPadding = css`
  padding: 60px 40px;
  ${MEDIA_QUERY.PHONE} {
    padding: 20px 10px;
  }
`;

export const ContentSizeBox = styled.div`
  ${ContentSize};
`;
