import {doGet} from 'utils/request'

export function login() {
  return doGet({
    url: '/user/login',
    data: {
      username: '123456',
      password: '123456'
    }
  })
}