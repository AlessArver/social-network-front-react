import io from 'socket.io-client'
import Cookie from 'js-cookie'

import { cookieFields } from 'constants/index'

const token = Cookie.get(cookieFields.authToken)
export const socket = io('http://localhost:5000', {
  reconnection: true,
  auth: {
    token: token ? `Bearer ${token}` : ''
  }
})
