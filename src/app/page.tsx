'use client'
import styles from './page.module.css';
import { Provider } from 'react-redux';
import Head from 'next/head';
import Login from '@/pages/login';
import { store } from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomComponent from '@/pages/main';
import { useRouter } from 'next/navigation';
import './page.module.css'

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <div>
        <Head>
          <title>Pinsoft Alışveriş</title>
        </Head>
        <Provider store={store} >
          <CustomComponent />
        </Provider>
      </div>
    </main>
  );
}

export default Home;
