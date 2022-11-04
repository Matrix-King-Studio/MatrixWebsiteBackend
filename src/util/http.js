import axios from 'axios'
import { Message } from 'element-ui'
var instance = axios.create({ timeout: 1000 * 12 });
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.error(error)
)
instance.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      Message.closeAll()
      Message.error('网络请求错误！')
      return Promise.reject(res);
    }
  },
  error => {
    Message.closeAll()
    Message.error('网络请求错误！')
    const { response } = error;
    if (response) {
      return Promise.reject(response);
    } else {
      return Promise.reject(error);
    }
  }
);
export default instance
export const post = (url, data, func = (res) => res) => new Promise((resolve, reject) => {
  instance.post(url, data).then(res => {
    resolve(func(res))
  }).catch(error => {
    reject(error)
  })
})
