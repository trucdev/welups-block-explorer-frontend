import { notification } from 'antd'
import Asset from '../api/asset'
import { API_ADDR } from '../config/config'
import { getCompiler } from '../utils/compiler'

export const DEPLOY_CONTRACT_NONE = 'DEPLOY_CONTRACT_NONE'
export const DEPLOY_CONTRACT_REQUESTING = 'DEPLOY_CONTRACT_REQUESTING'
export const DEPLOY_CONTRACT_SUCCESS = 'DEPLOY_CONTRACT_SUCCESS'
export const DEPLOY_CONTRACT_FAIL = 'DEPLOY_CONTRACT_FAIL'
export const COMPILE_CONTRACT_SUCCESS = 'COMPILE_CONTRACT_SUCCESS'
export const COMPILE_CONTRACT_FAIL = 'COMPILE_CONTRACT_FAIL'
export const UPLOAD_CONTRACT = 'UPLOAD_CONTRACT'
export const REMOVE_CONTRACT = 'REMOVE_CONTRACT'

export function request() {
  return { type: DEPLOY_CONTRACT_REQUESTING }
}
export function fail(tranID) {
  return {
    type: DEPLOY_CONTRACT_FAIL,
    payload: {
      tranID: tranID,
    },
  }
}

export function reset() {
  return { type: DEPLOY_CONTRACT_NONE }
}
export function success(tranID) {
  return {
    type: DEPLOY_CONTRACT_SUCCESS,
    payload: {
      tranID: tranID,
    },
  }
}
export function failCompile() {
  return { type: COMPILE_CONTRACT_FAIL }
}
export function successCompile(infos) {
  return {
    type: COMPILE_CONTRACT_SUCCESS,
    payload: infos,
  }
}
export function upload(tex) {
  return {
    type: UPLOAD_CONTRACT,
    payload: tex,
  }
}
export function remove(name) {
  return {
    type: REMOVE_CONTRACT,
    payload: name,
  }
}

export function deployContract(from, contractName, abi, condeStr, feeLimit, curPercent, oeLimit) {
  return async (dispatch) => {
    dispatch(request())
    const res1 = await Asset.deployContract(
      from,
      contractName,
      abi,
      condeStr,
      feeLimit,
      curPercent,
      oeLimit
    )
    if (!res1.result) {
      dispatch(fail())
      notification.error({
        message: 'Failed!',
        description: `Deployment has failed`,
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
          console.error(err)
        })
    }
    timer = setInterval(checkTransactionStatus, 3000)
  }
}
export function compileContract(contracts, version) {
  return async (dispatch) => {
    dispatch(request())
    try {
      const solc = await getCompiler(version)
      var input = {
        language: 'Solidity',
        sources: contracts,
        settings: {
          outputSelection: {
            '*': {
              '*': ['abi', 'evm.bytecode.opcodes'],
            },
          },
        },
      }
      var output = JSON.parse(solc.compile(JSON.stringify(input)))
      if (output && output.errors) {
        dispatch(failCompile())
        output.errors.forEach((value) => {
          notification.error({
            message: 'Failed!',
            description: value.message,
          })
        })
        return
      }
      dispatch(successCompile(output.contracts))
      notification.success({
        message: 'Success!',
        description: 'Compile successfully!',
      })
    } catch (e) {
      dispatch(failCompile())
      notification.error({
        message: 'Failed!',
        description: e.toString(),
      })
    }
  }
}
