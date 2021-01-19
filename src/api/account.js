import crypto from "@tronscan/client/src/utils/crypto";
export default class Account {
	static addressFromPrivateKey(privateKey) {
		return crypto.pkToAddress(privateKey);
	}
}