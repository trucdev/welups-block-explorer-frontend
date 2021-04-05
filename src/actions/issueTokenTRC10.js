import { notification } from 'antd';
import Asset from '../api/asset';
import { API_ADDR } from '../config/config';
import { loadTransactionDetails } from './transaction';

export const ISSUE_TRC10_NONE = 'ISSUE_TRC10_NONE';
export const ISSUE_TRC10_REQUESTING = 'ISSUE_TRC10_REQUESTING';
export const ISSUE_TRC10_SUCCESS = 'ISSUE_TRC10_SUCCESS';
export const ISSUE_TRC10_FAIL = 'ISSUE_TRC10_FAIL';

export function request() {
	return { type: ISSUE_TRC10_REQUESTING }
}
export function fail() {
	return { type: ISSUE_TRC10_FAIL }
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

export function issueTRC10(privKey,
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
		const res = await Asset.issueTRC10(
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
		);
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