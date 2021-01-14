import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  imageLogo: {
    width: 190,
    height: 190
  },
  viewImageLogo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInit: {
    fontSize: 25,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  viewButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInfo: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  viewInfoVersion: {
    flexDirection: 'row',
    marginTop: 10
  },
  viewInfo: {
    marginTop: 20
  },
  textInfoLink: {
    fontSize: 20,
    color: '#1092e6',
    textDecorationLine: 'underline'
  }
})

export default styles
