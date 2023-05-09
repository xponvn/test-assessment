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
import Close from './assets/close';

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
  | 'plus-circle'
  | 'close';

export type IconsType = Record<IconName, Icon>;

export const Icons: IconsType = {
  qa: QA,
  remove: Remove,
  plus: Plus,
  check: Check,
  edit: Edit,
  notification: Notification,
  'chevron-down': ChevronDown,
  refresh: Refresh,
  search: Search,
  'arrow-back': ArrowBack,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  save: Save,
  publish: Publish,
  caution: Caution,
  'eye-hide': EyeHide,
  'eye-show': EyeShow,
  success: Success,
  close: Close,
  'remove-outline': RemoveOutline,
  'plus-circle': PlusCircle,
};

export const Icon = ({ name, ...reset }: IconProps & { name?: IconName }) => {
  if (!name) {
    return null;
  }
  const RenderIcon = Icons[name];
  return RenderIcon ? <RenderIcon {...reset} /> : null;
};
