import { CSSProperties, FC } from 'react';
import QA from './assets/qa';
import Remove from './assets/remove';
import Plus from './assets/plus';
import Check from './assets/check';
import Edit from './assets/edit';
import Notification from './assets/notification';
import ChevronDown from './assets/chevron-down';
import Refresh from './assets/refresh';
import Search from './assets/search';
import ArrowLeft from './assets/arrow-left';
import ArrowRight from './assets/arrow-right';
import Save from './assets/save';
import Publish from './assets/publish';
import Caution from './assets/caution';
import EyeHide from './assets/eye-hide';
import EyeShow from './assets/eye-show';
import Success from './assets/success';
import RemoveOutline from './assets/remove-outline';
import PlusCircle from './assets/plus-circle';
import ArrowUp from './assets/arrow-up';
import ArrowBack from './assets/arrow-back';

export type IconProps = {
  className?: string;
  style?: CSSProperties;
  transform?: string;
  strokeWidth?: number;
};

export type Icon = FC<IconProps>;

export type IconName =
  | 'qa'
  | 'remove'
  | 'plus'
  | 'check'
  | 'edit'
  | 'notification'
  | 'chevron-down'
  | 'refresh'
  | 'search'
  | 'arrow-back'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'save'
  | 'publish'
  | 'caution'
  | 'eye-hide'
  | 'eye-show'
  | 'success'
  | 'remove-outline'
  | 'plus-circle';

export type IconsType = Record<IconName, Icon>;

export const Icons: IconsType = {
  qa: (props: IconProps) => {
    return <QA {...props} />;
  },
  remove: (props: IconProps) => {
    return <Remove {...props} />;
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
  'chevron-down': (props: IconProps) => {
    return <ChevronDown {...props} />;
  },
  refresh: (props: IconProps) => {
    return <Refresh {...props} />;
  },
  search: (props: IconProps) => {
    return <Search {...props} />;
  },
  'arrow-back': (props: IconProps) => {
    return <ArrowBack {...props} />;
  },
  'arrow-left': (props: IconProps) => {
    return <ArrowLeft {...props} />;
  },
  'arrow-right': (props: IconProps) => {
    return <ArrowRight {...props} />;
  },
  'arrow-up': (props: IconProps) => {
    return <ArrowUp {...props} />;
  },
  save: (props: IconProps) => {
    return <Save {...props} />;
  },
  publish: (props: IconProps) => {
    return <Publish {...props} />;
  },
  caution: (props: IconProps) => {
    return <Caution {...props} />;
  },
  'eye-hide': (props: IconProps) => {
    return <EyeHide {...props} />;
  },
  'eye-show': (props: IconProps) => {
    return <EyeShow {...props} />;
  },
  success: (props: IconProps) => {
    return <Success {...props} />;
  },
  'remove-outline': (props: IconProps) => {
    return <RemoveOutline {...props} />;
  },
  'plus-circle': (props: IconProps) => {
    return <PlusCircle {...props} />;
  },
};

export const Icon = ({ name, ...reset }: IconProps & { name?: IconName }) => {
  if (!name) {
    return null;
  }
  const RenderIcon = Icons[name];
  return RenderIcon ? <RenderIcon {...reset} /> : null;
};
