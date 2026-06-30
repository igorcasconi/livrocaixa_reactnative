import { useRef } from 'react'
import Config from 'react-native-config'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'

const adUnitId = __DEV__ ? TestIds.BANNER : Config.REACT_NATIVE_ADMOB_BANNER_KEY
const AdsBanner = () => {
  const bannerRef = useRef<BannerAd>(null)

  console.log(adUnitId, TestIds.BANNER, Config.REACT_NATIVE_ADMOB_BANNER_KEY)

  return (
    <BannerAd
      ref={bannerRef}
      unitId={TestIds.BANNER!}
      size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true
      }}
    />
  )
}

export default AdsBanner
