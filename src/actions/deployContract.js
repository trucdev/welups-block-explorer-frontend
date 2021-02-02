import { notification } from 'antd';
import Asset from '../api/asset';

export const DEPLOY_CONTRACT_NONE = 'DEPLOY_CONTRACT_NONE';
export const DEPLOY_CONTRACT_REQUESTING = 'DEPLOY_CONTRACT_REQUESTING';
export const DEPLOY_CONTRACT_SUCCESS = 'DEPLOY_CONTRACT_SUCCESS';
export const DEPLOY_CONTRACT_FAIL = 'DEPLOY_CONTRACT_FAIL';

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