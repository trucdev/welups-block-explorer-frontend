import Asset from '../api/asset'
import { notification } from 'antd'
import { API_ADDR } from '../config/config'

export const FREEZE_BALANCE_NONE = 'FREEZE_BALANCE_NONE'
export const FREEZE_BALANCE_REQUESTING = 'FREEZE_BALANCE_REQUESTING'
export const FREEZE_BALANCE_SUCCESS = 'FREEZE_BALANCE_SUCCESS'
export const FREEZE_BALANCE_FAIL = 'FREEZE_BALANCE_FAIL'
export function reset() {
  return {
    type: FREEZE_BALANCE_NONE,
  }
}
export function request() {
  return {
    type: FREEZE_BALANCE_REQUESTING,
  }
}
export function success(tranID) {
  return {
    type: FREEZE_BALANCE_SUCCESS,
    payload: {
      tranID: tranID,
    },
  }
}
export function fail(tranID) {
  return {
    type: FREEZE_BALANCE_FAIL,
    payload: {
      tranID: tranID,
    },
  }
}

export function freezeBalance(privateKey, to, frozenBalance, resource) {
  return async (dispatch) => {
    dispatch(request())
    const res1 = await Asset.freeze(privateKey, to, frozenBalance, resource)
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
