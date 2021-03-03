import styled from 'styled-components';
import { MEDIA_QUERY, T_COLOR } from '@my-app/constants';
import { ContentSize } from '@/styled/Content';

export const Menu = styled.div<{ bg?: T_COLOR }>`
  ${ContentSize};
  position: relative;
  z-index: 1;
  padding: 40px 60px;
  background: ${(props) => props.bg ?? 'none'};

  ${MEDIA_QUERY.PHONE} {
    padding: 24px 16px;
  }
`;

export const Menu__item = styled.div`
  & + & {
    margin: 24px 0 0 0;
  }
`;
