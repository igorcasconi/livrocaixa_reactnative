import React from 'react'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'
import { View } from 'react-native'
<<<<<<< HEAD
import Config from 'react-native-config'

const adUnitId = Config.ADMOB_AD_BANNER
=======

const adUnitId = 'ca-app-pub-1207130538939906/1471737538'
>>>>>>> 000880b (fix(app): fixed app)

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
<<<<<<< HEAD
        //eslint-disable-next-line
        onAdLoaded={() => {}}
        onAdFailedToLoad={() => console.log('Failed ad')}
        //eslint-disable-next-line
        onAdOpened={() => {}}
        //eslint-disable-next-line
        onAdClosed={() => {}}
        //eslint-disable-next-line
        onAdLeftApplication={() => {}}
=======
        onAdLoaded={() => console.log('AdLoaded')}
        onAdFailedToLoad={() => console.log('AdLoaded')}
        onAdOpened={() => console.log('AdLoaded')}
        onAdClosed={() => console.log('AdLoaded')}
        onAdLeftApplication={() => console.log('Ad')}
>>>>>>> 000880b (fix(app): fixed app)
      />
    </View>
  )
}

export default AdsBanner
