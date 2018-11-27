import axios from '@@/api'

export const getGroup = userId => {
  return axios({
    url: 'group/user/' + userId,
    method: 'get'
  })
}

export const createGroup = (data) => {
  return axios({
    url: 'group/',
    data: data,
    method: 'post'
  })
}
