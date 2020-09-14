import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import { View } from 'react-native';

const adUnitId = 'ca-app-pub-1207130538939906/1471737538';

interface AdsProps {
  margin?: number;
}

const AdsBanner: React.FC<AdsProps> = ({margin}) => {
  return (
      <View style={{marginLeft: margin}}>
        <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.SMART_BANNER}
        requestOptions={{
            requestNonPersonalizedAdsOnly: true,
        }}
        />
      </View>
  );
}

export default AdsBanner;