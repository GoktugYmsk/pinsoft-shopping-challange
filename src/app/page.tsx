'use client'
// import Head from 'next/head';
import styles from './page.module.css';
import { Provider } from 'react-redux';

import { store } from './store/store';
import CustomComponent from '@/pages/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.module.css'

const Home: React.FC = () => {

  // RightContentte skeleton çalışmıyor ona bakarsın
  // Sepet ve sipariş sayafaları yapılacak
  // https://pinsoft.onrender.com/swagger-ui/index.html#/user-controller/authenticate
  // https://pinsoft.onrender.com/swagger-ui/index.html#
  // https://www.figma.com/file/TIKuY2wyU68l1cLLH9E3Lj/Untitled?type=design&node-id=428-3903&mode=design&t=jhevkI9in8suViEr-0

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
