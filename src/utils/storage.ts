import AsyncStorage from '@react-native-async-storage/async-storage'

export const setStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error: any) {
    console.log(error)
  }
}

export const getValueStorage = async (key: string) => {
  try {
    const storageValue = await AsyncStorage.getItem(key)
    return storageValue
  } catch (error: any) {
    console.log(error)
  }
}

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear()
    console.log('success')
  } catch (error: any) {
    console.log(error)
  }
}
