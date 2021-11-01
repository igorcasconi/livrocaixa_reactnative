import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { View, Image, ScrollView, ActivityIndicator, PermissionsAndroid } from 'react-native'
import { Card } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { useRoute } from '@react-navigation/native'
import { useQuery } from 'react-query'
import XLSX from 'xlsx'
import OpenFile from 'react-native-doc-viewer'
import { RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob'
import Config from 'react-native-config'

import { numberToReal } from '../../utils/numberToReal'
import AdsBanner from '../../components/AdsBanner'
import { useUser } from '../../context/AuthContext'
import { Column, Row, Text, Button } from '../../components'

import caixaImg from '../../assets/caixa-reg.png'

import styles from './style'
import { DetailMovRouteProp } from '../../navigation/type'
import { financialMovementReportDetail, financialMovementReportListDoc } from '../../services/movimentacao'
import { showToast } from '../../utils/notification'
//eslint-disable-next-line
var RNFS = require('react-native-fs');

const adUnitId = Config.ADMOB_AD_REWARDS

const MovementDetail: React.FC = () => {
  const route = useRoute<DetailMovRouteProp>()
  const { dateMovement, type } = route.params
  const { uid } = useUser()
  const [isLoadingAd, setLoadingAd] = useState<boolean>(false)
  const [isVisibleAd, setVisibleAd] = useState<boolean>(true)
  const rewarded = RewardedAd.createForAdRequest(adUnitId)

  const getAccessPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        title: 'Permitir abrir arquivos do Livro Caixa',
        message: 'Permitir que o Livro Caixa tenha acesso a media do seu dispositivo?',
        buttonNegative: 'Recusar',
        buttonPositive: 'Permitir'
      })
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  const getDateMovement = useMemo((): { year: string; month?: string } => {
    if (type === 'year') return { year: String(dateMovement) }

    return { year: format(new Date(dateMovement), 'yyyy'), month: format(new Date(dateMovement), 'MMMM') }
  }, [dateMovement, type])

  const { data: financialMovementData, isLoading: isGettingMovementYear } = useQuery(
    ['movementGetter', uid, getDateMovement],
    () => financialMovementReportDetail({ uid, year: getDateMovement.year, month: getDateMovement.month })
  )

  const { data: dataExportedList, isLoading: isGettingReportList } = useQuery(
    ['reportListGetter', getDateMovement, uid],
    () => financialMovementReportListDoc({ uid, year: getDateMovement.year, month: getDateMovement.month }),
    {
      onError: (error: any) => {
        console.log(error)
      }
    }
  )

  const showVisibleAD = useCallback(() => {
    if (!rewarded.loaded) {
      setVisibleAd(true)
      return rewarded.load()
    }

    return rewarded.show()
  }, [rewarded])

  const exportReportList = useCallback(async () => {
    const isGrantedAccess = await getAccessPermission()

    if (!isGrantedAccess || !dataExportedList) {
      setLoadingAd(false)
      return showToast('erro ao gerar o arquivo')
    }

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(dataExportedList.data)
    XLSX.utils.book_append_sheet(wb, ws, 'Users')
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' })
    const filePath = RNFS.DownloadDirectoryPath + '/relatorio_livro_caixa' + new Date().getTime() + '.xlsx'

    try {
      await RNFS.writeFile(filePath, wbout, 'ascii')
      showToast('Está sendo criado o seu arquivo aguarde!')
      OpenFile.openDoc(
        [{ url: 'file:/' + filePath, fileName: 'relatorio_livro_caixa', fileType: 'xlsx', cache: false }],
        (error: any) =>
          error && showToast('Ocorreu um erro ao abrir seu arquivo de relatório, ele se encontra em downloads!')
      )
      setLoadingAd(false)
    } catch (error: any) {
      setLoadingAd(false)
      showToast('Ocorreu erro ao criar seu arquivo!')
    }
  }, [dataExportedList])

  const titleMov = useMemo(() => {
    if (type === 'year') return `Ano ${String(dateMovement)}`

    return `Mês ${format(new Date(dateMovement), `MMMM${'/'}yyyy`, { locale: pt })}`
  }, [dateMovement, type])

  useEffect(() => {
    const eventListener = rewarded.onAdEvent((type, error) => {
      if (isVisibleAd) {
        rewarded.show()
        setVisibleAd(false)
      }

      if (type === RewardedAdEventType.EARNED_REWARD) exportReportList()

      if (!!error) rewarded.show()
    })

    if (!rewarded.loaded) rewarded.load()

    return () => eventListener()
  }, [rewarded, isVisibleAd, setVisibleAd, dataExportedList])

  return (
    <ScrollView>
      <View>
        <AdsBanner />
        <Card containerStyle={styles.cardConfig}>
          <Card.Title>{titleMov}</Card.Title>
          <Card.Divider />
          {isGettingMovementYear ? (
            <Row width={1} height='100%' flex={1}>
              <ActivityIndicator size='large' color='#4db476' />
            </Row>
          ) : (
            <Fragment>
              <Row width={1} justifyContent='center' alignItems='center' mb={20}>
                <Image style={styles.imageCard} source={caixaImg} />
              </Row>

              <Text fontSize={20} fontWeight='bold' mb={10}>
                <Ionicons name='wallet-outline' size={20} /> Saldo:{' '}
                {numberToReal(Number(financialMovementData?.data?.cashTotal))}
              </Text>
              <Text fontSize={20} fontWeight='bold' mb={10}>
                <Ionicons name='wallet-outline' size={20} /> Gastos:{' '}
                {numberToReal(Number(financialMovementData?.data?.expenses))}
              </Text>
              <Text fontSize={20} mb={2}>
                Quantidades de Movimentações
              </Text>
              <Text fontSize={15}>
                <Ionicons name='arrow-up-circle-outline' size={15} color='green' /> Entradas:{' '}
                {financialMovementData?.data?.entries}
              </Text>
              <Text fontSize={15}>
                <Ionicons name='arrow-down-circle-outline' size={15} color='red' /> Saídas:{' '}
                {financialMovementData?.data?.outflows}
              </Text>
            </Fragment>
          )}
        </Card>

        <Column width={1} mt={10} justifyContent='center' alignItems='center'>
          <Column
            width={1}
            justifyContent='center'
            alignItems='center'
            backgroundColor='#fff'
            px={10}
            py={10}
            borderRadius={8}
          >
            <Row width={1}>
              <Text fontSize={12} fontWeight='bold'>
                - Gerar relatório em formato excel com as movimentações do {titleMov}
              </Text>
            </Row>
            <Row width={1}>
              <Text fontSize={12}>
                - Após assistir a propaganda seu arquivo estará disponível na pasta de downloads do dispositivo
              </Text>
            </Row>
            <Row width={1}>
              <Text fontSize={12}>
                - Caso não tenha recebido a mensagem que não está sendo gerado o seu arquivo, tente novamente!
              </Text>
            </Row>
          </Column>
          {isGettingReportList || isLoadingAd ? (
            <ActivityIndicator size='large' color='#4db476' />
          ) : (
            <Button
              height={50}
              borderRadius={8}
              border='1px solid'
              borderColor='#000'
              py={20}
              mt={10}
              alignItems='center'
              width={170}
              justifyContent='center'
              backgroundColor='#fdfdfd'
              onPress={() => showVisibleAD()}
            >
              <Icon name='file-excel' size={20} />
              <Text ml={10} fontSize={16} fontWeight='bold'>
                Gerar arquivo
              </Text>
            </Button>
          )}
        </Column>
      </View>
    </ScrollView>
  )
}

export default MovementDetail
