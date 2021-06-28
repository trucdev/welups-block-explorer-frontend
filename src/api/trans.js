import { fetch } from 'cross-fetch'
import { API_ADDR } from '../config/config'
export default class Transaction {
  static async broadcast(tranHex, tranRawHex, signature) {
    let body = {
      tran_hex: tranHex,
      tran_raw_hex: tranRawHex,
      signature: signature,
    }
    const res = await fetch(`${API_ADDR}/trans/broadcast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(body),
    })
    if (!res.ok) return false
    const jsonBody = await res.json()
    return jsonBody.status === 'success'
  }
}
