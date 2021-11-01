import React, { useCallback, Fragment } from 'react'
import { Alert, Linking, TouchableOpacity, Text } from 'react-native'

import styles from './style'

interface LinkProps {
  url: string
}

const Link: React.FC<LinkProps> = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      await Linking.openURL(url)
    } else {
      Alert.alert('Não foi possível abrir a URL:' + url)
    }
  }, [url])

  return (
    <Fragment>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.textInfoLink}>{children}</Text>
      </TouchableOpacity>
    </Fragment>
  )
}

export default Link