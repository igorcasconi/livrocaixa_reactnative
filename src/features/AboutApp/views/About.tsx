import React from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'

import Link from '../../../core/components/Link'
import { ImageAbout } from './styles/styles'
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../../assets/logo.png'
import { Column, Row, Text } from '../../../core/components'

const About: React.FC = () => {
  const { navigate } = useNavigation()
  return (
    <ScrollView>
      <Column flex={1} padding={30}>
        <Row width={1} justifyContent='flex-start' alignItems='center'>
          <Text fontSize={25} marginBottom={5} fontWeight='bold'>
            Livro Caixa
          </Text>
        </Row>

        <Row width={1} justifyContent='center' alignItems='center'>
          <ImageAbout source={logoImg} />
        </Row>

        <Row marginTop={10} justifyContent='center'>
          <Ionicons name='checkmark-circle' size={22} color='green' />
          <Text fontSize={20} fontWeight='bold'>
            {' '}
            Versão 4.0.0
          </Text>
        </Row>

        <Column width={1} marginTop={16}>
          <Text fontSize={20} fontWeight='bold'>
            Crédito ao autor das imagens das Movimentações:
          </Text>
          <Row width={1} marginTop={10}>
            <Ionicons name='link-outline' size={25} color='gray' />
            <Link url='https://www.flaticon.com/br/autores/icongeek26'>Icongeek26</Link>
          </Row>
        </Column>

        <Column marginTop={10} width={1}>
          <Text fontSize={20} fontWeight='bold'>
            Informações do aplicativo
          </Text>
          <Row width={1} marginTop={10}>
            <Ionicons name='link-outline' size={25} color='gray' />
            {/* @ts-ignore */}
            <TouchableOpacity onPress={() => navigate('PolicyPrivacy')}>
              <Link url=''>Política de privacidade</Link>
            </TouchableOpacity>
          </Row>
        </Column>

        <Column marginTop={16} width={1}>
          <Text fontSize={20} fontWeight='bold'>
            Aplicativo desenvolvido por:
          </Text>
          <Row width={1} marginTop={10}>
            <Ionicons name='person' size={25} color='background' />
            <Text fontSize={20} fontWeight='bold'>
              {' '}
              Igor Casconi de Oliveira
            </Text>
          </Row>
        </Column>
      </Column>
    </ScrollView>
  )
}

export default About
