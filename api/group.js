import axios from '@@/api'

export const getGroupByUser = userId => {
  return axios({
    url: 'group/user/' + userId,
    method: 'get'
  })
}

export const createGroup = data => {
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

export const getUserByGroup = userId => {
  return axios({
    url: 'group/' + userId + '/user',
    method: 'get'
  })
}

/**
 * 修改分组信息
 */
export const updateGroupInfo = data => {
  console.log('groupInfo ========:', data)
  return axios({
    url: 'group/rename/' + data.id,
    params: { newName: data.name },
    method: 'put'
  })
}

/**
 * 获取小组详情
 */

export const getGroupInfo = info => {
  return axios({
    url: 'group/' + info,
    method: 'get'
  })
}
