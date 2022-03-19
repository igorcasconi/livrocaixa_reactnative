import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styled from 'styled-components/native'
import { Column } from '../Column'
import { Row } from '../Row'
import { Text } from '../Text'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

type InputProps = TextInputProps & {
  icon?: string
  label?: string
}

const Input: React.FC<InputProps> = ({ icon, label, ...props }) => {
  return (
    <Column width={1} height={40} mb={18}>
      <Row ml='4px' width={1} height={14} mb='2px'>
        <Text fontSize={12} color='black'>
          {label}
        </Text>
      </Row>
      <InputComponent {...props} />
      {!!icon && (
        <Row width={20} height={20} position='absolute' top={27.5} left={10} elevation={4}>
          <MaterialCommunityIcons name={icon} size={16} color='#c1c1c1' />
        </Row>
      )}
    </Column>
  )
}

const InputComponent = styled(TextInput)`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid black;
  position: relative;
  background-color: #fefefe;
  padding-left: 30px;
  elevation: 2;
`

export default Input
