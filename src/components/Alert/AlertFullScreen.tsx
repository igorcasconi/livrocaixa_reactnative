import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CheckBox } from '@ui-kitten/components'

import { Button, Column, Text, Row } from '..'
import { ScrollView } from 'react-native'

interface AlertFullScreenProps {
  title?: string
  messages?: string[]
  isVisibleCheckbox?: boolean
  messageCheckbox?: string
  buttonText?: string
  buttonHandler?: () => void
}

const AlertFullScreen: React.FC<AlertFullScreenProps> = ({
  title,
  messages,
  isVisibleCheckbox = false,
  messageCheckbox,
  buttonText,
  buttonHandler
}) => {
  const [isConfirmedAlert, setConfirmedAlert] = useState<boolean>(false)
  return (
    <Column width={1} height='100%' backgroundColor='white'>
      <ScrollView>
        <Column width={1} height='100%' px={20} py={30} mt={0} justifyContent='space-between' alignItems='center'>
          <Column width={1} justifyContent='center' alignItems='center'>
            <Ionicons name='megaphone-outline' size={60} color='#f4db34' />
            <Text fontSize={40} color='#f4db34' fontWeight='bold'>
              {title}
            </Text>
          </Column>
          <Column width={1}>
            {messages?.map((message, index) => (
              <Row key={index} width={1} mt={10}>
                <Text fontSize={16} color='#0C0C0C' textAlign='center'>
                  {message}
                </Text>
              </Row>
            ))}
          </Column>
          <Column width={1} justifyContent='center' alignItems='center' my={20}>
            {isVisibleCheckbox && (
              <Row width={1}>
                <CheckBox checked={isConfirmedAlert} onChange={nextChecked => setConfirmedAlert(nextChecked)}>
                  {messageCheckbox}
                </CheckBox>
              </Row>
            )}
            {isVisibleCheckbox && isConfirmedAlert && (
              <Button
                backgroundColor='#3872c1'
                borderRadius={8}
                height={40}
                width={200}
                mt={20}
                justifyContent='center'
                alignItems='center'
                onPress={buttonHandler}
              >
                <Text fontSize={14} color='#ffffff' fontWeight='bold'>
                  {buttonText}
                </Text>
              </Button>
            )}
          </Column>
        </Column>
      </ScrollView>
    </Column>
  )
}

export default AlertFullScreen
