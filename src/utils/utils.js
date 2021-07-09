import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import { decode58Check } from '@tronscan/client/src/utils/crypto'
import { byteArray2hexStr } from '@tronscan/client/src/utils/bytes'
import { toChecksumAddress } from 'ethereum-checksum-address'

TimeAgo.addLocale(en)

export function toDateTime(timestamp) {
  timestamp = timestamp <= Date.now() ? timestamp : timestamp / Math.pow(10, 6)
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(timestamp)
}

export function toDateTimeEndTime(timestamp) {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(timestamp)
}

export function toTimeAgo(timestamp) {
  timestamp = timestamp <= Date.now() ? timestamp : timestamp / Math.pow(10, 6)
  return <ReactTimeAgo date={timestamp} locale="en-US" />
}

export function decimalFormat(value, precision = 4) {
  return value
}

export function currencyFormat(value) {
  // return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return Intl.NumberFormat().format(value)
}

export function addressToHex(addr) {
  try {
    return toChecksumAddress('0x' + byteArray2hexStr(decode58Check(addr)).substring(2))
  } catch (e) {
    console.error(e)
    return null
  }
}
