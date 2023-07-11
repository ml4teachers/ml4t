import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import GermanGitTimestamp from './components/GermanGitTimestamp';


const config: DocsThemeConfig = {
  head: (
    <>
      <link rel="icon" href="/favicon.ico" />
      <title>ML for Teachers</title>
      <meta property="og:title" content="ML for Teachers" />
      <meta property="og:description" content="KI Tools für den Unterricht" />
      <meta property="og:image" content="/og.png" />
    </>
  ),
  search: {
    placeholder: 'Suche',
  },
  logo: (
    <>
      <span style={{ marginLeft: '.4em', marginBottom: '.4em', fontWeight: 600 }}>
        ML for Teachers
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
