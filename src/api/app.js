import {doPost} from 'utils/request'
import qs from 'qs'
import {str2base64} from 'utils/encry'

export function regist({companyName, telephone, code, password}) {
  password = str2base64(password)
  return doPost({
    url: 'business/register',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: qs.stringify({unitName: companyName, telephone, code, password})
  })

}