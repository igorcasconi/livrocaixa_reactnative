import { ViewProps, ViewStyle } from 'react-native'
import { BorderProps, ColorProps, FlexboxProps, LayoutProps, PositionProps, SpaceProps } from 'styled-system'

export type StyledProps = SpaceProps &
  LayoutProps &
  ColorProps &
  BorderProps &
  PositionProps &
  FlexboxProps &
  ViewProps &
  ViewStyle
