import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components/native'
import { color, layout, space, typography, TypographyProps } from 'styled-system'
import { StyledProps } from '../../shared/styled'

type TextProps = Omit<StyledProps, 'PositionProps' | 'BorderProps' | 'FlexboxProps'> &
  TypographyProps & {
    textDecorationLine?: 'underline'
  }

const Text: React.FC<PropsWithChildren<TextProps>> = styled.Text<TextProps>(
  ({ textDecorationLine }) => css`
    ${textDecorationLine && `text-decoration-line: ${textDecorationLine}`}
    ${color};
    ${layout};
    ${space};
    ${typography};
  `
)

export default Text
