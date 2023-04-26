import React from 'react';
import { render } from '@testing-library/react';
import { SelectBox } from './selectBox';

describe('SelectBox', () => {
  Object.entries({}).forEach(([type, props]) => {
    it(`should render ${type} successfully`, () => {
      const { baseElement } = render(
        <SelectBox
          options={[]}
          onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          }}
          label={''}
          variant={'verticle-label'}
          size={'small'}
        />
      );
      expect(baseElement).toMatchSnapshot();
    });
  });
});
