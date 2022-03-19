import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Image, ScrollView, PermissionsAndroid } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { useRoute } from '@react-navigation/native'
import XLSX from 'xlsx'
import OpenFile from 'react-native-doc-viewer'
import { RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob'
import Config from 'react-native-config'

import { formatCurrency } from '../../utils/formatters'
import AdsBanner from '../../components/AdsBanner'
import { useUser } from '../../context/AuthContext'
import { Column, Row, Text, Button } from '../../components'

import caixaImg from '../../assets/caixa-reg.png'

import styles from './style'
import { DetailMovRouteProp } from '../../navigation/type'
import { useRealm } from '../../context/RealmContext'
import { showToast } from '../../utils/notification'
import styled from 'styled-components'
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
  const { getReportList, getDataReportListForExcel } = useRealm()
  const isTypeYear = type === 'year'
  const dataReportMovement = useMemo(() => getReportList(uid, !isTypeYear), [getReportList, uid, isTypeYear])
  const dataReportDetail = dataReportMovement?.find(movement => String(movement.date) === String(dateMovement))

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

  const getDateMovement = useMemo((): { year: number; month?: string } => {
    const selectedYear = new Date(dateMovement).getFullYear()
    const formattedMonth = format(new Date(dateMovement), 'MMMM', { locale: pt })
    return { year: selectedYear, month: formattedMonth }
  }, [dateMovement])

  const showVisibleAD = useCallback(() => {
    if (!rewarded.loaded) {
      setVisibleAd(true)
      return rewarded.load()
    }

    return rewarded.show()
  }, [rewarded])

  const exportReportList = useCallback(async () => {
    const isGrantedAccess = await getAccessPermission()
    const dataExported = getDataReportListForExcel(String(dateMovement), uid, !isTypeYear)
    setLoadingAd(true)

    if (!isGrantedAccess || !dataExported) {
      setLoadingAd(false)
      return showToast('erro ao gerar o arquivo')
    }

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(dataExported)
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
  }, [dateMovement, uid, isTypeYear])

  const titleMov = useMemo(() => {
    if (isTypeYear) return `Ano ${getDateMovement.year}`

    return `Mês ${getDateMovement.month}/${getDateMovement.year}`
  }, [dateMovement, isTypeYear])

  useEffect(() => {
    const eventListener = rewarded.onAdEvent((type, error) => {
      if (isVisibleAd) setVisibleAd(false)
      if (type === RewardedAdEventType.EARNED_REWARD) exportReportList()
      if (!!error) rewarded.show()
    })

    if (!rewarded.loaded) rewarded.load()

    return () => eventListener()
  }, [rewarded, isVisibleAd, setVisibleAd])

  if (!dataReportDetail) return <Column flex={1} width={1} />

  return (
    <ScrollView>
      <AdsBanner />
      <Column width={1} height='100%' flex={1} px={20}>
        <StyledCard width={1} height={400} backgroundColor='white' p={20} borderRadius={8} mt={20}>
          <Row
            width={1}
            height={30}
            pb={10}
            borderBottomWidth={0.2}
            borderBottomColor='#c1c1c1'
            justifyContent='center'
            alignItems='center'
            mb={20}
          >
            <Text fontSize={16} color='#777777' fontWeight='bold'>
              {titleMov}
            </Text>
          </Row>
          <Fragment>
            <Row width={1} justifyContent='center' alignItems='center' mb={20}>
              <Image style={styles.imageCard} source={caixaImg} />
            </Row>

            <Text fontSize={20} fontWeight='bold' mb={10}>
              <Ionicons name='wallet-outline' size={20} color='green' /> Saldo:{' '}
              {formatCurrency(dataReportDetail?.balanceEntries - dataReportDetail?.balanceOutflows)}
            </Text>
            <Text fontSize={20} fontWeight='bold' mb={10}>
              <Ionicons name='wallet-outline' size={20} color='red' /> Gastos:{' '}
              {formatCurrency(dataReportDetail.balanceOutflows)}
            </Text>
            <Text fontSize={20} mb={2}>
              Quantidades de Movimentações
            </Text>
            <Text fontSize={15}>
              <Ionicons name='arrow-up-circle-outline' size={15} color='green' /> Entradas: {dataReportDetail.entries}
            </Text>
            <Text fontSize={15}>
              <Ionicons name='arrow-down-circle-outline' size={15} color='red' /> Saídas: {dataReportDetail.outflows}
            </Text>
          </Fragment>
        </StyledCard>

        <Column width={1} mt={10} justifyContent='center' alignItems='center'>
          <StyledCard
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
          </StyledCard>

          <Button
            height={50}
            borderRadius={8}
            border='1px solid'
            borderColor='#000'
            py={20}
            mt={10}
            mb={30}
            alignItems='center'
            width={170}
            justifyContent='center'
            backgroundColor='#fdfdfd'
            onPress={() => showVisibleAD()}
          >
            {!isLoadingAd && (
              <Fragment>
                <Icon name='file-excel' size={20} />
                <Text ml={10} fontSize={16} fontWeight='bold'>
                  Gerar arquivo
                </Text>
              </Fragment>
            )}
          </Button>
        </Column>
      </Column>
    </ScrollView>
  )
}

const StyledCard = styled(Column)`
  elevation: 2;
`

export default MovementDetail
