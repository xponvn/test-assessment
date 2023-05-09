import type { Meta } from '@storybook/react';
import { SelectBox as SelectBoxComponent } from './selectBox';
import { mockSelectBoxProps } from './mock';

const Story: Meta<typeof SelectBoxComponent> = {
  title: 'Components / SelectBox',
  component: SelectBoxComponent,
};
export default Story;

export const SelectBoxVertical = () => (
  <SelectBoxComponent
    options={mockSelectBoxProps.options}
    onChange={(value) => {
      console.log(value);
    }}
    label={mockSelectBoxProps.label}
    variant={'vertical-label'}
    size={'small'}
    rightIcon={mockSelectBoxProps.rightIcon}
    placeholder={mockSelectBoxProps.placeholder}
  ></SelectBoxComponent>
);

export const SelectBoxVerticalDisable = () => (
  <SelectBoxComponent
    options={mockSelectBoxProps.options}
    onChange={(value) => {
      console.log(value);
    }}
    label={mockSelectBoxProps.label}
    variant={'vertical-label'}
    size={'small'}
    rightIcon={mockSelectBoxProps.rightIcon}
    placeholder={mockSelectBoxProps.placeholder}
    disabled={true}
    defaultValue={mockSelectBoxProps.options[0].value}
  ></SelectBoxComponent>
);

export const SelectBoxHorizontalSmall = () => (
  <SelectBoxComponent
    options={mockSelectBoxProps.options}
    onChange={(value) => {
      console.log(value);
    }}
    label={mockSelectBoxProps.label}
    variant={'horizontal-label'}
    size={'small'}
    rightIcon={mockSelectBoxProps.rightIcon}
    defaultValue={mockSelectBoxProps.options[0].value}
    className={'w-full'}
  ></SelectBoxComponent>
);

export const SelectBoxHorizontalMedium = () => (
  <SelectBoxComponent
    options={mockSelectBoxProps.options}
    onChange={(value) => {
      console.log(value);
    }}
    label={mockSelectBoxProps.label}
    variant={'horizontal-label'}
    size={'medium'}
    rightIcon={mockSelectBoxProps.rightIcon}
  ></SelectBoxComponent>
);

export const SelectBoxHorizontalLarge = () => (
  <SelectBoxComponent
    options={mockSelectBoxProps.options}
    onChange={(value) => {
      console.log(value);
    }}
    label={mockSelectBoxProps.label}
    variant={'horizontal-label'}
    size={'large'}
    rightIcon={mockSelectBoxProps.rightIcon}
  ></SelectBoxComponent>
);
