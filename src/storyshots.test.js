import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

// initStoryshots({ /* configuration options */ });
initStoryshots({ suite: 'Puppeteer storyshots', test: imageSnapshot() });
