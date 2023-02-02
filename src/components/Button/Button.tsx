import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components/native'
import { flexbox, layout, space, color, position, border } from 'styled-system'

import { StyledProps } from '../../shared/styled'

type ButtonProps = StyledProps & {
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
