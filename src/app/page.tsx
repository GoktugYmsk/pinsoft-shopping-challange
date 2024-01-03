'use client'
import styles from './page.module.css';
import { Provider } from 'react-redux';

import { store } from './store/store';
import CustomComponent from '@/pages/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.module.css'

const Home: React.FC = () => {

  return (
    <main className={styles.main}>
      <div>
        <Provider store={store} >
          <CustomComponent />
        </Provider>
      </div>
    </main>
  );
}

export default Home;
