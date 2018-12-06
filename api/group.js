import axios from '@@/api'

export const getGroupByUser = userId => {
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

export const getGroup = groupId => {
  return axios({
    url: 'group/' + groupId,
    method: 'get'
  })
}
