import {doGet, doPost, doPut, doDelete} from 'utils/request'

import qs from 'qs'

export function getAllUnit(pageInfo) {
  // 此处的 data 要置为空，因为后台的 data 使用的是 List<?> 是只读的
  pageInfo.data = []
  return doPost({
    url: '/unit/unit',
    // params: {page, size, condition}
    headers: {
      'Content-type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(pageInfo) // pageInfo 本身就是对象了， 所以不用 {}
  })
}

export function deleteUnitById(id = 0) {
  return doDelete({
    url: '/unit/' + id
  })
}

export function deleteUnitByIds(ids = []) {
  return doDelete({
    url: '/unit/batch/' + ids.join()
  })
}

export function updateUnitStatus(id, status) {
  console.log(id, status)
  return doPut({
    url: '/unit/st',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: qs.stringify({id, status})
  })
}