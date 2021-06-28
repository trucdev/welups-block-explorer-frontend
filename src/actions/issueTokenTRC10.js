import { notification } from 'antd'
import Asset from '../api/asset'
import { API_ADDR } from '../config/config'
import { loadTransactionDetails } from './transaction'

export const ISSUE_TRC10_NONE = 'ISSUE_TRC10_NONE'
export const ISSUE_TRC10_REQUESTING = 'ISSUE_TRC10_REQUESTING'
export const ISSUE_TRC10_SUCCESS = 'ISSUE_TRC10_SUCCESS'
export const ISSUE_TRC10_FAIL = 'ISSUE_TRC10_FAIL'

export function request() {
  return { type: ISSUE_TRC10_REQUESTING }
}
export function fail(tranID) {
  return {
    type: ISSUE_TRC10_FAIL,
    payload: {
      tranID: tranID,
    },
  }
}
export function reset() {
  return { type: ISSUE_TRC10_NONE }
}
export function success(tranID) {
  return {
    type: ISSUE_TRC10_SUCCESS,
    payload: {
      tranID: tranID,
    },
  }
}

export function issueTRC10(
  privKey,
  name,
  desc,
  abbr,
  url,
  precision,
  totalSupply,
  startTime,
  endTime,
  freeAssetNetLimit,
  publicFreeAssetNetLimit,
  trxNum,
  icoNum,
  voteScore,
  frozenSupply
) {
  return async (dispatch) => {
    //dispatch request
    dispatch(request())
    const res1 = await Asset.issueTRC10(
      privKey,
      name,
      desc,
      abbr,
      url,
      precision,
      totalSupply,
      startTime,
      endTime,
      freeAssetNetLimit,
      publicFreeAssetNetLimit,
      trxNum,
      icoNum,
      voteScore,
      frozenSupply
    )
    if (!res1.result) {
      dispatch(fail())
      notification.error({
        message: 'Failed!',
        description: `Transfer has failed`,
      })
      return
    }
    let flag = false
    let timer
    function checkTransactionStatus() {
      if (flag) {
        clearInterval(timer)
        return
      }
      fetch(`${API_ADDR}/transactions/${res1.tranID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status && res.status === 'success') {
            if (res.data.ret && res.data.ret === 'SUCESS') {
              dispatch(success(res1.tranID))
            } else {
              dispatch(fail(res1.tranID))
            }
            flag = true
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    timer = setInterval(checkTransactionStatus, 6000)
  }
}
