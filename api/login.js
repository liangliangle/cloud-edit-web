import axios from '@@/api'

export const login = token => {
  return axios({
    method: 'get',
    url: '/user/login',
    headers: {
      Authorization: token
    }
  })
}

/**
 * 注册
 * @param {*} data
 */
export const Reg = data => {
  console.log('data+++++++++++++++ :', data);
  return axios({
    method: 'post',
    url: '/user',
    data: data
  })
}

/**
 * 修改密码
 * @param {*} data
 */
export const UpdatePassword = data => {
  return axios({
    method: 'put',
    url: '/user/password',
    data: data
  })
}
