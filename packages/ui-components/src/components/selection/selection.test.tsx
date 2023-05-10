import React from 'react';
import { render } from '@testing-library/react';

import { RadioButton } from './radio';
import { RadioGroup } from './radio-group';

import { Switch } from './switch';
import { Tag } from './tag';

describe('Radio', () => {
  it(`should render input successfully`, () => {
    const { baseElement } = render(
      <RadioButton checkedValue="" value={'radio'} name={'radio'} text={''} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});

describe('Radio Group', () => {
  it(`should render input successfully`, () => {
    const { baseElement } = render(
      <RadioGroup
        label="Radio Group Component"
        options={[
          { label: 'Easy', value: 'Easy' },
          { label: 'Medium', value: 'Medium' },
        ]}
        name="radio-button"
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});

describe('Switch', () => {
  it(`should render input successfully`, () => {
    const { baseElement } = render(<Switch checked={true} />);
    expect(baseElement).toMatchSnapshot();
  });
});

describe('Tag', () => {
  it(`should render input successfully`, () => {
    const { baseElement } = render(
      <Tag status={'published'} text={'Publish'} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
