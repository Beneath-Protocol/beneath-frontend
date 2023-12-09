import Head from "next/head";
import { Text, Link, Navbar, Spacer, Divider, Button, Input, Table, Card, Checkbox} from "@nextui-org/react";

function Mail() {
    return (
        <>
        <Card blur="true" isPressable iscompact="true" isHoverable isblurred="true" variant="bordered" css={{padding:"$2", bgBlur:"#0f111466"}}>
            <Card.Header>
            <div className="wrapper" style={{width:"100%"}}>
                <Checkbox color="error"></Checkbox>
                <Spacer></Spacer>
                <div style={{width:"10%"}}>
                    <h4 style={{margin:"0 0 0 0"}}>Aarav:</h4>
                </div>
                <Spacer></Spacer>
                <Spacer></Spacer>
                <div style={{width:"80%"}}>
                    <h5 style={{margin:"0 0 0 0"}}>Hello how are you</h5>
                </div>
                <div style={{width:"10%"}}>
                    <h5 style={{margin:"0 0 0 0"}}>01:00:24</h5>
                </div>
            </div>
            </Card.Header>
        </Card>
        <Spacer y={.7}></Spacer>
        </>
    )
}

function option_button(option,image) {
    return (
        <>
        <div className="wrapper" style={{float:"left"}}>
            <img src={image}></img>
            <Spacer></Spacer>
            <Link color={"text"}><Text css={{margin:"0 0 0 0"}} h5 color="$accents8">{option}</Text></Link>
        </div>
        <br></br><br></br>
        </>
    )
}

export default function Home() {
    return (
        <>
            <div style={{width:"100vw",height:"100vh"}}>
                <div style={{height:"10vh"}} className="wrapper">
                    <div style={{width:"10%"}} className="wrapper">
                        <img src="logo.png" height={"100vw"}></img>
                    </div>
                    <div style={{width:"75%"}} className="wrapper">
                        <Input width="80%" bordered color="error" placeholder="Search in aarav@beneath-protocol" css={{marginLeft:"10%"}}></Input>
                    </div>
                    <div style={{width:"10%"}} className="wrapper">
                        <Text color="$accents9" h4>aludayalu</Text>
                    </div>
                </div>
                <Spacer></Spacer>
                <div style={{height:"70%"}}>
                    <div className="wrapper" style={{width:"100%"}}>
                        <div style={{height:"80vh",width:"18%",padding:"1vw"}}>
                            <Button color={"error"} icon={<img src="compose.svg"></img>} css={{width:"100%"}}>Compose</Button>
                            <Spacer></Spacer>
                            {option_button("Inbox","inbox.svg")}
                            {option_button("Direct Messages","dms.svg")}
                            {option_button("Group Chats","groupchats.svg")}
                            {option_button("Spaces","spaces.svg")}
                        </div>
                        <div style={{width:"80%",backgroundImage:"url(https://img.freepik.com/premium-photo/grain-noise-texture-black-grunge-weathered-dirty-surface-with-smeared-stains-effect-photo-editor_279525-1112.jpg)",padding:"1vw",borderRadius:"1vw",height:"80vh",border:"1px solid #333"}}>
                            {Mail()}
                            {Mail()}
                            {Mail()}
                        </div>
                    </div>
                </div>
            </div>
        </> 
    )
}