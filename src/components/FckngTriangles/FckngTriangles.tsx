import React, { useRef } from 'react';
import { TriangleGrid, TriangleGrid__Item } from '@/components/FckngTriangles/FckngTriangles.styles';
import { isEven } from '@/helpers/isEven';
import styled from 'styled-components';
import { getColor } from '@/components/FckngTriangles/utils/getColor';

const APPEAR_DURATION = 1500;
const COLUMNS_COUNT = 30;
const GRADIENT_SHIFT = 90;
const DARK_RED_SHIFT = -60;

type TCoordinates = {
  row: number;
  col: number;
};

type TGridItem = TCoordinates & {
  node: HTMLDivElement;
  squashed: boolean;
};

export const FckngTriangles = () => {
  const vault = useRef<Map<string, TGridItem>>(new Map());

  const gridRef = (node: HTMLDivElement) => {
    if (node === null) return;

    setTimeout(() => {
      node.classList.add('visible', 'appearing');
    }, 0);

    setTimeout(() => {
      node.classList.remove('appearing');
    }, APPEAR_DURATION);
  };

  const mouseOverHandler = (args: TCoordinates) => {
    return (event: React.SyntheticEvent) => {
      console.log(args, event);
      // if (order > 0) {
      //   patternOne(this);
      // } else {
      //   patternZero(this);
      // }
    };
  };

  const vWidth = window.innerWidth;
  const vHeight = window.innerHeight;
  const columnWidth = Math.floor((vWidth / (COLUMNS_COUNT - 2)) * 2);
  let rowCount = Math.round(vHeight / (columnWidth * 0.95));
  rowCount = isEven(rowCount) ? rowCount + 1 : rowCount;
  const rowHeight = Math.floor(vHeight / rowCount);

  const TrianglesArray = () => {
    const trianglesArray = [];
    const BaseItem = (props: {
      onMouseOver?: (event: React.SyntheticEvent) => void;
      refCallback?: (node: HTMLDivElement) => void;
    }) => <TriangleGrid__Item rowHeight={rowHeight} columnWidth={columnWidth} repeat={rowCount} {...props} />;

    for (let col = 0; col < COLUMNS_COUNT; col++) {
      for (let row = 0; row < rowCount; row++) {
        const key = `${col}-${row}`;
        const Item = (props: { className?: string }) => {
          return (
            <BaseItem
              key={key}
              onMouseOver={mouseOverHandler({ row, col })}
              refCallback={(node: HTMLDivElement) => {
                if (node !== null) {
                  vault.current.set(key, { node, row, col, squashed: false });
                }
              }}
              {...props}
            />
          );
        };

        const gradientStart = DARK_RED_SHIFT + (col / COLUMNS_COUNT) * GRADIENT_SHIFT;
        const gradientEnd = DARK_RED_SHIFT + ((col + 2) / COLUMNS_COUNT) * GRADIENT_SHIFT;

        const Styled = styled(Item)`
          transition-delay: ${(APPEAR_DURATION / COLUMNS_COUNT) * col}ms;
          background: linear-gradient(to right, ${getColor(gradientStart)}, ${getColor(gradientEnd)});
        `;

        trianglesArray.push(<Styled />);
      }
    }

    return trianglesArray;
  };

  return (
    <TriangleGrid ref={gridRef} columnWidth={columnWidth} rowCount={rowCount}>
      {TrianglesArray()}
    </TriangleGrid>
  );
};
