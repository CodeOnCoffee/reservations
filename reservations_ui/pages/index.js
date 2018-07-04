/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from 'react-apollo'
import Client from '../src/Apollo'
import App from '../src/App'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { SheetsRegistry } from 'jss'

import JssProvider from 'react-jss/lib/JssProvider'

const sheetsRegistry = new SheetsRegistry()

const theme = createMuiTheme()

class Index extends React.Component {
  render () {
    return (
      <JssProvider registry={sheetsRegistry}>
        <MuiThemeProvider theme={theme}>
          <ApolloProvider client={Client}>
            <CssBaseline/>
            <Head>
              <meta name='viewport' content='width=device-width, initial-scale=1'/>
              <meta charSet='utf-8'/>
              <style jsx global>{`
                html, body, #__next {
                  height:100%
                }
              `}</style>
            </Head>
            <App/>
          </ApolloProvider>
        </MuiThemeProvider>
      </JssProvider>
    )
  }
}

export default Index
