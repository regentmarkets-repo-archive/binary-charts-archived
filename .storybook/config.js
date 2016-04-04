import { configure } from '@kadira/storybook';

function loadStories() {
  require('./simple');
  // require as many as stories you need.
}

configure(loadStories, module);
