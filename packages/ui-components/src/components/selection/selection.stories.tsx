import type { Meta } from '@storybook/react';
import { CheckBox as CheckBoxComponent } from './checkbox';
import { RadioButton as RadioButtonComponent } from './radio';
import { Switch as SwitchComponent } from './switch';
import { Tag as TagComponent } from './tag';

const Story: Meta<typeof CheckBoxComponent> = {
  title: 'Components / Selection',
  component: CheckBoxComponent,
};
export default Story;

export const Checkbox = () => (
  <CheckBoxComponent name="" checked={true} indeterminate={true} />
);

export const CheckboxDisable = () => (
  <CheckBoxComponent disable={true} name="" checked={true} />
);

export const RadioButton = () => (
  <div>
    <RadioButtonComponent
      labelClassName="text-black ml-1"
      value={'option1'}
      name={'button'}
      text={'Choose Option 1'}
      checked={false}
    />
    <RadioButtonComponent
      labelClassName="text-black ml-1"
      value={'option2'}
      name={'button'}
      text={'Choose Option 2'}
      checked={false}
    />
  </div>
);
export const Switch = () => <SwitchComponent checked={true} />;

export const Tag = () => (
  <div className='flex space-x-1'>
    <TagComponent status="published" text="Published" className='text-12' />
    <TagComponent status="draft" text="Draft" className='text-12' />

  </div>
);
