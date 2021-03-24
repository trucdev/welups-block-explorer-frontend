import { notification } from 'antd';
import Asset from '../api/asset';
import * as wrapper from 'solc/wrapper';

export const DEPLOY_CONTRACT_NONE = 'DEPLOY_CONTRACT_NONE';
export const DEPLOY_CONTRACT_REQUESTING = 'DEPLOY_CONTRACT_REQUESTING';
export const DEPLOY_CONTRACT_SUCCESS = 'DEPLOY_CONTRACT_SUCCESS';
export const DEPLOY_CONTRACT_FAIL = 'DEPLOY_CONTRACT_FAIL';
export const COMPILE_CONTRACT_SUCCESS = 'COMPILE_CONTRACT_SUCCESS';
export const COMPILE_CONTRACT_FAIL = 'COMPILE_CONTRACT_FAIL';
export const UPLOAD_CONTRACT = 'UPLOAD_CONTRACT';

export function request() {
    return { type: DEPLOY_CONTRACT_REQUESTING }
}
export function fail() {
    return { type: DEPLOY_CONTRACT_FAIL }
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
export function successCompile(infos){
    return {
        type: COMPILE_CONTRACT_SUCCESS,
        payload: infos,
    }
}
export function upload(tex) {
    return { 
        type: UPLOAD_CONTRACT,
        payload: tex 
    }
}

export function deployContract(
    from,
    contractName,
    abi,
    condeStr,
    feeLimit,
    curPercent,
    oeLimit,
) {
    return async (dispatch) => {
        dispatch(request())
        const res = await Asset.deployContract(
            from,
            contractName,
            abi,
            condeStr,
            feeLimit,
            curPercent,
            oeLimit,
        );
        if (!res.result) {
            dispatch(fail())
            notification.error({
                message: 'Failed!',
                description: `Deployment has failed`,
            });
            return
        }
        dispatch(success(res.tranID));
    }
}
export function compileContract(contract) {
    return (dispatch) => {
        dispatch(request())
        try{
            const solc = wrapper(window.Module);
            var input = {
              language: 'Solidity',
              sources: {
                'contract': {
                  content: contract
                }
              },
              settings: {
                outputSelection: {
                  '*': {
                    '*': ["abi", "evm.bytecode.opcodes"]
                  }
                }
              }
            };
            var output = JSON.parse(solc.compile(JSON.stringify(input)));
            if(output&&output.errors){
                dispatch(failCompile());
                output.errors.forEach((value, index)=>{
                    notification.error({
                        message: 'Failed!',
                        description: value.message,
                    });
                })
                return;
            }
            dispatch(successCompile(output.contracts.contract));
            notification.success({
                message: 'Success!',
                description: "Compile successfully!",
            });
        }catch(e){
            dispatch(failCompile());
            notification.error({
                message: 'Failed!',
                description: e.toString(),
            });
        } 
    }
}