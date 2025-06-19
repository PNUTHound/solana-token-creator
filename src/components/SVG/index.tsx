export { default as CreateSVG } from './CreateSVG';
export { default as NetworkSwitcherSVG } from './NetworkSwitcherSVG';
export { default as NotificationSVG } from './NotificationSVG';

// Additional SVG exports for future components
export type { FC } from 'react';

// SVG component props interface
export interface SVGProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}