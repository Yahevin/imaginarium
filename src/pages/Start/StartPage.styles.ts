import styled, { css } from 'styled-components';
import { COLOR } from '@imaginarium/packages/constants';

export const SideTitle = styled.div`
  margin: 0 0 32px 0;
  color: ${COLOR.black};
  transition: color 0.5s 0.3s ease;
  text-transform: uppercase;
  opacity: 0.6;
  font-size: 24px;
  font-weight: 700;
`;
// TODO add typography

export const PageBtn = css`
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: none;

  &:hover {
    & > ${SideTitle} {
      color: ${COLOR.green};
    }
  }
`;

export const LeftSide = styled.div`
  ${PageBtn};
  left: 0;
`;

export const RightSide = styled.div`
  ${PageBtn};
  right: 0;
`;
