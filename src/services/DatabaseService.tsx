import axios from 'axios'
import Config from 'react-native-config'

const DatabaseService = axios.create({ baseURL: `${Config.API_URL}` })

DatabaseService.defaults.headers.common['X-My-Custom-Header'] = 'Header-Value'
<<<<<<< HEAD
DatabaseService.defaults.headers.common['Accept'] = '*/*'
=======
>>>>>>> 000880b (fix(app): fixed app)

export default DatabaseService
