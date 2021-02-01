import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { TModal } from '@/components/Modal/Modal.model';
import { FixedContainer, ModalContent, ModalWrap } from '@/components/Modal/Modal.styles';

export const Modal: React.FC<TModal> = ({ isOpen, close, children, customRoot }) => {
  const container = useRef(document.createElement('div'));
  const root = useRef(customRoot || document.body);

  const removeSteps = () => {
    root.current.removeChild(container.current);
    document.body.style.setProperty('overflow-y', 'auto');
  };

  useEffect(() => {
    if (!root.current) return;
    if (isOpen) {
      root.current.appendChild(container.current);
      document.body.style.setProperty('overflow-y', 'hidden');
    }
    if (!isOpen && document.body.contains(container.current)) {
      removeSteps();
    }
  }, [isOpen]);

  useEffect(() => removeSteps, []);

  const overlayHandle = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  return isOpen
    ? createPortal(
        <FixedContainer onClick={close}>
          <ModalWrap>
            <ModalContent onClick={overlayHandle}>{children}</ModalContent>
          </ModalWrap>
        </FixedContainer>,
        container.current,
      )
    : null;
};
