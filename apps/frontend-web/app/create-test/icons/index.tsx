import { CSSProperties, FC } from 'react';
import QA from './qa';
import Delete from './delete';
import Plus from './plus';
import Check from './check';

export type IconProps = {
  className?: string;
  style?: CSSProperties;
  transform?: string;
  strokeWidth?: number;
};

export type Icon = FC<IconProps>;

export type IconName =
  | 'qa'
  | 'delete'
  | 'plus'
  | 'check'

export type IconsType = Record<IconName, Icon>;

export const Icons: IconsType = {
  qa: (props: IconProps) => {
    return <QA {...props} />;
  },
  delete: (props: IconProps) => {
    return <Delete {...props} />;
  },
  plus: (props: IconProps) => {
    return <Plus {...props} />;
  },
  check: (props: IconProps) => {
    return <Check {...props} />;
  },
};

export const RenderIcon = ({ name, ...reset }: IconProps & { name?: IconName }) => {
  if (!name) {
    return null;
  }
  const Icon = Icons[name];
  return <Icon {...reset} />;
};
