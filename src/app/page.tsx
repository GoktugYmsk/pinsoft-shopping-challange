'use client'

import styles from './page.module.css'
import CustomComponent from './components/customComponent';
import { Provider } from 'react-redux';
import Head from 'next/head';

import { store } from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';

import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push('/main');
  };

  return (
    <main className={styles.main}>
      <div>
        <Head>
          <title>Pisnoft Shopping</title>
        </Head>
        <Provider store={store}>
          <CustomComponent />
        </Provider>
      </div>
    </main>
  )
}
