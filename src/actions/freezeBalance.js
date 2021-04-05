import Asset from '../api/asset';
import { notification } from 'antd';
import { API_ADDR } from '../config/config';

export const FREEZE_BALANCE_NONE = 'FREEZE_BALANCE_NONE';
export const FREEZE_BALANCE_REQUESTING = 'FREEZE_BALANCE_REQUESTING';
export const FREEZE_BALANCE_SUCCESS = 'FREEZE_BALANCE_SUCCESS';
export const FREEZE_BALANCE_FAIL = 'FREEZE_BALANCE_FAIL';
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
export function fail() {
	return {
		type: FREEZE_BALANCE_FAIL,
	}
}


export function freezeBalance(privateKey, to, frozenBalance, resource) {
	return async (dispatch) => {
		dispatch(request())
		const res = await Asset.freeze(privateKey, to, frozenBalance, resource);
		if (!res.result) {
			dispatch(fail())
			notification.error({
				message: 'Failed!',
				description: `Transfer has failed`,
			});
			return
		}
		let flag = false;
		function checkTransactionStatus() {
			if (flag == true) {
				clearInterval(timer);
				return;
			}
			fetch(`${API_ADDR}/transactions/${res.tranID}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				mode: 'cors',
			}).then(res => res.json()).then((res) => {
				flag = true
				if (res.data.ret === "SUCESS") {
					dispatch(success(res.tranID));
				}
				else {
					dispatch(fail(res.tranID));
				}
			}).catch(err => {
				console.log(err);
				dispatch(fail(res.tranID));
			});
		}
		var timer = setInterval(checkTransactionStatus, 3000);
	}
}
