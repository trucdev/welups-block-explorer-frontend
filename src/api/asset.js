import { fetch } from 'cross-fetch';
import transaction from './trans';
import { API_ADDR } from '../config/config';
import bytes from "@tronscan/client/src/utils/bytes";
import code from "@tronscan/client/src/lib/code";
import crypto from "@tronscan/client/src/utils/crypto";
import account from './account';
export default class Asset {
	static async transfer(privateKey, to, amount, assetName = 'ACG') {
		try {
			const from = account.addressFromPrivateKey(privateKey);
			const res = await fetch(`${API_ADDR}/assets/transfer`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
				body: JSON.stringify({
					"from": from,
					"to": to,
					"amount": amount,
					"asset_name": assetName
				})
			});
			const result = await res.json();
			if (!res.ok || result.status !== "success")
				return { tranID: '', result: false };

			const signature = bytes.byteArray2hexStr(new Uint8Array(crypto.signBytes(privateKey, code.hexStr2byteArray(result.data.tran_raw_hex))));
			const status = await transaction.broadcast(result.data.tran_hex, result.data.tran_raw_hex, signature);
			return { tranID: result.data.tran_id, result: status }
		} catch (e) {
			console.log(e);
			return { tranID: '', result: false };
		}
	}
	static async issueTRC10(privateKey,
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
		frozenSupply) {
		try {
			const from = account.addressFromPrivateKey(privateKey);
			const res = await fetch(`${API_ADDR}/assets/issue`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				mode: 'cors',
				body: JSON.stringify({
					from: from,
					name: name,
					description: desc,
					abbr: abbr,
					url_str: url,
					precision: precision,
					total_supply: totalSupply,
					start_time: startTime,
					end_time: endTime,
					free_asset_net_limit: freeAssetNetLimit,
					public_free_asset_net_limit: publicFreeAssetNetLimit,
					trx_num: trxNum,
					ico_num: icoNum,
					vote_score: voteScore,
					frozen_supply: frozenSupply
				})
			});

			const result = await res.json();
			if (!res.ok || result.status !== "success")
				return { tranID: '', result: false };

			const signature = bytes.byteArray2hexStr(new Uint8Array(crypto.signBytes(privateKey, code.hexStr2byteArray(result.data.tran_raw_hex))));
			const status = await transaction.broadcast(result.data.tran_hex, result.data.tran_raw_hex, signature);
			return { tranID: result.data.tran_id, result: status }
		} catch (e) {
			console.log(e);
			return { tranID: '', result: false };
		}
	};
	static async deployContract(
		privateKey,
		contractName,
		abi,
		codeStr,
		feeLimit,
		curPercent,
		oeLimit) {
		try {
			const from = account.addressFromPrivateKey(privateKey);
			const res = await fetch(`${API_ADDR}/contracts/deploy`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				mode: 'cors',
				body: JSON.stringify({
					from: from,
					contract_name: contractName,
					abi: abi,
					code_str: codeStr,
					fee_limit: feeLimit,
					cur_percent: curPercent,
					oe_limit: oeLimit,
				})
			});

			const result = await res.json();
			if (!res.ok || result.status !== "success")
				return { tranID: '', result: false };

			const signature = bytes.byteArray2hexStr(new Uint8Array(crypto.signBytes(privateKey, code.hexStr2byteArray(result.data.tran_raw_hex))));
			const status = await transaction.broadcast(result.data.tran_hex, result.data.tran_raw_hex, signature);
			return { tranID: result.data.tran_id, result: status }
		} catch (e) {
			console.log(e);
			return { tranID: '', result: false };
		}
	}
}