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
  return axios({
    url: 'group/' + data.id,
    data: data,
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

/**
 * 邀请小组
 */

export const AddGroutNumber = number => {
  return axios({
    url: 'group/user',
    number: number,
    method: 'post'
  })
}

/**
 * 按照邮箱或手机号查询用户
 */

export const searchMialOrPhone = mailOrPhone => {
  return axios({
    url: 'user/find',
    params: { mailOrPhone: mailOrPhone },
    method: 'get'
  })
}

/**
 * 邀请用户到小组
 */

export const addUserGroup = data => {
  return axios({
    method: 'post',
    url: 'group/user',
    data: data
  })
}
