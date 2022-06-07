import React from 'react'
import WebView from 'react-native-webview'

import { Column } from '../../components'

const linkWebView = 'https://docs.google.com/document/d/1dO2vdEKPyCLRrmqYEMMwTcZE69aKYh3tnB4LU9uSkVw/edit?usp=sharing'

const PolicyPrivacy: React.FC = () => {
  return (
    <Column width={1} height='100%'>
      <WebView source={{ uri: linkWebView }} style={{ marginTop: -60 }} />
    </Column>
  )
}

export default PolicyPrivacy
