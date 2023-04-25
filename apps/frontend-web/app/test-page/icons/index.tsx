import { CSSProperties, FC } from 'react';
import QA from './qa';
import Delete from './delete';
import Plus from './plus';
import Check from './check';
import Edit from './edit';
import Notification from './notification';
import ChevronDown from './chevron-down';
import Refresh from './refresh';
import Search from './search';
import ArrowLeft from './arrow-left';
import ArrowRight from './arrow-right';

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
  | 'edit'
  | 'notification'
  | 'chevron-down'
  | 'refresh'
  | 'search'
  | 'arrow-right'
  | 'arrow-left'

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
  edit: (props: IconProps) => {
    return <Edit {...props} />;
  },
  notification: (props: IconProps) => {
    return <Notification {...props} />;
  },
  "chevron-down": (props: IconProps) => {
    return <ChevronDown {...props} />;
  },
  refresh: (props: IconProps) => {
    return <Refresh {...props} />;
  },
  search: (props: IconProps) => {
    return <Search {...props} />;
  },
  "arrow-left": (props: IconProps) => {
    return <ArrowLeft {...props} />;
  },
  "arrow-right": (props: IconProps) => {
    return <ArrowRight {...props} />;
  },
};

export const RenderIcon = ({ name, ...reset }: IconProps & { name?: IconName }) => {
  if (!name) {
    return null;
  }
  const Icon = Icons[name];
  return <Icon {...reset} />;
};
