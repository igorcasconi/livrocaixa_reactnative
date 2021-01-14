import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useRoute } from '@react-navigation/native'

import MovAno from '../../components/MovAno'
import MovMes from '../../components/MovMes'
import { MovRouteProp } from '../../navigation/type'

const OthersMov: React.FC = () => {
  const route = useRoute<MovRouteProp>()

  const Component = useMemo(() => {
    if (route.name === 'MovAno') return <MovAno />

    if (route.name === 'MovMes') return <MovMes />
  }, [])

  return <View>{Component}</View>
}

export default OthersMov
