import React from 'react'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'
import { View } from 'react-native'
import Config from 'react-native-config'

const adUnitId = Config.ADMOB_AD_BANNER

interface AdsProps {
  margin?: number
}

const AdsBanner: React.FC<AdsProps> = ({ margin }) => {
  return (
    <View style={{ marginLeft: margin }}>
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
    </View>
  )
}

export default AdsBanner
