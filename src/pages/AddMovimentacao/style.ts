import { TouchableOpacity } from 'react-native'
import { Card, Input, Text } from '@ui-kitten/components'
import styled from 'styled-components/native'
import { TextInputMask } from 'react-native-masked-text'

export const CardMov = styled(Card)`
  border-radius: 15px;
  padding: 20px;
  margin: 10px;
  background: #ffebb4;
`
export const ImageMov = styled.Image`
  width: 90px;
  height: 90px;
  margin-right: 30px;
`

export const TextInfo = styled(Text)`
  font-size: 16px;
  color: #262626;
`

export const InputFieldValue = styled(TextInputMask)`
  background-color: rgb(247, 249, 252);
  border-radius: 4px;
  width: 100%;
  padding: 7px 8px;
  min-height: 40px;
  padding-left: 20px;
  border: 1px solid rgb(228, 233, 242);
`

export const InputFieldText = styled(Input)`
  width: 100%;
`

export const TextError = styled(Text)`
  font-size: 14px;
  color: #ff4242;
`

export const ButtonSubmit = styled(TouchableOpacity)`
  background-color: #187feb;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  border-style: solid;
  border-radius: 10px;
  padding: 10px;
`

export const TextButton = styled(Text)`
  color: #fff;
  font-weight: bold;
`
