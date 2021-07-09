import styled from 'styled-components';
import { T_COLOR } from '@imaginarium/packages/constants';

export const Flat = styled.div<{ bg?: T_COLOR }>`
  position: relative;
  z-index: 1;
  background: ${(props) => props.bg ?? 'none'};
`;
