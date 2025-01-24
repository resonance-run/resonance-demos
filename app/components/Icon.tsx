// A subset of the list found at https://feathericons.com/
// If another icon from that list is needed, just add it to the enum
export enum IconName {
  archive = 'archive',
  arrowDown = 'arrow-down',
  arrowLeft = 'arrow-left',
  arrowRight = 'arrow-right',
  arrowUp = 'arrow-up',
  check = 'check',
  chevronDown = 'chevron-down',
  chevronRight = 'chevron-right',
  chevronLeft = 'chevron-left',
  chevronUp = 'chevron-up',
  circle = 'circle',
  clipboard = 'clipboard',
  code = 'code',
  copy = 'copy',
  divide = 'divide',
  dollarSign = 'dollar-sign',
  filter = 'filter',
  flag = 'flag',
  gift = 'gift',
  home = 'home',
  image = 'image',
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
  pencil = 'edit-2',
  phone = 'phone',
  plus = 'plus',
  save = 'save',
  search = 'search',
  sliders = 'sliders',
  truck = 'truck',
  user = 'user',
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
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth={thin ? '1.5' : '2'}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <use href={`/feather-sprite.svg#${name}`} />
    </svg>
  );
};
