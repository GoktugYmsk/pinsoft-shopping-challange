'use client'
import styles from './page.module.css';
import CustomComponent from '../pages/main';
import { Provider } from 'react-redux';
import Head from 'next/head';
import Login from '@/pages/login';
import { store } from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

import NextLink from 'next/link';


const Home: React.FC = () => {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push('/main');
  };

  return (
    <main className={styles.main}>
      <div>
        <Head>
          <title>Pinsoft Alışveriş</title>
        </Head>
        <Provider store={store}>
          <Login onLoginSuccess={handleLoginSuccess} />
        </Provider>
      </div>
    </main>
  );
}

export default Home;
