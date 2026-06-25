import { TouchableOpacity } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Card, Input, Text } from '@ui-kitten/components'

// @ts-ignore
import styled from 'styled-components/native'

export const TransactionFormCard = styled(Card)`
  border-radius: 15px;
  padding: 16px;
  margin: 10px;
  background: ${({ theme }) => theme.colors.yellow.n50};
`
export const TransactionImage = styled.Image`
  width: 90px;
  height: 90px;
`

export const TextInfo = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  flex-wrap: wrap;
`

export const InputFieldValue = styled(TextInputMask)`
  background-color: rgb(247, 249, 252);
  border-radius: 4px;
  width: 100%;
  padding: 7px 20px 7px 8px;
  min-height: 40px;
  border: 1px solid rgb(228, 233, 242);
`

export const InputFieldText = styled(Input)`
  width: 100%;
`

export const TextError = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.error};
`

export const ButtonSubmit = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.secondary};
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  border-style: solid;
  border-radius: 10px;
  padding: 10px;
`

export const TextButton = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
`
