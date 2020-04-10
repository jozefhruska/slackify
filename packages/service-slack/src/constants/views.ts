export const BLOCK_DIVIDER = {
  type: 'divider',
};

export const BLOCK_TEXT = (text: string, type: 'plain_text' | 'mrkdwn' = 'mrkdwn') => ({
  type: 'section',
  text: {
    type,
    text,
  },
});
