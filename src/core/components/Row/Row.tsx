import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components/native'
import { space, layout, color, flexbox, position, border } from 'styled-system'

import { StyledProps } from '../../shared/styled'

export interface RowProps extends StyledProps {
  as?: unknown
}

const Row = styled.View<RowProps>(
  () => css`
    flex-direction: row;
    ${color};
    ${space};
    ${layout};
    ${position};
    ${border};
    ${flexbox};
  `
) as React.FC<PropsWithChildren<RowProps>>

export default Row
