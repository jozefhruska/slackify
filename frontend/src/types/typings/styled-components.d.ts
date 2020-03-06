import { light } from '../../themes';

type ThemeInterface = typeof light;

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}
