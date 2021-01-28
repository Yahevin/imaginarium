import styled from 'styled-components';
import { COLOR, MEDIA_QUERY } from '@my-app/constants';

export const FixedContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  overflow-y: auto;
`;

export const ModalWrap = styled.div`
  height: auto;
  padding: 20vh 0 10vh 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  ${MEDIA_QUERY.PHONE} {
    padding: 20px 10px;
  }
`;

export const ModalContent = styled.section`
  width: 600px;
  padding: 20px 20px 40px 20px;
  border-radius: 10px;
  background: ${COLOR.light_bg};
  box-shadow: 0 0 2px 4px ${COLOR.dark_bg};

  ${MEDIA_QUERY.PHONE} {
    width: 100%;
    padding: 10px 10px 20px 10px;
  }
`;
