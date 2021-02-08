import styled from 'styled-components';
import { InputRef } from '@/components/Input/Input';
import { ButtonRef } from '@/components/Button/Button';

export const QuestWrap = styled.div`
  display: flex;

  ${InputRef} + ${ButtonRef} {
    margin-left: 16px;
  }
`;
