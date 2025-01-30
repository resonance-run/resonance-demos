import { type ButtonHTMLAttributes } from 'react';

export enum ButtonSize {
  small,
  medium,
  large,
}

export enum ButtonEmphasis {
  primary,
  secondary,
  tertiary,
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  emphasis?: ButtonEmphasis;
  label?: string;
  circle?: boolean;
}

const sizeClasses = {
  [ButtonSize.small]: 'px-2 py-1',
  [ButtonSize.medium]: 'px-3 py-1',
  [ButtonSize.large]: 'px-5 py-2',
};

const emphasisClasses = {
  [ButtonEmphasis.primary]: `bg-res-blue-500 hover:bg-res-blue-600 active:bg-res-blue-700 focus:bg-res-blue-600 text-white disabled:opacity-50`,
  [ButtonEmphasis.secondary]: `border-2 border-solid border-res-blue-500
     text-res-blue-500
    focus:border-res-blue-600 hover:border-res-blue-600 active:border-res-blue-700
    focus:text-res-blue-600 hover:text-res-blue-600 active:text-res-blue-700
    disabled:opacity-50`,
  [ButtonEmphasis.tertiary]: `border-none bg-transparent
    hover:bg-black/5 dark:hover:bg-white/20 active:bg-black/5 focus:bg-black/5 text-black/90 dark:text-white/90
    disabled:text-black/40`,
};

const baseClasses = 'flex flex-row items-center transition-all duration-150 disabled:cursor-not-allowed';
// These can be used to give links the appearance of buttons
export const primaryButtonClasses = `${baseClasses} ${emphasisClasses[ButtonEmphasis.primary]}`;
export const secondaryButtonClasses = `${baseClasses} ${emphasisClasses[ButtonEmphasis.secondary]}}`;
export const tertiaryButtonClasses = `${baseClasses} ${emphasisClasses[ButtonEmphasis.tertiary]}}`;

export const Button = ({
  size = ButtonSize.medium,
  emphasis = ButtonEmphasis.primary,
  label,
  children,
  className,
  circle,
  ...args
}: ButtonProps) => {
  return (
    <button
      className={`font-semibold ${sizeClasses[size]} ${emphasisClasses[emphasis]} ${
        circle ? 'rounded-full' : 'rounded-md'
      } ${emphasis !== ButtonEmphasis.tertiary ? 'shadow-xs' : ''} ${baseClasses} ${className}`}
      {...args}
    >
      {children ? children : label || ''}
    </button>
  );
};
