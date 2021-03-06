import styled from 'styled-components';
import { TColorScheme } from '@imaginarium/packages/interfaces';

export const StyledButton = styled.button<{ width: 'auto' | '100%'; colorScheme: TColorScheme; disabled: boolean }>`
  background-color: ${(props) => props.colorScheme.bg};
  color: ${(props) => props.colorScheme.font};
  width: ${(props) => props.width};
  padding: 8px 12px;
  border-radius: 10px;
  display: block;
  border: 1px solid ${(props) => props.colorScheme.border};
  transition: all 0.3s;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

// TODO add typography
