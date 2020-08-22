import React from 'react';
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import { View } from 'react-native';

const adUnitId = 'ca-app-pub-1207130538939906/1471737538';

const AdsBanner = () => {
  return (
    <View style={{}}>
        <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
            requestNonPersonalizedAdsOnly: true,
        }}
        />
    </View>
  );
}

export default AdsBanner;