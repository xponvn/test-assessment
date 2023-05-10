export interface SelectBoxProps {
  options: SelectBoxOption[];
  onChange: (value: string) => void;
  variant: 'vertical-label' | 'horizontal-label';
  size: 'small' | 'medium' | 'large';
  label?: string;
  defaultValue?: string;
  rightIcon?: React.ReactNode;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface SelectBoxOption {
  name: string;
  value: string;
}
