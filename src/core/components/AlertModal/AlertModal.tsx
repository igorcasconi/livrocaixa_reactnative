import React, { useState } from 'react'
import { Modal, View, StyleSheet } from 'react-native'
import { Column } from '../Column'
import { Row } from '../Row'
import { Button } from '../Button'
import { Text } from '../Text'

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

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 0,
      alignItems: 'stretch',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    contentContainer: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      minWidth: 280
    },
    titleText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#21262c',
      marginBottom: 8
    },
    messageText: {
      fontSize: 14,
      color: '#555',
      lineHeight: 20
    },
    buttonsContainer: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
      minHeight: 44
    },
    buttonStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      borderRightWidth: 1,
      borderRightColor: '#e0e0e0'
    },
    lastButton: {
      borderRightWidth: 0
    },
    cancelButtonText: {
      fontSize: 14,
      color: '#3585e7',
      fontWeight: '600'
    },
    defaultButtonText: {
      fontSize: 14,
      color: '#3585e7',
      fontWeight: '600'
    },
    destructiveButtonText: {
      fontSize: 14,
      color: '#d32f2f',
      fontWeight: '600'
    }
  })

  return (
    <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onDismiss}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.messageText}>{message}</Text>
          </View>

          <View style={styles.buttonsContainer}>
            {buttons.map((button, index) => {
              const isLastButton = index === buttons.length - 1
              const buttonStyle = button.style || 'default'

              let textStyle = styles.defaultButtonText
              if (buttonStyle === 'cancel') {
                textStyle = styles.cancelButtonText
              } else if (buttonStyle === 'destructive') {
                textStyle = styles.destructiveButtonText
              }

              return (
                <View key={index} style={[styles.buttonStyle, isLastButton && styles.lastButton]}>
                  <Button
                    backgroundColor='transparent'
                    onPress={() => handleButtonPress(button)}
                    flex={1}
                    justifyContent='center'
                    alignItems='center'
                    width='100%'
                  >
                    <Text style={textStyle}>{button.text}</Text>
                  </Button>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default AlertModal
