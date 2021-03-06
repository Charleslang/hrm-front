/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 是否为空串, 匹配 '','    ',null, undefined
 * @param {*} str 
 */
export function isBlank(str) {
  return !str || str.replace(/^\s*$/, '') === ''
}

export function isNotBlank(str) {
  return !isBlank(str)
}

/**
 * 验证手机号
 * @param {*} str 
 */
export function validatePhone(str) {
  const regex = /^1([358]\d|4[01456789]|6[2567]|7[012345678]|9[012356789])\d{8}$/
  return regex.test(str)
}

/**
 * 验证邮箱
 * @param {*} str 
 */
export function validateEmail(str) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(str)
}

/**
 * 是否是数字
 * @param {*} number 
 */
export function validateNumber(number) {
  return !Number.isNaN(number)
}

/**
 * 是否全是数字
 * @param {*} str 
 */
export function isAllNumber(str) {
  const regex = /^\d+$/
  return regex.test(str)
}

/**
 * 是否全是字母
 * @param {*} str 
 */
export function isAllAlphabet(str) {
  const regex = /^[A-Za-z]+$/
  return regex.test(str)
}

/**
 * 6-20位, 必须包含大小写字母
 * @param {*} str 
 */
export function validatePassword(str) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{6,20}$/
  return regex.test(str)
}

/**
 * 6-20位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 * @param {*} str 
 */
export function validateStrictPwd(str) {
  const regex = /^\S*(?=\S{6,20})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
  return regex.test(str)
}

/**
 * 字符长度提示
 * @param {*} prefix 前缀提示
 * @param {*} min 
 * @param {*} max 
 */
export function validateLength(prefix = '', min = 0, max = 0) {
  if (min <= 0) {
    return ''
  }
  if (max <= 0) {
    return prefix + `长度应该为${min}位`
  }
  return prefix + `长度应该为${min}-${max}位`
}

export function validateUnitName(str) {
  if (isNotBlank(str) && str.length >= 2) {
    return true
  }
  return false
}

export function validatePostcode(str) {
  const regex = /^[0-9]{6}$/
  return regex.test(str)
}

export function validateURL(str) {
  const regex = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
  return regex.test(str)
}
