import {doGet, doPut} from 'utils/request'
import qs from 'qs'

import {str2base64} from 'utils/encry'

export function resetPassword({account, code ,password}) {
  password = str2base64(password)
  return doPut({
    url: '/user/pwd',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: qs.stringify({account, code, password})
  })
}

export function getCurrentUser(token) {
  return doGet({
    url: '/user/user'
  })
}