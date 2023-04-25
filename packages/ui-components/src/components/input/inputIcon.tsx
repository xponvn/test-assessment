import { Icon } from '../Icon';

export enum InputIconType {
  PASSWORD_HIDDEN = 'eyeShow',
  PASSWORD_VISIBLE = 'eyeHide',
  PROFILE = 'profile',
  CALENDAR = 'calendar',
}
export interface InputIconProps {
  type: string;
}

export const InputIcon = ({ type }: InputIconProps) => (
  <Icon name={type} width={24} height={24} color="text-neutral-placeholder" />
);
