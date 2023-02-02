import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components/native'
import { space, layout, color, flexbox, position, border } from 'styled-system'

import { StyledProps } from '../../shared/styled'

export interface ColumnProps extends StyledProps {
  as?: unknown
}

const Column: React.FC<PropsWithChildren<ColumnProps>> = styled.View<ColumnProps>(
  () => css`
    flex-direction: column;
    ${color};
    ${space};
    ${layout};
    ${position};
    ${border};
    ${flexbox};
  `
)

export default Column
