import React from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Link from '../../components/Link'
import logoImg from '../../assets/logo.png'
import styles from './style'
import { useNavigation } from '@react-navigation/native'

const About: React.FC = () => {
  const { navigate } = useNavigation()
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.viewButton}>
          <Text style={styles.textInit}>Livro Caixa</Text>
        </View>

        <View style={styles.viewImageLogo}>
          <Image style={styles.imageLogo} source={logoImg} />
        </View>

        <View style={styles.viewInfoVersion}>
          <Ionicons name='checkmark-circle' size={22} color='green' />
          <Text style={styles.textInfo}> Versão 3.0.5</Text>
        </View>

        <View style={styles.viewInfo}>
          <Text style={styles.textInfo}>Crédito ao autor das imagens das Movimentações:</Text>
          <View style={styles.viewInfoVersion}>
            <Ionicons name='link-outline' size={25} color='gray' />
            <Link url='https://www.flaticon.com/br/autores/icongeek26'>Icongeek26</Link>
          </View>
        </View>

        <View style={styles.viewInfo}>
          <Text style={styles.textInfo}>Informações do aplicativo</Text>
          <View style={styles.viewInfoVersion}>
            <Ionicons name='link-outline' size={25} color='gray' />
            <TouchableOpacity onPress={() => navigate('PolicyPrivacy')}>
              <Text style={styles.textInfoLink}>Política de Privacidade</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewInfo}>
          <Text style={styles.textInfo}>Aplicativo desenvolvido por:</Text>
          <View style={styles.viewInfoVersion}>
            <Ionicons name='person' size={25} color='#4db476' />
            <Text style={styles.textInfo}> Igor Casconi de Oliveira</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default About
