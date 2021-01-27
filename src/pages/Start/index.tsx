import React from 'react';
import { BUTTON_THEME, PAGES } from '@my-app/constants';
import { Button } from '@/components/Button/Button';
import { Link } from 'react-router-dom';

function StartPage() {
  return (
    <Link to={PAGES.AUTH}>
      <Button theme={BUTTON_THEME.GREEN} width="auto">
        Start
      </Button>
    </Link>
  );
}

export default StartPage;
