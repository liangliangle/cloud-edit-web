import axios from '@@/api'

export const getEditByGroup = ({ groupId }) => {
  return axios({
    url: 'edit/group/' + groupId,
    method: 'get'
  })
}
export const createEdit = data => {
  return axios({
    url: 'edit',
    data: data,
    method: 'post'
  })
}

export const getEditById = data => {
  return axios({
    url: 'edit/' + data.id,
    method: 'get'
  })
}

export const update = data => {
  return axios({
    url: 'edit/' + data.id,
    params: { newName: data.name },
    method: 'put'
  })
}
