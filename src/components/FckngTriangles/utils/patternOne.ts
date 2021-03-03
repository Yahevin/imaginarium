import { THandlerPattern } from '@/components/FckngTriangles/types/THandlerPattern';

export const patternOne = ({ vault, row, col }: THandlerPattern) => {
  const patternA = [
    vault.get(`${row}-${col}`),
    vault.get(`${row - 1}-${col}`),
    vault.get(`${row}-${col - 1}`),
    vault.get(`${row}-${col + 1}`),
  ];

  const patternB = [
    vault.get(`${row + 1}-${col + 1}`),
    vault.get(`${row - 1}-${col + 1}`),
    vault.get(`${row + 1}-${col - 1}`),
    vault.get(`${row - 1}-${col - 1}`),
    vault.get(`${row + 1}-${col}`),
    vault.get(`${row}-${col + 2}`),
    vault.get(`${row}-${col - 2}`),
    vault.get(`${row - 1}-${col + 2}`),
    vault.get(`${row - 1}-${col - 2}`),
  ];

  patternA.forEach((item) => {
    item?.classList.add('hovered-a');
  });
  patternB.forEach((item) => {
    item?.classList.add('hovered-b');
  });

  return { patternA, patternB };
};
