'use client'
// import Head from 'next/head';
import styles from './page.module.css';
import { Provider } from 'react-redux';

import { store } from './store/store';
import CustomComponent from '@/pages/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.module.css'

const Home: React.FC = () => {

  // sepet iconu için giriş yapan kişi bilgileri `role` kontrolü yapılacak  ***************************

  return (
    <main className={styles.main}>
      <div>
        {/* <Head>
          <title>Pinsoft Alışveriş</title>
        </Head> */}
        <Provider store={store} >
          <CustomComponent />
        </Provider>
      </div>
    </main>
  );
}

export default Home;
