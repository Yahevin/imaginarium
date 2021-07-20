import React, { useState } from 'react';
import { useSpring } from 'react-spring';

import { AnimatedWrap, Group } from './Accordion.styles';
import { Props } from './Accordion.model';

export const Accordion: React.FC<Props> = ({ isOpen, children, config }) => {
  const [height, setHeight] = useState<'auto' | number>('auto');
  const wrap = useSpring({
    config: {
      mass: config?.mass || 1,
      tension: config?.tension || 150,
      friction: config?.friction || 25,
      precision: config?.precision || 1,
    },
    height: isOpen ? height : 0,
  });

  const groupRef = (node: HTMLDivElement) => {
    if (node === null) return;

    setHeight(node.offsetHeight);
  };

  return (
    <AnimatedWrap style={wrap}>
      <Group ref={groupRef}>{children}</Group>
    </AnimatedWrap>
  );
};
