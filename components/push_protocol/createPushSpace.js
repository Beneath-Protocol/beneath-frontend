import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from 'ethers';

export default async function createSpace(name, desc, img, start, end, speakers, listeners) {
    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const response = await PushAPI.space.create({
            spaceName: name,
            signer: signer,
            spaceDescription: desc,
            listeners: listeners,
            spaceImage: img,
            speakers: speakers,
            isPublic: true,
            account: signer.address,
            env: "staging",
            pgpPrivateKey: pgpDecryptedPvtKey,
            scheduleAt: new Date(start),
            scheduleEnd: new Date(end),
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
    }
}