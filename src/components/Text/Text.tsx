import React from 'react'
import styled, { css } from 'styled-components/native'
import { color, layout, space, typography, TypographyProps } from 'styled-system'
import { StyledProps } from '../../shared/styled'

type TextProps = Omit<StyledProps, 'PositionProps' | 'BorderProps' | 'FlexboxProps'> & TypographyProps

const Text: React.FC<TextProps> = styled.Text<TextProps>(
  () => css`
    ${color};
    ${layout};
    ${space};
    ${typography};
  `
)

export default Text
