// Import Push SDK & Ethers
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
export default async function SendNotifs() {
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

		// Send notification, provided userAlice has a channel
		const response = await userAlice.channel.send(["*"], {
			notification: {
				title: "You awesome notification",
				body: "from your amazing protocol",
			},
		});
		console.log(response);
	} catch (err) {
		console.log(err);
	}
}
