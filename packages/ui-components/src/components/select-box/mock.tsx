import { SelectBoxProps } from './types';

export const mockSelectBoxProps: SelectBoxProps = {
  options: [
    { name: 'option1', value: '1' },
    { name: 'option2', value: '2' },
    { name: 'option3', value: '3' },
    { name: 'option4', value: '4' },
    { name: 'option5', value: '5' },
  ],
  rightIcon: (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  ),
  placeholder: 'Select your option',
  label: 'Label',
  variant: 'verticle-label',
  size: 'small',
};
