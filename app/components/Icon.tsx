// A subset of the list found at https://lucide.dev/icons/

import { DynamicIcon } from 'lucide-react/dynamic';

// If another icon from that list is needed, just add it to the enum
export enum IconName {
  archive = 'archive',
  arrowDown = 'arrow-down',
  arrowLeft = 'arrow-left',
  arrowRight = 'arrow-right',
  arrowUp = 'arrow-up',
  book = 'book',
  check = 'check',
  checkSquare = 'check-square',
  chevronDown = 'chevron-down',
  chevronRight = 'chevron-right',
  chevronLeft = 'chevron-left',
  chevronUp = 'chevron-up',
  circle = 'circle',
  clipboard = 'clipboard',
  clock = 'clock',
  code = 'code',
  compass = 'compass',
  copy = 'copy',
  divide = 'divide',
  dollarSign = 'dollar-sign',
  filter = 'filter',
  flag = 'flag',
  gift = 'gift',
  home = 'home',
  image = 'image',
  inbox = 'inbox',
  info = 'info',
  layers = 'layers',
  link = 'link',
  list = 'list',
  loader = 'loader',
  mail = 'mail',
  menu = 'menu',
  minus = 'minus',
  moreHorizontal = 'more-horizontal',
  moreVertical = 'more-vertical',
  music = 'music',
  pageWithWriting = 'file-text',
  pencil = 'edit-2',
  phone = 'phone',
  plane = 'plane',
  plus = 'plus',
  save = 'save',
  search = 'search',
  settings = 'settings',
  sliders = 'sliders',
  sparkles = 'sparkles',
  template = 'layout-template',
  trash = 'trash-2',
  truck = 'truck',
  user = 'user',
  userPlus = 'user-plus',
  users = 'users',
  x = 'x',
}

export const isIconName = (name: string): name is IconName => {
  return Object.values(IconName).includes(name as IconName);
};

export enum IconSize {
  xSmall = 12,
  small = 16,
  medium = 24,
  large = 36,
  xLarge = 48,
}

interface IconProps {
  name: IconName;
  className?: string;
  size?: IconSize;
  height?: number;
  width?: number;
  thin?: boolean;
}

export const Icon = ({ name, size, height = 24, width = 24, className, thin }: IconProps) => {
  if (size) {
    height = width = size;
  }
  return <DynamicIcon name={name} size={height} className={className} />;
};
