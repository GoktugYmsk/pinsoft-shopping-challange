'use client'

import styles from './page.module.css'
import CustomComponent from './components/customComponent'
import { Provider } from 'react-redux';
import Head from 'next/head';

import { store } from './store/store';

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <Head>
          <title>Yeni Sayfa Adı</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Provider store={store}>
          <CustomComponent />
        </Provider>
      </div>
    </main>
  )
}
