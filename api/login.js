import axios from '@@/api'


export const login = token => {
  return axios({
    method: 'get',
    url: '/user/login',
    headers: {
      'Authorization': token
    },
  })
}
