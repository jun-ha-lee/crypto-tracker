// 일반모드 다크모드를 위해
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}