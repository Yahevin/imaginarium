import styled from 'styled-components';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';

export const AuthTitle = styled.h4`
  display: block;
  margin: 0 auto;
`;
export const ListedBtn = styled(Button)`
  margin: 24px auto 0 auto;
`;
export const ListedInput = styled(Input)`
  margin: 16px auto 0 auto;
`;

export const AuthBox = styled.form`
  display: flex;
  padding: 10px 80px;
  flex-direction: column;
  align-items: center;

  & > ${AuthTitle} + ${ListedInput} {
    margin: 36px 0 0 0;
  }
  & > ${ListedInput} + ${ListedInput} {
    margin: 20px 0 0 0;
  }
  & > ${ListedInput} + ${ListedBtn} {
    margin: 32px 0 0 0;
  }
`;

export const AuthMessage = styled.div`
  margin: 16px auto 0 auto;
`;
// TODO add typography
