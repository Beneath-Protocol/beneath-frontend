// Import Push SDK & Ethers
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
export default async function SubscribeChannel(pushChannelAdress) {
	// Creating a random signer from a wallet, ideally this is the wallet you will connect
	try {
		const { ethereum } = window;
		const pv = new ethers.providers.Web3Provider(ethereum);
		const signer = pv.getSigner();

		// Initialize wallet user
		// 'CONSTANTS.ENV.PROD' -> mainnet apps | 'CONSTANTS.ENV.STAGING' -> testnet apps
		const userAlice = await PushAPI.initialize(signer, {
			env: CONSTANTS.ENV.STAGING,
		});
		// Subscribe to push channel
		await userAlice.notification.subscribe(
			`eip155:11155111:${pushChannelAdress}` // channel address in CAIP format
		);
	} catch (err) {
		console.log(err);
	}
}
