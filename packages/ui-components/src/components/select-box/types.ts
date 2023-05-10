export interface SelectBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectBoxOption[];
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
