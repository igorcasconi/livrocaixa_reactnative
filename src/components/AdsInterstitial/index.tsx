import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { InterstitialAd, AdEventType } from '@react-native-firebase/admob'
import Config from 'react-native-config'

const adUnitId = Config.ADMOB_AD_INTERSTICIAL

export const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true
})

export function interstitialShow() {
  interstitial.show()
}

const AdsInterstitial = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true)
      }

      if (type === AdEventType.CLOSED) {
        setLoaded(false)

        //reload ad
        interstitial.load()
      }
    })

    // Start loading the interstitial straight away
    interstitial.load()

    // Unsubscribe from events on unmount
    return () => {
      eventListener()
    }
  }, [])

  // No advert ready to show yet
  if (!loaded) {
    return null
  }

  return <View />
}

export default AdsInterstitial
