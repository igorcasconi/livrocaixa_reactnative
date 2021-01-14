import React from 'react'
import styled, { css } from 'styled-components/native'

interface ColumnProps {
  width?: string
  height?: string
  bgColor?: string
  margin?: string
  mr?: number
  ml?: number
  mt?: number
  mb?: number
  border?: string
  padding?: string
  pt?: number
  pr?: number
  pl?: number
  pb?: number
  borderRadius?: number
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
  borderBottomLeftRadius?: number
  borderBottomRightRadius?: number
  borderWidth?: number
  justifyContent?: string
  alignItems?: string
}

const Column: React.FC<ColumnProps> = ({ children, ...props }) => <ColumnDiv {...props}>{children}</ColumnDiv>

const ColumnDiv = styled.View<ColumnProps>(({ ...props }) => {
  return css`
    flex-direction: column;
    ${props.width && `width: ${props.width}`};
    ${props.height && `height: ${props.height}`};
    ${props.justifyContent && `justify-content: ${props.justifyContent}`};
    ${props.alignItems && `align-items: ${props.alignItems}`};
    ${props.bgColor && `background-color: ${props.bgColor}`};
    ${props.margin && `margin: ${props.margin}`};
    ${props.mr && `margin-right: ${props.mr}px`};
    ${props.ml && `margin-left: ${props.ml}px`};
    ${props.mt && `margin-top: ${props.mt}px`};
    ${props.mb && `margin-bottom: ${props.mb}px`};
    ${props.borderRadius && `border-radius: ${props.borderRadius}px`};
    ${props.borderTopLeftRadius && `border-top-left-radius: ${props.borderTopLeftRadius}px`};
    ${props.borderTopRightRadius && `border-top-right-radius: ${props.borderTopRightRadius}px`};
    ${props.borderBottomRightRadius && `border-bottom-right-radius: ${props.borderBottomRightRadius}px`};
    ${props.borderBottomLeftRadius && `border-bottom-left-radius: ${props.borderBottomLeftRadius}px`};
    ${props.borderWidth && `border-width: ${props.borderWidth}px`};
  `
})

export default Column
