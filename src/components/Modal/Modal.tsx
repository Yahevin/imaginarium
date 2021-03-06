import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { TModal } from '@/components/Modal/Modal.model';
import { FixedContainer, ModalContent, ModalSpacer, ModalWrap } from '@/components/Modal/Modal.styles';

export const Modal: React.FC<TModal> = ({ isOpen, close, children, customRoot }) => {
  const container = useRef(document.createElement('div'));
  const root = useRef(customRoot || document.body);

  const removeSteps = useCallback(() => {
    if (document.body.contains(container.current)) {
      root.current.removeChild(container.current);
      document.body.style.setProperty('overflow-y', 'auto');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!root.current) return;
    if (isOpen) {
      root.current.appendChild(container.current);
      document.body.style.setProperty('overflow-y', 'hidden');
    } else {
      removeSteps();
    }

    return removeSteps;
  }, [isOpen, removeSteps]);

  const overlayHandle = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  return isOpen
    ? createPortal(
        <FixedContainer onClick={close}>
          <ModalWrap>
            <ModalSpacer />
            <ModalContent onClick={overlayHandle}>{children}</ModalContent>
            <ModalSpacer />
          </ModalWrap>
        </FixedContainer>,
        container.current,
      )
    : null;
};
