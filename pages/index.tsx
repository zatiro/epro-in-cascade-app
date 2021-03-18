import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { Layout } from '../components/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout />
    </>
  )
}
