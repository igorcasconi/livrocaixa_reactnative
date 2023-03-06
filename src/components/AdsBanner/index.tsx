import React from 'react'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'
import Config from 'react-native-config'
import { Column } from '../Column'

const adUnitId = Config.ADMOB_AD_BANNER ?? ''

interface AdsProps {
  margin?: number
}

const AdsBanner: React.FC<AdsProps> = ({ margin }) => {
  return (
    <Column marginLeft={margin}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.SMART_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
        //eslint-disable-next-line
        onAdLoaded={() => {}}
        onAdFailedToLoad={() => console.log('Failed ad')}
        //eslint-disable-next-line
        onAdOpened={() => {}}
        //eslint-disable-next-line
        onAdClosed={() => {}}
        //eslint-disable-next-line
        onAdLeftApplication={() => {}}
      />
    </Column>
  )
}

export default AdsBanner
