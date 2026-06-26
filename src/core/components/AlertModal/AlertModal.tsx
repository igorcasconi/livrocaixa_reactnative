import React from 'react'
import { Modal } from 'react-native'
import { Button } from '../Button'
import {
  ActionText,
  ButtonsContainer,
  ButtonWrapper,
  CenteredView,
  ContentContainer,
  MessageText,
  ModalView,
  TitleText
} from './styles'

export type AlertButton = {
  text: string
  onPress?: () => void
  style?: 'default' | 'cancel' | 'destructive'
}

type AlertModalProps = {
  visible: boolean
  title: string
  message: string
  buttons: AlertButton[]
  onDismiss?: () => void
}

const AlertModal: React.FC<AlertModalProps> = ({ visible, title, message, buttons, onDismiss }) => {
  const handleButtonPress = (button: AlertButton) => {
    button.onPress?.()
    onDismiss?.()
  }

  return (
    <Modal animationType='fade' transparent visible={visible} onRequestClose={onDismiss}>
      <CenteredView>
        <ModalView>
          <ContentContainer>
            <TitleText>{title}</TitleText>
            <MessageText>{message}</MessageText>
          </ContentContainer>

          <ButtonsContainer>
            {buttons.map((button, index) => {
              const isLastButton = index === buttons.length - 1
              const buttonStyle = button.style || 'default'

              return (
                <ButtonWrapper key={index} $isLast={isLastButton}>
                  <Button
                    backgroundColor='transparent'
                    onPress={() => handleButtonPress(button)}
                    flex={1}
                    justifyContent='center'
                    alignItems='center'
                    width='100%'
                  >
                    <ActionText $variant={buttonStyle}>{button.text}</ActionText>
                  </Button>
                </ButtonWrapper>
              )
            })}
          </ButtonsContainer>
        </ModalView>
      </CenteredView>
    </Modal>
  )
}

export default AlertModal
