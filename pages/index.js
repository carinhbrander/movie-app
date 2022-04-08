import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Movie Finder</title>
        <meta name="description" content="The best movie app ever" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The Movie Finder
        </h1>
      </main>

      <footer className={styles.footer}>
        <a href="https://carinh.se/">Carin H Brander - Your friendly neighborhood dev</a>
      </footer>
    </div>
  )
}
