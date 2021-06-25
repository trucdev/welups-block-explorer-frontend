import { API_ADDR } from '../config/config'
import fetch from 'cross-fetch'
import Contract from '../api/contract'
import { notification } from 'antd'
import * as ethers from 'ethers'

export const CONTRACT_DEFAULT = 'CONTRACT_DEFAULT'
export const CONTRACT_LOAD = 'CONTRACT_LOAD'

export function defaultContract() {
  return {
    type: CONTRACT_DEFAULT,
  }
}

export function loadContract(contract) {
  return {
    type: CONTRACT_LOAD,
    contract: contract,
  }
}

export function loadContractApi(addr) {
  return (dispatch) => {
    dispatch(defaultContract())
    fetch(`${API_ADDR}/contracts/${addr}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((res) => {
        var _res = {
          contract_address: res.data.addr,
          name: res.data.name,
          balance: res.data.balance ? res.data.balance : 0,
          transactions: 0,
          token_tracker_name: null,
          token_tracker_address: 0x0000000000000000000000000000000000000000,
          creation_transaction_address: '0x0000000000000000000000000000000000000000',
          creator_address: res.data.owner_addr,
          creation_time: Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(0),
          available_energy: res.data.origin_energy_limit,
          energy_ratio_contract: 100 - res.data.percentage_ratio,
          energy_ratio_user: res.data.percentage_ratio,
          initial_asset: 0,
          abi: res.data.abi.entrys,
          bytecode: res.data.byte_code,
          assets: res.data.assets,
        }
        dispatch(loadContract(_res))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const PRI_KEY_UPDATE = 'PRI_KEY_UPDATE'

export function updatePriKey(key) {
  return {
    type: PRI_KEY_UPDATE,
    payload: key,
  }
}

export const RESULT_DEFAULT = 'RESULT_DEFAULT'
export const RESULT_UPDATE = 'RESULT_UPDATE'
export const CONTRACT_READ = 'CONTRACT_READ'
export const CONTRACT_WRITE = 'CONTRACT_WRITE'

export function defaultResult() {
  return {
    type: RESULT_DEFAULT,
  }
}

export function updateResult(res) {
  return {
    type: RESULT_UPDATE,
    payload: res,
  }
}

export function triggerSmartContract(
  no,
  privateKey,
  address,
  method,
  jsonString,
  outputs,
  type,
  t_amount = 0
) {
  return async (dispatch) => {
    dispatch(defaultResult())
    var res = await Contract.triggerFunction(
      privateKey,
      address,
      method,
      jsonString,
      type,
      t_amount
    )
    if (res === false) {
      notification.error({
        message: 'Failed!',
        description: `Trigger has failed`,
      })
      return
    }
    //Success
    if (res.tran_id) {
    } else {
      const convertOutput = outputs.map((output) => output.type)
      res.data = await Promise.all(
        res.data.contract_results.map((res, index) => {
          return decodeParams([convertOutput[index]], res, true)
        })
      )
    }
    res.no = no
    res.type = type
    dispatch(updateResult(res))
  }
}

function convert(value, type) {
  if (type.includes('uint')) {
    value = parseInt(value)
  } else if (type === 'address') {
    value = window.tronWeb.address.fromHex(value)
  } else if (type === 'bool') {
    value = value.toString()
  } else if (type === 'string') {
    value = window.tronWeb.toUtf8(value)
  }
  return value
}
function convertResult(result, type) {
  var res = []
  if (type.length === 1) {
    res.push(convert(result[0], type[0].type))
  } else {
    type.map((typ, index) => {
      res.push(convert(result[index], typ.type))
      return null
    })
  }
  return res
}

const AbiCoder = ethers.utils.AbiCoder
const ADDRESS_PREFIX = 'W'

//types:Parameter type list, if the function has multiple return values, the order of the types in the list should conform to the defined order
//output: Data before decoding
//ignoreMethodHash：Decode the function return value, fill falseMethodHash with false, if decode the data field in the gettransactionbyid result, fill ignoreMethodHash with true

async function decodeParams(types, output, ignoreMethodHash) {
  if (!output || typeof output === 'boolean') {
    ignoreMethodHash = output
    output = types
  }

  if (ignoreMethodHash && output.replace(/^0x/, '').length % 64 === 8)
    output = '0x' + output.replace(/^0x/, '').substring(8)

  const abiCoder = new AbiCoder()

  if (output.replace(/^0x/, '').length % 64)
    throw new Error('The encoded string is not valid. Its length must be a multiple of 64.')
  return abiCoder.decode(types, output).reduce((obj, arg, index) => {
    if (types[index] == 'address') arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase()
    obj.push(arg)
    return obj
  }, [])
}
