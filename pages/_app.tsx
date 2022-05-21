import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/system'
import '../styles/globals.css'

import { lightTheme } from '../themes'
import { CssBaseline } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
