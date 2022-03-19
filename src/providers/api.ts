import axios from 'axios'
import Config from 'react-native-config'

const provider = axios.create({
  baseURL: Config.API_URL
})

provider.interceptors.request.use(async ({ headers, ...config }) => {
  return {
    ...config,
    headers: {
      ...headers
    }
  }
})

provider.interceptors.response.use(
  response => response?.data,
  err => Promise.reject(err)
)

export default provider
