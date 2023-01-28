import './global.css'
import styles from './App.module.css';

import Sidebar from './components/Sidebar';
import Post from './components/Post';
import Header from './components/Header';


export default function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
            <Post author="anab" content='aaaaaa'/>
            <Post />
        </main>
      </div>


    </>
  )
}

