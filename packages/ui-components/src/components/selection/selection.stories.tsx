import type { Meta } from '@storybook/react';
import { selectionData, selectionDataWithIcon } from './mock';
import { Selection as SelectionComponent } from './selection';

const Story: Meta<typeof SelectionComponent> = {
  title: 'Components / Selection',
  component: SelectionComponent,
};
export default Story;

export const SingleSelection = () => (
  <SelectionComponent
    placeholder="Select..."
    data={selectionData}
  />
)
export const SingleSelectionDisalbe = () => (
  <SelectionComponent
    placeholder="Select..."
    data={selectionData}
    disable={true}
  />
)

export const SingleSelectionWithIcon = () => (
  <SelectionComponent
    placeholder="Select..."
    data={selectionDataWithIcon}
  />
)
