import Asset from '../api/asset';
import { notification } from 'antd';

export const TRANSFER_NONE = 'TRANSFER_NONE';
export const TRANSFER_REQUESTING = 'TRANSFER_REQUESTING';
export const TRANSFER_SUCCESS = 'TRANSFER_SUCCESS';
export const TRANSFER_FAIL = 'TRANSFER_FAIL';
export function reset(){
	return {
		type: TRANSFER_NONE,
	}
}
export function request() {
	return {
		type: TRANSFER_REQUESTING,
	}
}
export function success(tranID) {
	return {
		type: TRANSFER_SUCCESS,
		payload: {
			tranID:tranID,
		},
	}
}
export function fail() {
	return {
		type: TRANSFER_FAIL,
	}
}


export function transferAsset(fromPrivKey, to, amount, assetName) {
	return async (dispatch)=> {
		dispatch(request())
		const res = await Asset.transfer(fromPrivKey, to, amount, assetName);
		if (!res.result){
			dispatch(fail())
			notification.error({
				message: 'Failed!',
				description: `Transfer has failed`,
			});
			return
		}
		//Success
		dispatch(success(res.tranID));
	}
}
