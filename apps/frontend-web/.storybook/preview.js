import './tailwind-imports.css';
import { UIProvider } from '@test-assessment/ui-theme';
import themeToken from '@test-assessment/ui-theme/theme-token/frontend-web.json';
import { addDecorator } from '@storybook/react';

addDecorator((story) => (
  <UIProvider config={themeToken.variants}>{story()}</UIProvider>
));
