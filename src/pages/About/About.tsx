import React from 'react'
import { Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Link from '../../components/Link'
import logoImg from '../../assets/logo.png'
import styles from './style'
import { useNavigation } from '@react-navigation/native'
import { Button, Column, Text } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'

const About: React.FC = () => {
  const { navigate } = useNavigation()
  return (
    <ScrollView>
      <Column style={styles.container}>
        <Column style={styles.viewButton}>
          <Text style={styles.textInit}>Livro Caixa</Text>
        </Column>

        <Column style={styles.viewImageLogo}>
          <Image style={styles.imageLogo} source={logoImg} />
        </Column>

        <Column style={styles.viewInfoVersion}>
          <Ionicons name='checkmark-circle' size={22} color='green' />
          <Text fontSize={20} fontWeight='bold'>
            {' '}
            Versão 3.0.5
          </Text>
        </Column>

        <Column style={styles.viewInfo}>
          <Text fontSize={20} fontWeight='bold'>
            Crédito ao autor das imagens das Movimentações:
          </Text>
          <Column style={styles.viewInfoVersion}>
            <Ionicons name='link-outline' size={25} color='gray' />
            <Link url='https://www.flaticon.com/br/autores/icongeek26'>Icongeek26</Link>
          </Column>
        </Column>

        <Column style={styles.viewInfo}>
          <Text fontSize={20} fontWeight='bold'>
            Informações do aplicativo
          </Text>
          <Column style={styles.viewInfoVersion}>
            <Ionicons name='link-outline' size={25} color='gray' />
            <Button onPress={() => navigate('PolicyPrivacy')}>
              <Text style={styles.textInfoLink}>Política de Privacidade</Text>
            </Button>
          </Column>
        </Column>

        <Column style={styles.viewInfo}>
          <Text fontSize={20} fontWeight='bold'>
            Aplicativo desenvolvido por:
          </Text>
          <Column style={styles.viewInfoVersion}>
            <Ionicons name='person' size={25} color='#4db476' />
            <Text fontSize={20} fontWeight='bold'>
              {' '}
              Igor Casconi de Oliveira
            </Text>
          </Column>
        </Column>
      </Column>
    </ScrollView>
  )
}

export default About
