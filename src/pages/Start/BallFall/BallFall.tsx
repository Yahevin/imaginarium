/* eslint-disable no-magic-numbers */
/* eslint-disable no-restricted-properties */
import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { CanvasWrap } from '@/pages/Start/BallFall/BallFall.styles';

import { CANVAS_CONFIG as config } from '@/pages/Start/BallFall/constants/CONFIG';
import { setShift } from '@/pages/Start/BallFall/utils/setShift';
import { TBall } from '@/pages/Start/BallFall/type/TBall';
import { createBall } from '@/pages/Start/BallFall/utils/createBall';
import { setAnimFrame } from '@/pages/Start/BallFall/utils/setAnimFrame';

let balls: TBall[] = [];

export const BallFall = () => {
  const $canvas: MutableRefObject<HTMLCanvasElement | null> = useRef(null);

  const setCanvasSize = useCallback(() => {
    if (!$canvas.current) return;
    // Set Canvas to be window size
    $canvas.current.width = window.innerWidth;
    $canvas.current.height = window.innerHeight + 20;
  }, [$canvas]);

  useEffect(() => {
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [setCanvasSize]);

  useEffect(() => {
    if (!$canvas.current) return;

    let appIsActive = true;
    const canvas = $canvas.current;
    const mousePos = {
      y: 0,
      x: 0,
      disabled: true,
    };
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D & { fillStyle: string };

    const draw = (el: TBall) => {
      ctx?.save();
      ctx?.beginPath();
      ctx?.arc(el.x, el.y, el.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = el.color;
      ctx?.fill();
      ctx?.restore();
    };

    const update = () => {
      balls.forEach((el, i) => {
        const pos = setShift(el, mousePos);

        balls[i].y = pos.y + (config.speed / config.fps) * 60;
        balls[i].x = pos.x;
      });
    };

    const clear = () => {
      balls = balls.filter((el) => {
        return el.y < canvas.height;
      });
    };

    const drawBg = () => {
      ctx.fillStyle = config.bgColor;
      ctx?.fillRect(0, 0, canvas.width, canvas.height);
    };

    // That thing
    setAnimFrame();

    // Our Frame function
    (function frame() {
      if (appIsActive) {
        drawBg();

        // draw
        balls.forEach((el) => {
          draw(el);
        });

        // update
        update();

        // clear
        clear();
      }

      setTimeout(() => {
        // @ts-ignore
        window.requestAnimFrame(frame);
      }, 1000 / config.fps);
    })();

    const BallGenerator = (count: number) => {
      return Array.from(Array(count), () => createBall(canvas.width));
    };

    // check if browser tab is active
    const setAppOff = () => {
      appIsActive = false;
    };
    const setAppOn = () => {
      appIsActive = true;
    };

    window.addEventListener('focus', setAppOn);
    window.addEventListener('blur', setAppOff);

    const moveHandler = (event: MouseEvent) => {
      mousePos.x = event.clientX;
      mousePos.y = event.clientY;
      mousePos.disabled = false;
    };

    // listener
    document.body.addEventListener('mousemove', moveHandler);

    const updateFunc = setInterval(() => {
      if (appIsActive) {
        balls.push(...BallGenerator(15));
        mousePos.disabled = true;
      }
    }, 200);

    return () => {
      clearInterval(updateFunc);
      document.body.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('focus', setAppOn);
      window.removeEventListener('blur', setAppOff);
    };
  }, [$canvas]);

  return (
    <CanvasWrap>
      <canvas ref={$canvas} />
    </CanvasWrap>
  );
};
