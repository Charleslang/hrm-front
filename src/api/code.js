import {doPost} from 'utils/request'
import qs from 'qs'

export function sendCode(account, register) {
  return doPost({
    url: '/business/code',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: qs.stringify({account, register}) 
  })
}