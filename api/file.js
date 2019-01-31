import axios from '@@/api'

export const uploadFile = param => {
  return axios({
    method: 'post',
    url: '/file',
    data: param,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}