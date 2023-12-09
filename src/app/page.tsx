

import styles from './page.module.css'

import Content from './components/content'

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <Content />
      </div>
    </main>
  )
}
