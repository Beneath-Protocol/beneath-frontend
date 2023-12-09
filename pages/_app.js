import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { createTheme } from "@nextui-org/react";
import { Providers } from '../components/provider/provider'

import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    sepolia,
    scrollSepolia,
    polygonMumbai,
    arbitrumNova,
    baseGoerli,
    zetachainAthensTestnet
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient } = configureChains(
    [sepolia, scrollSepolia, polygonMumbai, arbitrumNova, baseGoerli, zetachainAthensTestnet],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "Beneath Protocol",
    projectId: '8b9d9c5a89bfe3fa81c75f382d4112ad',
    chains
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})


const theme = createTheme({
    type: "dark", // it could be "light" or "dark"
    theme: {
        colors: {
            // brand colors
            background: '#000',
            text: '#fff',
            // you can also create your own color
            myDarkColor: '#ff4ecd'
            // ...  more colors
        },
        space: {},
        fonts: {}
    }
})



function App({ Component, pageProps: { ...pageProps } }) {
    return (
        <NextUIProvider theme={theme}>
            <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider chains={chains}>
                    <Providers>
                        <Component {...pageProps} />
                    </Providers>
                </RainbowKitProvider>
            </WagmiConfig>
        </NextUIProvider>
    );
}

export default App;