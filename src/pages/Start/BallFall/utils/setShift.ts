/* eslint-disable no-magic-numbers */
/* eslint-disable no-restricted-properties */
import { CANVAS_CONFIG as config } from '@/pages/Start/BallFall/constants/CONFIG';

type typeGeneric<E> = (el: E, mousePose: E & { disabled: boolean }) => E;
type type = typeGeneric<{ x: number; y: number }>;

export const setShift: type = (el, mousePos) => {
  if (mousePos.disabled) {
    return el;
  }

  const dotRange = Math.pow(Math.pow(mousePos.x - el.x, 2) + Math.pow(mousePos.y - el.y, 2), 0.5);

  if (config.range >= dotRange) {
    return {
      x: el.x - (mousePos.x - el.x) / ((config.shiftSpeed * config.fps) / 60),
      y: el.y - (mousePos.y - el.y) / ((config.shiftSpeed * config.fps) / 60),
    };
  }
  return el;
};
