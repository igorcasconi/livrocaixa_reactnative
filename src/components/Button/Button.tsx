import React, { PropsWithChildren } from 'react'
import { TouchableOpacityProps } from 'react-native'
import styled, { css } from 'styled-components/native'
import { flexbox, layout, space, color, position, border } from 'styled-system'

import { StyledProps } from '../../shared/styled'

type ButtonProps = StyledProps &
  TouchableOpacityProps & {
    onPress?: () => void
  }

const Button: React.FC<PropsWithChildren<ButtonProps>> = styled.TouchableOpacity<ButtonProps>(
  () => css`
    flex-direction: row;
    ${color};
    ${space};
    ${layout};
    ${position};
    ${border};
    ${flexbox};
  `
)

export default Button
