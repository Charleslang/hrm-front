import {doPost} from 'utils/request'
import qs from 'qs'

import {str2base64} from 'utils/encry'

export function loginWithPwd({account, password}) {
  password = str2base64(password)

  return doPost({
    url: '/login/ap',
    // 解决 POST 传参后台无法接收
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: qs.stringify({
      account,
      password
    })
  })
}

export function loginWithCode({account, code}) {
  return doPost({
    url: '/login/code',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: qs.stringify({
      account,
      code
    })
  })
}

export function logout() {
  return doPost({
    url: '/login/logout'
  })
}