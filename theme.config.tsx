import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import GermanGitTimestamp from './components/GermanGitTimestamp';


const config: DocsThemeConfig = {
  head: (
    <>
      <link rel="icon" href="/favicon.ico" />
      <title>KI Tools</title>  // Fügen Sie diesen Tag hinzu
      <meta property="og:title" content="KI Tools" />
      <meta property="og:description" content="KI Tools für den Unterricht" />
      <meta property="og:image" content="/og.png" />
    </>
  ),
  search: {
    placeholder: 'Suche',
  },
  logo: (
    <>
      <svg width="30 " height="30" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path fill="currentColor" d="m84 5h-68c-6.1016 0-11 4.6016-11 10.301v51.699c0 5.6992 4.8984 10.301 11 10.301h7.1992v15.301c0 0.89844 0.60156 1.8008 1.5 2.1992 0.39844 0.19922 0.69922 0.19922 1.1016 0.19922 0.60156 0 1.1992-0.19922 1.6992-0.5l22.699-17.199h33.801c6.1016 0 11-4.6016 11-10.301v-51.699c0-5.6992-4.8984-10.301-11-10.301zm5.8984 61.898c0 3-2.6016 5.3984-5.8008 5.3984l-34.898 0.003906c-0.60156 0-1.1992 0.19922-1.6992 0.5l-19.102 14.5v-12.602c0-1.3008-1.1992-2.3984-2.6016-2.3984h-9.8008c-3.1992 0-5.8008-2.3984-5.8008-5.3984l0.003907-51.402c0-3 2.6016-5.3984 5.8008-5.3984h68.199c3.1992 0 5.8008 2.3984 5.8008 5.3984v51.398z"/>
          <path fill="currentColor" d="m58 26.301h-7.8984l-11.301 12v-12h-6v29.199h6v-9.8008l3-3 9 12.801h7.8008l-12.602-17.199z"/>
          <path fill="currentColor" d="m61.5 26.301h6.1016v29.199h-6.1016z"/>
        </g>
      </svg>
      <span style={{ marginLeft: '.4em', marginBottom: '.4em', fontWeight: 600 }}>
        Tools
      </span>
    </>
  ),
  project: {
    link: 'https://github.com/ml4teachers/aitools',
  },
  footer: {
    text: (
      <span>
        © {new Date().getFullYear()} Thomas Zurfluh | {' '}
        <a href="https://www.phzg.ch" target="_blank">
          Pädagogische Hochschule Zug
        </a>
        .
      </span>
    )
  },
  feedback: {
    content: null,
  },
  editLink: {
    text: null,
  },
  toc: {
    title: null,
  },
  gitTimestamp: GermanGitTimestamp,

}

export default config
