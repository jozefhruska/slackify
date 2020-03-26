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
  accent: {
    blue: '#50b5ff',
    yellow: '#fec543',
    orange: '#ff974a',
    red: '#fc5a5a',
    green: '#82c43c',
    purple: '#a461d8',
    pink: '#ff9ad5',
  },

  // TODO: Remove after refactoring
  info: '#0062ff',
  success: '#0062FF',
  danger: '#fe4759',
  warning: '#ffc542',
  base: {
    10: '#ffffff',
    20: '#ababab',
    30: '#434343',
    40: '#2c2c2c',
    50: '#1c1c1c',
    60: '#000000',
  },
} as const;

export default {
  breakpoints: ['450px', '576px', '768px', '992px', '1200px'],
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
  shadows: {
    box: {
      small: (color = '#000000') => `0px 3px 14px -3px ${color.concat('4D')}`,
      medium: (color = '#000000') => `0px 4px 20px -4px ${color.concat('4D')}`,
      large: (color = '#000000') => `0px 5px 25px -10px ${color.concat('4D')}`,
    },
  },
};
