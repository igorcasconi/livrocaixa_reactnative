import React, { useCallback, Fragment, PropsWithChildren } from 'react'
import { Alert, Linking } from 'react-native'

import { Text } from '../Text'
import { Button } from '../Button'

interface LinkProps {
  url: string
}

const Link: React.FC<PropsWithChildren<LinkProps>> = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    try {
      await Linking.openURL(url)
    } catch (err) {
      Alert.alert('Não foi possível abrir a URL:' + url)
    }
  }, [url])

  return (
    <Fragment>
      <Button onPress={handlePress}>
        <Text fontSize={10} color='#1092e6' textDecorationLine='underline' marginLeft={10}>
          {children}
        </Text>
      </Button>
    </Fragment>
  )
}

export default Link
