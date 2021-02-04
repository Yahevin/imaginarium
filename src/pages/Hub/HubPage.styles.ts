import styled from 'styled-components';
import { COLOR } from '@my-app/constants';
import { FlexRow } from '@/styled/Flex';
import { Menu__item } from '@/styled/Menu';
import { InputRef } from '@/components/Input/Input';
import { ButtonRef } from '@/components/Button/Button';

export const HubHeader = styled.header`
  background-color: ${COLOR.dark_bg};
`;

export const HubContent = styled.div`
  background: ${COLOR.white};
`;

export const JoinPanel = styled(Menu__item)`
  ${FlexRow};

  ${InputRef} + ${ButtonRef} {
    margin-left: 16px;
  }
`;
