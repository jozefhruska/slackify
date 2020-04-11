export type AppHomeComponentPreview = {
  id: string;
  title?: string;
  text: string;
  published: boolean;
  author: string;
};

export type ComponentType = 'PLAIN_TEXT' | 'ARTICLE' | 'LINK';
