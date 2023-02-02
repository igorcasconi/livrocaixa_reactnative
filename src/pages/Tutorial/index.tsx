import React from 'react'
<<<<<<< HEAD
import { ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'
import { Column, Text, Row } from '../../components'
=======
import { View, Text, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
>>>>>>> 000880b (fix(app): fixed app)

import styles from './style'

const Tutorial: React.FC = () => (
<<<<<<< HEAD
  <ScrollView>
    <Column width={1} height='100%' p={20} flex={1}>
      <Text fontSize={16} color='#21262c' fontWeight='bold' textAlign='center'>
        Guia de Uso do Aplicativo
      </Text>
      <Text style={styles.textTitulo}>Tela Inicial</Text>
      <StyledCard backgroundColor='#4db476'>
        <Row width={1}>
          <Ionicons name='arrow-forward-circle-outline' size={16} />
          <Text fontSize={16} color='white' fontWeight='bold' ml={10}>
            Botão: Movimentação do Caixa
          </Text>
        </Row>
        <Row width={1}>
          <Text>
            - Exibe a informações sobre todas as movimentações divididas em duas abas que são: Entradas e Saídas
          </Text>
        </Row>
        <Row width={1}>
          <Text>
            - Nesta página será inserida a informação de movimentação do caixa, clicando no botão "Adicionar
            Movimentação" no topo da página para inserir uma nova informação ao caixa
          </Text>

          <Text></Text>
        </Row>
        <Row width={1}>
          <Text> - O Saldo do Caixa é informado na Página inicial do App ou no topo de cada aba</Text>
        </Row>
        <Row width={1}>
          <Text>
            - A cada nova entrada soma o valor inserido ao Saldo e a cada nova saída subtrai o valor inserido do Saldo
          </Text>
        </Row>
      </StyledCard>
      <StyledCard backgroundColor='#2147db'>
        <Row width={1}>
          <Ionicons name='arrow-forward-circle-outline' size={16} />
          <Text fontSize={16} color='white' fontWeight='bold' ml={10}>
            Botão: Movimentação/Ano
          </Text>
        </Row>
        <Row width={1}>
          <Text> - Exibe uma lista de cada ano que teve movimentações ao caixa com seu saldo a frente.</Text>
        </Row>
        <Row width={1}>
          <Text>
            - Ao clicar em um item da lista vai ser aberta uma nova tela mostrando os detalhes do saldo daquele ano com
            a quantidade de Entradas e Saídas.
          </Text>
        </Row>
        <Row width={1}>
          <Text>
            - Botão gerar relatório no final da tela, irá extrair um arquivo com as movimentações do ano selecionado
          </Text>
        </Row>
      </StyledCard>
      <StyledCard backgroundColor='#8b20d6'>
        <Row width={1}>
          <Ionicons name='arrow-forward-circle-outline' size={16} />
          <Text fontSize={16} color='white' fontWeight='bold' ml={10}>
            Botão: Movimentação/Mês
          </Text>
        </Row>
        <Row width={1}>
          <Text> - Exibe uma lista de cada mês/ano que teve movimentações ao caixa com seu saldo a frente.</Text>
        </Row>
        <Row width={1}>
          <Text>
            - Ao clicar em um item da lista vai ser aberta uma nova tela mostrando os detalhes do saldo daquele mês/ano
            com a quantidade de Entradas e Saídas.
          </Text>
        </Row>
        <Row width={1}>
          <Text>
            - Botão gerar relatório no final da tela, irá extrair um arquivo com as movimentações do mês selecionado
          </Text>
        </Row>
      </StyledCard>
    </Column>
  </ScrollView>
)

const StyledCard = styled(Column)`
  elevation: 2;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 16px;
`

=======
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

>>>>>>> 000880b (fix(app): fixed app)
export default Tutorial
