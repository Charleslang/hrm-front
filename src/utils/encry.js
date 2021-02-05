import {isBlank} from './validate'

export function str2base64(str) {
  if(isBlank(str)) {
    return ''
  }
  return btoa(str)
}

export function base642str(str) {
  if(isBlank(str)) {
    return ''
  }
  return atob(str)
}