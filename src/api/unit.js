import {doGet} from 'utils/request'

export function getAllUnit(page = 1, size = 10) {
  return doGet({
    url: '/unit/unit',
    params: {page, size}
  })
}