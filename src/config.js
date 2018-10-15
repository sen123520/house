// console.log('env', process.env)
const { API_PORT = 'http://10.0.33.14:58080' } = process.env
const { API_PUB = 'http://10.0.33.14:50045' } = process.env

const Config = {
  SERVER: API_PORT,
  API_RESTFUL: API_PORT,
  PUBLISH:API_PORT
}
export default Config;
