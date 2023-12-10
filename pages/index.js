import Head from "next/head";
import {
	Text,
	Link,
	Navbar,
	Spacer,
	Divider,
	Button,
	Input,
	Table,
	Card,
	Checkbox,
	Modal,
	Loading,
	Textarea,
} from "@nextui-org/react";
import { useMessage } from "../components/context/contextprovider";
import Directchat from "../components/directchat/directchat";
import Groupchat from "../components/groupchat/groupchat";
import Spaces from "../components/spaces/Spaces";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";

function cookie_get(key) {
	try {
		var cookies = {};
		for (var x in document.cookie.split("; ")) {
			var raw_data = document.cookie.split("; ")[x].split("=");
			cookies[raw_data[0]] = raw_data[1];
		}
		if (key in cookies) {
			return cookies[key];
		}
		return "";
	} catch {
		return "";
	}
}

function cookie_set(key, val) {
	try {
		document.cookie = `${key}=${val};expires=Thu, 01 Jan 2049 00:00:00 UTC`;
	} catch {}
}

function toDateTime(secs) {
	var t = new Date(1970, 0, 1);
	t.setSeconds(secs);
	return t;
}

function Mail(name, subject, date, content, setOpenContent, setContent) {
	return (
		<>
			<Card
				blur="true"
				isPressable
				iscompact="true"
				isHoverable
				isblurred="true"
				variant="bordered"
				css={{ padding: "$2", bgBlur: "#0f111466" }}
				onClick={() => {
					setOpenContent(true);
					setContent({
						from: name,
						content: content,
						web: "",
						to: "",
						date: date,
					});
				}}
			>
				<Card.Header>
					<div className="wrapper" style={{ width: "100%" }}>
						<Checkbox color="error"></Checkbox>
						<Spacer></Spacer>
						<div style={{ width: "20%" }}>
							<h4 style={{ margin: "0 0 0 0" }}>{name}</h4>
						</div>
						<Spacer></Spacer>
						<Spacer></Spacer>
						<div style={{ width: "20%" }}>
							<h5 style={{ margin: "0 0 0 0" }}>{subject}</h5>
						</div>
						<div style={{ width: "40%" }}>
							<Text h6 css={{ margin: "0 0 0 0" }} color="$accents8">
								{content.slice(0, 50) +
									(content.slice(0, 50) == content ? "" : "...")}
							</Text>
						</div>
						<div style={{ width: "10%" }}>
							<h5 style={{ margin: "0 0 0 0" }}>
								{date == 0 ? "-" : toDateTime(date).toString().split(" ")[4]}
							</h5>
						</div>
					</div>
				</Card.Header>
			</Card>
			<Spacer y={0.7}></Spacer>
		</>
	);
}

function option_button(option, image) {
	const { sidebarstep, setSidebarStep } = useMessage();
	return (
		<>
			<div className="wrapper" style={{ float: "left" }}>
				<img src={image}></img>
				<Spacer></Spacer>
				<Link
					onClick={() => {
						setSidebarStep(option);
					}}
					color={"text"}
				>
					<Text css={{ margin: "0 0 0 0" }} h5 color="$accents8">
						{option}
					</Text>
				</Link>
			</div>
			<br></br>
			<br></br>
		</>
	);
}

function chain(
	name,
	image,
	setSelect,
	current_selection,
	form_details,
	setForm_Details,
	set_ready_to_sign_up
) {
	return (
		<>
			<a
				onClick={() => {
					cookie_set("chain", name);
					if (
						form_details.chain != "" &&
						form_details.domain != "" &&
						form_details.password != "" &&
						form_details.username != ""
					) {
						set_ready_to_sign_up(true);
					}
					setTimeout(() => {
						setSelect(name);
					}, 50);
				}}
			>
				<div className="wrapper">
					<div>
						<div
							className="wrapper"
							style={{
								border: "1px solid black",
								borderRadius: "25%",
								margin: "2vh",
								padding: "1vh",
								width: "120px",
								backgroundColor: current_selection == name ? "#ddd" : "",
							}}
						>
							<img src={image} height={"100px"}></img>
						</div>
						<div className="wrapper vertical">
							<Text className="vertical" h4>
								{name}
							</Text>
						</div>
					</div>
				</div>
			</a>
		</>
	);
}

export default function Home() {
	const { sidebarstep, setSidebarStep } = useMessage();
	const { isConnected, address } = useAccount();
	const [signed_in, setSignedIn] = useState(true);
	const [current_selection, setSelect] = useState("");
	const [ready_to_sign_up, set_ready_to_sign_up] = useState(false);
	const [form_details, setForm_Details] = useState({
		chain: "",
		username: "",
		domain: "",
		password: "",
	});
	const [loading, setLoading] = useState(true);
	const [mails, setMails] = useState([]);
	const [compose, setCompose] = useState(false);
	const [show_content, setShowContent] = useState(false);
	const [content, setContent] = useState({
		from: "",
		content: "",
		web: "",
		to: "",
		date: "",
	});
	const [query, setQuery] = useState("");
	useEffect(() => {
		if (!isConnected) {
			setSignedIn(false);
			window.localStorage.setItem("chain", "");
			setLoading(false);
		} else {
			if (
				window.localStorage.getItem("chain") != "" ||
				window.localStorage.getItem("logged_in") == "true"
			) {
				axios
					.get(
						"https://630a-14-195-9-98.ngrok-free.app/register" +
							"?public_key=" +
							address +
							"&domain=" +
							window.localStorage.getItem("domain") +
							"&username=" +
							window.localStorage.getItem("username") +
							"&chain=" +
							cookie_get("chain") +
							"&password=" +
							window.localStorage.getItem("password")
					)
					.then((x) => {
						window.localStorage.setItem("chain", "");
						window.localStorage.setItem("logged_in", "true");
						window.localStorage.setItem("token", x.data);
						cookie_set("token", x.data);
						setSignedIn(true);
						setLoading(false);
						setTimeout(() => {
							axios
								.get(
									"https://630a-14-195-9-98.ngrok-free.app/get_mails?domain=" +
										window.localStorage.getItem("domain") +
										"&username=" +
										window.localStorage.getItem("username") +
										"&password=" +
										window.localStorage.getItem("password")
								)
								.then((x) => {
									var mails = x.data;
									mails.reverse();
									setMails(mails);
								});
						}, 5000);
					});
				return;
			}
			if (window.localStorage.getItem("logged_in") != "true") {
				setSignedIn(false);
				return;
			}
		}
	}, [mails, signed_in, loading]);
	if (loading) {
		return (
			<>
				<div style={{ height: "100vh", width: "100vw" }} className="wrapper">
					<Loading color={"error"}></Loading>
				</div>
			</>
		);
	}
	if (!signed_in) {
		return (
			<>
				<div style={{ height: "100vh", width: "100vw" }} className="wrapper">
					<div style={{ height: "100vh", width: "50vw" }} className="wrapper">
						<div>
							<img src="longerlogo.svg"></img>
						</div>
					</div>
					<div
						style={{
							height: "100vh",
							width: "50vw",
							backgroundImage:
								"url(https://cdn.dribbble.com/users/427540/screenshots/15737663/media/0ea9d1bfa770e0b3375134962fd56c82.png?resize=1600x1200&vertical=center)",
						}}
						className="wrapper"
					>
						<Card css={{ $p: 5, width: "80%", bgBlur: "#0f111466" }}>
							<Card.Header css={{ width: "100%" }} className="wrapper">
								<div>
									<div className="wrapper">
										<div className="wrapper">
											<img src="logo.png" height={"140vh"}></img>
										</div>
									</div>
									<div className="wrapper">
										<Text h1 css={{ width: "100%" }} className="vertical">
											Sign-In
										</Text>
									</div>
								</div>
							</Card.Header>
							<Card.Body className="wrapper">
								<div>
									{current_selection == "" ? (
										<>
											<div className="wrapper">
												<Text h4>Choose your chain</Text>
											</div>
											<div className="wrapper">
												{chain(
													"Ethereum",
													"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ethereum_logo.svg/1285px-Ethereum_logo.svg.png",
													setSelect,
													current_selection,
													form_details,
													setForm_Details,
													set_ready_to_sign_up
												)}
												{chain(
													"Polygon",
													"polygonlogo.png",
													setSelect,
													current_selection,
													form_details,
													setForm_Details,
													set_ready_to_sign_up
												)}
												{chain(
													"Scroll",
													"scrolllogo.png",
													setSelect,
													current_selection,
													form_details,
													setForm_Details,
													set_ready_to_sign_up
												)}
											</div>
											<div className="wrapper">
												{chain(
													"Base",
													"baselogo.png",
													setSelect,
													current_selection,
													form_details,
													setForm_Details,
													set_ready_to_sign_up
												)}
												{chain(
													"Arbitrum",
													"arbitrumlogo.png",
													setSelect,
													current_selection,
													form_details,
													setForm_Details,
													set_ready_to_sign_up
												)}
											</div>
										</>
									) : (
										<>
											<div className="wrapper">
												<Input
													width="20vw"
													placeholder="An Exotic Username"
													onChange={(x) => {
														form_details["username"] = x.target.value;
														setForm_Details(form_details);
														window.localStorage.setItem(
															"username",
															x.target.value
														);
														if (
															form_details.domain != "" &&
															form_details.password != "" &&
															form_details.username != ""
														) {
															set_ready_to_sign_up(true);
														}
													}}
												></Input>
											</div>
											<Spacer y={0.5}></Spacer>
											<div className="wrapper">
												<Input
													width="20vw"
													placeholder="A Funny Domain"
													onChange={(x) => {
														form_details["domain"] = x.target.value;
														setForm_Details(form_details);
														window.localStorage.setItem(
															"domain",
															x.target.value
														);
														if (
															form_details.domain != "" &&
															form_details.password != "" &&
															form_details.username != ""
														) {
															set_ready_to_sign_up(true);
														}
													}}
												></Input>
											</div>
											<Spacer y={0.5}></Spacer>
											<div className="wrapper">
												<Input
													width="20vw"
													placeholder="Your secret password"
													type="password"
													onChange={(x) => {
														form_details["password"] = x.target.value;
														setForm_Details(form_details);
														window.localStorage.setItem(
															"password",
															x.target.value
														);
														if (
															form_details.domain != "" &&
															form_details.password != "" &&
															form_details.username != ""
														) {
															set_ready_to_sign_up(true);
														}
													}}
												></Input>
											</div>
											<Spacer></Spacer>
										</>
									)}
								</div>
								{current_selection != "" && ready_to_sign_up ? (
									<ConnectButton showBalance={false} />
								) : (
									""
								)}
							</Card.Body>
						</Card>
					</div>
				</div>
			</>
		);
	}
	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<div style={{ height: "10vh" }} className="wrapper">
				<div style={{ width: "10%" }} className="wrapper">
					<img src="logo.png" height={"100vw"}></img>
				</div>
				<div style={{ flex: "1" }} className="wrapper">
					<Input
						width="80%"
						bordered
						color="error"
						placeholder={`Search in ${
							window.localStorage.getItem("username") +
							"@" +
							window.localStorage.getItem("domain")
						}`}
						onChange={(x) => {
							setQuery(x.target.value);
						}}
					></Input>
				</div>
				<div style={{ width: "auto", marginRight: "3%" }} className="wrapper">
					<ConnectButton showBalance={false} />
				</div>
			</div>
			<Spacer></Spacer>
			<Modal
				open={compose}
				onClose={() => {
					setCompose(false);
				}}
				width="50%"
			>
				<Modal.Header>
					<Text h2 className="vertical">
						Compose
					</Text>
				</Modal.Header>
				<Modal.Body>
					<Input placeholder="To: " id="to" bordered width="50%"></Input>
					<Input
						placeholder="Subject: "
						id="subject"
						bordered
						width="80%"
					></Input>
					<Textarea
						placeholder="Content"
						rows={10}
						id="content"
						bordered
					></Textarea>
					<Spacer y={0.7}></Spacer>
					<Button
						color={"error"}
						onClick={() => {
							setCompose(false);
							var to = document.getElementById("to").value;
							var subject = document.getElementById("subject").value;
							var content = document.getElementById("content").value;
							if (to.includes(".")) {
								axios.get(
									"https://630a-14-195-9-98.ngrok-free.app/send_mail?from=" +
										window.localStorage.getItem("username") +
										"@" +
										window.localStorage.getItem("domain") +
										"&cookie=" +
										cookie_get("token") +
										"&to=" +
										to +
										"&message=" +
										content +
										"&subject=" +
										subject +
										"&domain=" +
										window.localStorage.getItem("domain") +
										"&username=" +
										window.localStorage.getItem("username") +
										"&chain=" +
										cookie_get("chain") +
										"&password=" +
										window.localStorage.getItem("password")
								);
							} else {
								axios.get(
									"https://630a-14-195-9-98.ngrok-free.app/send_mail_web3?from=" +
										encodeURIComponent(
											window.localStorage.getItem("username") +
												"@" +
												window.localStorage.getItem("domain")
										) +
										"&cookie=" +
										cookie_get("token") +
										"&to=" +
										encodeURIComponent(to) +
										"&message=" +
										content +
										"&subject=" +
										subject +
										"&domain=" +
										window.localStorage.getItem("domain") +
										"&username=" +
										encodeURIComponent(
											window.localStorage.getItem("username")
										) +
										"&chain=" +
										cookie_get("chain") +
										"&password=" +
										window.localStorage.getItem("password")
								);
							}
						}}
					>
						Submit
					</Button>
				</Modal.Body>
			</Modal>
			<Modal
				open={show_content}
				onClose={() => {
					setShowContent(false);
				}}
				width="50%"
			>
				<Textarea
					disabled
					rows={10}
					placeholder={content["content"]}
				></Textarea>
			</Modal>
			<div style={{ height: "70%" }}>
				<div className="wrapper" style={{ width: "100%" }}>
					<div style={{ height: "80vh", width: "18%", padding: "1vw" }}>
						<Button
							color={"error"}
							icon={<img src="compose.svg"></img>}
							css={{ width: "100%" }}
							onClick={() => {
								setCompose(true);
							}}
						>
							Compose
						</Button>
						<Spacer></Spacer>
						{option_button("Inbox", "inbox.svg")}
						{option_button("Direct Messages", "dms.svg")}
						{option_button("Group Chats", "groupchats.svg")}
						{option_button("Spaces", "spaces.svg")}
					</div>

					<div
						style={{
							width: "80%",
							backgroundImage:
								"url(https://img.freepik.com/premium-photo/grain-noise-texture-black-grunge-weathered-dirty-surface-with-smeared-stains-effect-photo-editor_279525-1112.jpg)",
							padding: "1vw",
							borderRadius: "1vw",
							height: "80vh",
							border: "1px solid #333",
						}}
					>
						{sidebarstep === "Inbox" && (
							<div
								style={{
									height: "78vh",
									overflowX: "hidden",
									overflowY: "auto",
								}}
							>
								{mails.map((x) => {
									if (
										JSON.stringify(x)
											.toLowerCase()
											.includes(query.toLowerCase())
									) {
										return Mail(
											x["from"],
											x["subject"],
											x["date"],
											x["content"],
											setShowContent,
											setContent
										);
									}
								})}
							</div>
						)}

						{sidebarstep === "Direct Messages" && <Directchat />}

						{sidebarstep === "Group Chats" && <Groupchat />}

						{sidebarstep === "Spaces" && <Spaces />}
					</div>
				</div>
			</div>
		</div>
	);
}
