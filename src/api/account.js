import crypto from "@tronscan/client/src/utils/crypto";
import { generateAccount } from "@tronscan/client/src/utils/account";
export default class Account {
	static addressFromPrivateKey(privateKey) {
		return crypto.pkToAddress(privateKey);
	}
	static createAccount() {
		return generateAccount();
	}
}