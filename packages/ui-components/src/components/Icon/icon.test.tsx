import { render } from '@testing-library/react';
import { Icon } from './';
import { paths } from './paths';

describe('Icon', () => {
  Object.keys(paths).forEach((iconName) => {
    it(`should render ${iconName} icon successfully.`, () => {
      const { baseElement } = render(
        <Icon
          name={iconName}
          width={24}
          height={24}
          color="text-neutral-placeholder"
        />
      );
      expect(baseElement).toMatchSnapshot();
    });
  });
});
