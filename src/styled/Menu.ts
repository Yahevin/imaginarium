import styled from 'styled-components';
import { MEDIA_QUERY } from '@my-app/constants';
import { ContentSize } from '@/styled/Content';

export const Menu = styled.div`
  ${ContentSize};
  padding: 40px 60px;

  ${MEDIA_QUERY.PHONE} {
    padding: 24px 16px;
  }
`;

export const Menu__item = styled.div`
  & + & {
    margin: 24px 0 0 0;
  }
`;
