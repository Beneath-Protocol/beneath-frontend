// Import Push SDK & Ethers
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
export default async function ChannelCreation() {
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
		console.log(userAlice);
		// userAlice.channel.create({options})
		const response = await userAlice.channel.create({
			name: "Test Channel 589537",
			description: "Test Description jsdklflfkdsj",
			icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC",
			url: "https://push.org",
		});
		console.log(response);
	} catch (err) {
		console.log(err);
	}
}
