const accentColors = {
  info: '#0061fa',
  success: '#4fc84b',
  danger: '#fe4759',
  warning: '#ffb931',
};

export const dark = {
  colors: {
    ...accentColors,
    base: {
      10: '#1e2023',
      20: '#18191c',
      30: '#141417',
    },
    text: {
      10: '#141417',
      20: '#18191c',
      30: '#1e2023',
      40: '#eef2f5',
      50: '#f4f7f8',
      60: '#ffffff',
    },
  },
};

export const light = {
  colors: {
    ...accentColors,
    base: {
      10: '#ffffff',
      20: '#f4f7f8',
      30: '#eef2f5',
    },
    text: {
      10: '#ffffff',
      20: '#f4f7f8',
      30: '#eef2f5',
      40: '#1e2023',
      50: '#18191c',
      60: '#141417',
    },
  },
};
