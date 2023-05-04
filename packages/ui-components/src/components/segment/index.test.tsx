import React from 'react';
import { render } from '@testing-library/react';

import { Segment } from './index';

const data = {
  tabs: [
    {
      id:"all",
      label: 'All',
      total: 12
    },
    {
      id:"published",
      label: 'Published',
      total: 9
    },
    {
      id:"draft",
      label: 'Draft',
      total: 3
    },
  ],
  activeTab: 'all'
}
describe('Segment', () => {

  it(`should render segment successfully`, () => {

    const { baseElement } = render(
      <Segment tabs={data.tabs} activeTab={data.activeTab} onChange={() => {console.log('changed tab')}} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
