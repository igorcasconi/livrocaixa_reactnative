import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  cardConfig: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    backgroundColor: '#4db476'
  },
  viewConfig: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCard: {
    fontWeight: 'bold',
    fontSize: 16
  },
  textCardInfo: {
    position: 'absolute',
    left: 2,
    bottom: 0,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff'
  }
})

export default styles
