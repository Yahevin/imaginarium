import styled from 'styled-components';
import { TColorScheme } from '@imaginarium/packages/interfaces';

export const StyledInput = styled.input<{ width: 'auto' | '100%'; colorScheme: TColorScheme; disabled: boolean }>`
  width: ${(props) => props.width};
  min-width: 100px;
  max-width: 400px;
  padding: 6px 10px;
  border-radius: 10px;
  box-sizing: border-box;
  color: ${(props) => props.colorScheme.font};
  background-color: ${(props) => props.colorScheme.bg};
  border: 2px solid ${(props) => props.colorScheme.border};
`;
