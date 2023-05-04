import type { Meta } from '@storybook/react';
import { Segment as SegmentComponent,  } from './index';

const Story: Meta<typeof SegmentComponent> = {
  title: 'Components / Segment',
  component: SegmentComponent,
};
export default Story;
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


export const SegmentDefault = () => (
  <SegmentComponent
  tabs={data.tabs}
  activeTab={data.activeTab}
  onChange={() => console.log('change tab')}
   key={1}
  />
);

export const SegmentActive = () => (
  <SegmentComponent
  tabs={data.tabs}
  activeTab='published'
  onChange={() => console.log('change tab')}
   key={1}
  />
);
