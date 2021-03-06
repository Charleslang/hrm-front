import {doPost, doPut} from 'utils/request'
import qs from 'qs'
import {str2base64} from 'utils/encry'

export function regist({companyName, telephone, code, password}) {
  password = str2base64(password)
  return doPost({
    url: '/business/register',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: qs.stringify({unitName: companyName, telephone, code, password})
  })

}

export function updateUnitAndUser(unitBO) {
  unitBO.user.password = str2base64(unitBO.user.password)
  console.log(unitBO)
  return doPut({
    url: '/business/unitanduser',
    headers: {
      'Content-type': 'application/json;charset=UTF-8' // 由于后台使用的是 @RequestBody, 所以，这里需要使用 JSON
    },
    data: JSON.stringify(unitBO) // 由于后台使用的是 @RequestBody, 所以，这里需要使用 JSON
  })
}

export function addUnitAndUser(unitBO) {
  unitBO.user.password = str2base64(unitBO.user.password)
  console.log(unitBO)
  return doPost({
    url: '/business/unitanduser',
    headers: {
      'Content-type': 'application/json;charset=UTF-8' // 由于后台使用的是 @RequestBody, 所以，这里需要使用 JSON
    },
    data: JSON.stringify(unitBO) // 由于后台使用的是 @RequestBody, 所以，这里需要使用 JSON
  })
}