import { TBall } from '@/pages/Start/BallFall/type/TBall';
import { CANVAS_CONFIG as config } from '@/pages/Start/BallFall/constants/CONFIG';
import { setRandomColor } from '@/pages/Start/BallFall/utils/setRandomColor';

export const createBall = (canvasWidth: number): TBall => {
  const x = Math.random() * canvasWidth;
  const y = 0;
  const radius = Math.random() * config.radius;
  const color = setRandomColor();

  return { x, y, radius, color };
};
