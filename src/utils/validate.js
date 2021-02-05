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

export function isBlank(str) {
  return str === null || str.replace(/^\s*$/, '') === ''
}

export function validatePhone(str) {
  const regex = /^1([358]\d|4[01456789]|6[2567]|7[012345678]|9[012356789])\d{8}$/
  return regex.test(str)
}

export function validateEmail(str) {
  const regex = /^\w+([-\.]\w+)*@[A-z\d]+(\.[A-z\d]{2,6}){1,2}$/
  return regex.test(str)
}

export function validateNumber(number) {
  return !Number.isNaN(number)
}
