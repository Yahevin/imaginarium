import React, { useCallback, useRef } from 'react';
import {
  FckngGrid,
  FckngGrid__BG,
  TriangleGrid,
  TriangleGrid__Item,
} from '@/components/FckngTriangles/FckngTriangles.styles';
import { isEven } from '@/helpers/isEven';
import styled from 'styled-components';
import { getColor } from '@/components/FckngTriangles/utils/getColor';
import { TGridMap } from '@/components/FckngTriangles/types/TGridMap';
import { patternOne } from '@/components/FckngTriangles/utils/patternOne';
import { patternZero } from '@/components/FckngTriangles/utils/patternZero';
import { InferResultType } from '@my-app/types';
import { removePattern } from '@/components/FckngTriangles/utils/removePattern';
import { bg_mount } from '@/img';
import { TCoordinates } from '@/components/FckngTriangles/types/TCoordinates';

const APPEAR_DURATION = 1500;
const COLUMNS_COUNT = 30;
const GRADIENT_SHIFT = 90;
const DARK_RED_SHIFT = -60;

export const FckngTriangles = () => {
  const vault = useRef<TGridMap>(new Map());
  const prevAnimated = useRef<InferResultType<typeof patternOne>>({ patternA: [], patternB: [] });

  const vWidth = window.innerWidth;
  const vHeight = window.innerHeight;
  const columnWidth = Math.floor((vWidth / (COLUMNS_COUNT - 2)) * 2);
  let rowCount = Math.floor(vHeight / (columnWidth * 0.85));
  rowCount = isEven(rowCount) ? rowCount + 1 : rowCount;
  const rowHeight = Math.floor(vHeight / rowCount);

  const gridRef = (node: HTMLDivElement) => {
    if (node === null) return;

    setTimeout(() => {
      node.classList.add('visible', 'appearing');
    }, 0);
    setTimeout(() => {
      node.classList.remove('appearing');
      node.classList.add('appeared');
    }, APPEAR_DURATION);
  };

  const mouseOverHandler = ({ row, col }: TCoordinates) => {
    return () => {
      removePattern([...prevAnimated.current.patternA, ...prevAnimated.current.patternB]);

      if (isEven(col) ? !isEven(row) : isEven(row)) {
        prevAnimated.current = patternOne({ vault: vault.current, row, col });
      } else {
        prevAnimated.current = patternZero({ vault: vault.current, row, col });
      }
    };
  };

  const TrianglesArray = useCallback(() => {
    const trianglesArray = [];
    const BaseItem = (props: {
      className?: string;
      onMouseCallback?: (event: React.SyntheticEvent) => void;
      refCallback?: (node: HTMLDivElement) => void;
    }) => (
      <TriangleGrid__Item
        rowHeight={rowHeight}
        columnWidth={columnWidth}
        repeat={rowCount}
        onMouseOver={props.onMouseCallback}
        className={props.className}
        ref={props.refCallback}
      />
    );

    for (let col = 0; col < COLUMNS_COUNT; col++) {
      for (let row = 0; row < rowCount; row++) {
        const key = `${row}-${col}`;
        const Item = (props: { className?: string }) => {
          return (
            <BaseItem
              key={key}
              onMouseCallback={mouseOverHandler({ row, col })}
              refCallback={(node: HTMLDivElement) => {
                if (node !== null) {
                  vault.current.set(key, node);
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

        trianglesArray.push(<Styled key={key} />);
      }
    }

    return trianglesArray;
  }, [columnWidth, rowCount, rowHeight]);

  return (
    <FckngGrid>
      <TriangleGrid ref={gridRef} columnWidth={columnWidth} rowCount={rowCount}>
        {TrianglesArray()}
      </TriangleGrid>
      <FckngGrid__BG src={bg_mount} alt="background image" />
    </FckngGrid>
  );
};
