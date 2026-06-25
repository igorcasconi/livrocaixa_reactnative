import 'styled-components/native'
import theme from '../theme'

type ThemeType = typeof theme

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {
    colors: {
      primary: string
      background: string
      secondary: string
      text: string
      error: string
      white: string
      green: {
        n100: string
      }
      yellow: {
        n50: string
        n100: string
      }
      purple: string
      link: string
    }
  }
}
