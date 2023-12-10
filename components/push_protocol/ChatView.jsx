import { ChatView, ChatUIProvider, darkChatTheme } from "@pushprotocol/uiweb";

import * as ethers from "ethers";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { useEffect, useState } from "react";

export default function ChatViewTest() {
	const [user, setUser] = useState();
	const [chatIds, setChatIds] = useState(null);
	const getPushUser = async () => {
		try {
			const { ethereum } = window;
			const pv = new ethers.providers.Web3Provider(ethereum);
			const signer = pv.getSigner();
			const ps = await PushAPI.initialize(signer, {
				env: CONSTANTS.ENV.STAGING,
			});
			setUser(ps);
			return ps;
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		const fetchChatHistory = async () => {
			try {
				const user = await getPushUser();
				const aliceChats = await user.chat.list("CHATS");

				setChatIds(aliceChats.map((item) => item.chatId));
				console.log(chatIds);
			} catch (e) {
				console.log(e);
			}
		};
		fetchChatHistory();
	}, []);

	return (
		<>
			{chatIds &&
				chatIds.map((item) => (
					<div
						style={{
							height: "75vh",
							width: "50vw",
							margin: "20px auto",
						}}
					>
						<ChatUIProvider
							theme={darkChatTheme}
							env={CONSTANTS.ENV.STAGING}
							key={item}
						>
							<ChatView
								chatId={item}
								limit={10}
								isConnected={true}
								verificationFailModalPosition={"relative"}
							/>
						</ChatUIProvider>
					</div>
				))}
		</>
	);
}
