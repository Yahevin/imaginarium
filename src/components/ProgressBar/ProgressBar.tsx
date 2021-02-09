/* eslint-disable no-magic-numbers */
import React from 'react';
import { Bar, Digit, Progress, ProgressNew } from '@/components/ProgressBar/ProgressBar.styles';
import { TProgressBar } from '@/components/ProgressBar/ProgressBar.model';
import { GAME_MAX_SCORE } from '@my-app/constants';
import { animated, useSpring } from 'react-spring';

export const AnimatedProgress = animated(ProgressNew);

export const ProgressBar: React.FC<TProgressBar> = ({ score, diff = 0, base = GAME_MAX_SCORE }) => {
  const progress = useSpring({
    val: (score * 100) / base + 10,
    from: {
      val: ((score - diff) * 100) / base + 10,
    },
    config: {
      mass: 3,
      tension: 200,
      friction: 25,
      precision: 1,
    },
  });

  return (
    <Bar>
      <Progress width={`${((score - diff) / base) * 100 + 10}%`} />
      {diff > 0 && <AnimatedProgress style={{ width: progress.val.interpolate((width) => `${width}%`) }} />}
      <Digit>{`${score} / ${base} ${diff > 0 ? `+${diff}` : ''}`}</Digit>
    </Bar>
  );
};
