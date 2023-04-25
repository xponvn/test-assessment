import * as React from 'react';
import { Icon } from '../Icon';
import { useOutsideClick } from './useOutsideClick';

export type SelectionSize = 'large' | 'small' | 'medium';
export type SelectionItem = {
  id: string;
  text: string;
  icon?: React.ReactNode;
};
export type SelectionData = SelectionItem[];
export interface SelectionProps {
  width?: number;
  block?: boolean;
  placeholder: string;
  className?: string;
  size?: SelectionSize;
  data: SelectionData;
  onChange?: (id: string, text: string) => void;
  disable?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const variantClassName: Record<SelectionSize, any> = {
  small: {
    padding: 'px-[12px] py-[4px]',
  },
  medium: {
    padding: 'px-[12px] py-[8px]',
  },
  large: {
    padding: 'px-[12px] py-[12px]',
  },
};

export const Selection = (props: SelectionProps) => {
  const {
    block,
    width = 400,
    size = 'medium',
    className = '',
    placeholder,
    data,
    onChange,
    disable = false,
  } = props;
  const [isOpen, setOpen] = React.useState(false);
  const [defaultTitle, setDefaultTitle] = React.useState('');

  const handleSelect = (id: string, text: string) => {
    setOpen(false);
    setDefaultTitle(text);
    if (onChange) onChange(id, text);
  };

  const handleOutsideClick = () => {
    setOpen(false);
  };
  const ref = useOutsideClick(handleOutsideClick);

  return (
    <div
      ref={ref}
      style={{ width: block ? '100%' : width + 'px' }}
      className={`relative ${className} `}
    >
      <div
        className={`flex justify-between relative items-center cursor-pointer border-[1px] border-neutral-border hover:border-neutral-placeholder ${
          variantClassName[size].padding
        } ${disable ? 'bg-neutral' : 'bg-neutral-table-header'}`}
        onClick={() => !disable && setOpen(!isOpen)}
      >
        <span
          className={`text-15 ${
            placeholder && defaultTitle === ''
              ? 'text-neutral-placeholder'
              : 'text-neutral-text-primary'
          }`}
        >
          {defaultTitle === '' ? placeholder : defaultTitle}
        </span>

        <Icon
          viewBox="0 0 10 6"
          name={'arrowSelection'}
          width={10}
          height={6}
          color="text-neutral-placeholder"
        />
      </div>

      {isOpen ? (
        <div className="shadow-[0_8px_12px_rgba(56,5,89,0.16)] border-neutral-border py-[8px]">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(data[index].id, data[index].text)}
              className="flex items-center p-[8px] cursor-pointer hover:bg-neutral-bg"
            >
              {item.icon}
              <span className=" text-15 text-neutral-text-primary">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
