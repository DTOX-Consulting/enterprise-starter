import { useMediaQuery } from 'usehooks-ts';

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

export function useBreakpointAbove(breakpoint: keyof typeof breakpoints) {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`);
}

export function useBreakpointBelow(breakpoint: keyof typeof breakpoints) {
  return useMediaQuery(`(max-width: ${breakpoints[breakpoint]})`);
}

export function useBreakpointBetween(min: keyof typeof breakpoints, max: keyof typeof breakpoints) {
  return useMediaQuery(`(min-width: ${breakpoints[min]}) and (max-width: ${breakpoints[max]})`);
}
