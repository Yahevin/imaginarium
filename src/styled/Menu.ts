import styled from 'styled-components';
import { MEDIA_QUERY } from '@my-app/constants';

export const Menu = styled.article`
  max-width: 1300px;
  padding: 40px 60px;

  ${MEDIA_QUERY.PHONE} {
    padding: 24px 16px;
  }
`;

export const Menu__item = styled.section`
  & + & {
    margin: 24px 0 0 0;
  }
`;
