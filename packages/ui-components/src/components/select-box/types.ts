export interface SelectBoxProps extends React.HTMLAttributes<HTMLSelectElement> {
  options: SelectBoxOption[];
  variant: 'verticle-label' | 'horizontal-label';
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

