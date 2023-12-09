import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { createTheme } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"
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

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
	<NextUIProvider theme={theme}>
		<SessionProvider session={session}>
	  	<Component {...pageProps} />
		</SessionProvider>
	</NextUIProvider>
  );
}

export default App;
