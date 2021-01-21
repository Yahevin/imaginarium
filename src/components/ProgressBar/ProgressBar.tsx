import React from 'react';
import { LEVEL_COST } from '@my-app/constants/parts/LEVEL_COST';
import { Bar, Digit, Progress } from '@/components/ProgressBar/ProgressBar.styles';
import { TProgressBar } from '@/components/ProgressBar/ProgressBar.model';

export const ProgressBar: React.FC<TProgressBar> = ({ score, base = LEVEL_COST }) => {
  return (
    <Bar>
      <Progress width={score} />
      <Digit>
        {score} / {base}
      </Digit>
    </Bar>
  );
};
