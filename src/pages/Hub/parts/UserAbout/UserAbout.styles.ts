import styled from 'styled-components';
import { COLOR } from '@imaginarium/packages/constants';
import Font_large from '@/styled/Font_large';
import { Button } from '@/components/Button/Button';

export const Wrap = styled.div`
  margin: 0 auto;
  display: flex;
  color: ${COLOR.slate};
`;
export const UserInfo = styled.div`
  margin: 6px 0 0 16px;
  flex: 1 1 auto;
  align-self: flex-end;

  & > p {
    ${Font_large};
    margin: 0 0 14px 0;
  }
`;
export const LogOut = styled(Button)`
  margin: 8px 0 0 auto;
`;
