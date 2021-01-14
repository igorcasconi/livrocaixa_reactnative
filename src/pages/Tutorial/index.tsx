import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from './style'

const Tutorial: React.FC = () => (
  <View style={{ flex: 1 }}>
    <ScrollView>
      <Card containerStyle={styles.cardConfig}>
        <Card.Title>Guia de Uso do Aplicativo</Card.Title>
        <Text style={styles.textTitulo}>Tela Inicial</Text>
        <View style={styles.cardMovimentacao}>
          <Text style={styles.textInfo}>
            <Ionicons name='arrow-forward-circle-outline' size={16} /> Botão: Movimentação do Caixa
          </Text>
          <Text>
            {' '}
            - Exibe a informações sobre todas as movimentações divididas em duas abas que são: Entradas e Saídas
          </Text>
          <Text>
            {' '}
            - Nesta página será inserida a informação de movimentação do caixa, clicando no botão{' '}
            <Ionicons name='arrow-up-outline' /> ou <Ionicons name='arrow-down-outline' /> para entrada ou saída
            respectivamente que se encontra no final da página.
          </Text>
          <Text> - O Saldo do Caixa é informado na Página inicial do App ou no topo de cada aba</Text>
          <Text>
            {' '}
            - A cada nova entrada soma o valor inserido ao Saldo e a cada nova saída subtrai o valor inserido do Saldo
          </Text>
        </View>
        <View style={styles.cardMovimentacaoAzul}>
          <Text style={styles.textInfo}>
            <Ionicons name='arrow-forward-circle-outline' size={16} /> Botão: Movimentação/Ano
          </Text>
          <Text> - Exibe uma lista de cada ano que teve movimentações ao caixa com seu saldo a frente.</Text>
          <Text>
            {' '}
            - Ao clicar em um item da lista vai ser aberta uma nova tela mostrando os detalhes do saldo daquele ano com
            a quantidade de Entradas e Saídas.
          </Text>
        </View>
        <View style={styles.cardMovimentacaoRoxo}>
          <Text style={styles.textInfo}>
            <Ionicons name='arrow-forward-circle-outline' size={16} /> Botão: Movimentação/Mês/Ano
          </Text>
          <Text> - Exibe uma lista de cada mês/ano que teve movimentações ao caixa com seu saldo a frente.</Text>
          <Text>
            {' '}
            - Ao clicar em um item da lista vai ser aberta uma nova tela mostrando os detalhes do saldo daquele mês/ano
            com a quantidade de Entradas e Saídas.
          </Text>
        </View>
      </Card>
    </ScrollView>
  </View>
)

export default Tutorial
