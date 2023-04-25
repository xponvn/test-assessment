import React from 'react';
import { render } from '@testing-library/react';

import { CheckBox } from './checkbox';
import { RadioButton } from './radio';
import { Switch } from './switch';
import { Tag } from './tag';




describe('CheckBox', () => {
  it(`should render input successfully`, () => {
    const { baseElement } = render(
      <CheckBox checked={true} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});

describe('Radio', () => {
  it(`should render input successfully`, () => {
    const { baseElement } = render(
      <RadioButton checked={true} value={'radio'} name={'radio'} text={''} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});

describe('Switch', () => {
  it(`should render input successfully`, () => {
    const { baseElement } = render(
      <Switch checked={true} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});

describe('Tag', () => {
  it(`should render input successfully`, () => {
    const { baseElement } = render(
      <Tag status={'published'} text={'Publish'}  />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
