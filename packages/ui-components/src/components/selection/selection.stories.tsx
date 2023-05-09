import type { Meta } from '@storybook/react';
import * as React from 'react';
import { RadioButton as RadioButtonComponent } from './radio';
import { Switch as SwitchComponent } from './switch';
import { Tag as TagComponent } from './tag';

const Story: Meta<typeof RadioButtonComponent> = {
  title: 'Components / Selection',
  component: RadioButtonComponent,
};
export default Story;

export const RadioButton = () => {
  const [selectedValue, setSelectedValue] = React.useState('option1');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div>
      <RadioButtonComponent
        labelclassname="text-black ml-1"
        value={'option1'}
        name={'button'}
        text={'Choose Option 1'}
        checked={selectedValue === 'option1'}
        onChange={handleChange}
      />
      <RadioButtonComponent
        labelclassname="text-black ml-1"
        value={'option2'}
        name={'button'}
        text={'Choose Option 2'}
        checked={selectedValue === 'option2'}
        onChange={handleChange}
      />
    </div>
  );
};
export const Switch = () => <SwitchComponent checked={true} />;

export const Tag = () => (
  <div className="flex space-x-1">
    <TagComponent status="published" text="Published" className="text-12" />
    <TagComponent status="draft" text="Draft" className="text-12" />
  </div>
);
