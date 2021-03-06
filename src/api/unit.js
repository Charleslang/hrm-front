import {doGet, doPut, doDelete} from 'utils/request'

import qs from 'qs'

export function getAllUnit(page = 1, size = 10) {
  return doGet({
    url: '/unit/unit',
    params: {page, size}
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