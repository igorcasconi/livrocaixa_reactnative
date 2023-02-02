import React from 'react'
import { Input, InputProps } from 'react-native-elements'

import styles from './style'

type InputLoginProps = {
  icon?: string
}

const InputLogin: React.FC<InputLoginProps & InputProps> = ({ icon, ...props }) => {
  return (
    <Input
      leftIcon={{ type: 'ionicon', name: icon }}
      labelStyle={styles.label}
      inputContainerStyle={styles.container}
      {...props}
    />
  )
}

export default InputLogin
