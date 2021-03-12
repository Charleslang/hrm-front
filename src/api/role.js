import {doGet, doPost, doDelete} from 'utils/request'
import qs from 'qs'

export function getAllRoles(pageInfo) {
  return doPost({
    url: '/role/roles',
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(pageInfo) // pageInfo 本身就是对象了， 所以不用 {}
  })
}

export function deleteRoleBatchByIds(ids = []) {
  return doDelete({
    url: '/role/batch/' + ids.join()
  })
}

export function deleteRoleById(id) {
  return doDelete({
    url: '/role/' + id
  })
}