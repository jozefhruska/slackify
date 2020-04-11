export const colors = {
  brand: '#4ac561',
  gray: {
    0: '#ffffff',
    1: '#f1f1f1',
    2: '#e2e2e2',
    3: '#b5b5b5',
    4: '#757575',
    5: '#696969',
    6: '#444444',
    7: '#333333',
    8: '#232323',
    9: '#121212',
    10: '#000000',
  },
  info: '#0062ff',
  danger: '#fe4759',
  warning: '#ffc542',
  accent: '#a461d8',
} as const;

export default {
  breakpoints: ['48rem', '64rem', '85.375rem', '120rem', '160rem'],
  colors,
  space: {
    s0: '0',
    s1: '0.25rem',
    s2: '0.5rem',
    s3: '0.75rem',
    s4: '1rem',
    s5: '1.25rem',
    s6: '1.5rem',
    s7: '1.75rem',
    s8: '2rem',
    s10: '2.5rem',
    s12: '3rem',
    s16: '4rem',
    s20: '5rem',
    s40: '10rem',
  },
  radii: {
    small: '4px',
    medium: '10px',
    large: '14px',
  },
  fontSizes: {
    normal: '1rem',
  },
};
