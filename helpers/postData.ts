import axios from 'axios'

import { Server } from '@models'

export async function postData(payload: any ) {
  return axios.post(`${Server.HOST}:${Server.PORT}`, payload)
}
