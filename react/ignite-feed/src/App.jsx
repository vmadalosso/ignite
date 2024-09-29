import { Header } from './components/Header'
import { Post } from './Post'
import { Sidebar } from './components/Sidebar'

import styles from './App.module.css'

import './global.css'

export function App() {

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>

        <Sidebar />

        <main>
          <Post
            author="Vitor Madalosso"
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex doloremque cum aperiam, laborum nisi asperiores esse cupiditate blanditiis non cumque facere quisquam voluptates nesciunt sapiente voluptatum eligendi totam accusamus!"
          />
          <Post
            author="Diego Fernandes"
            content="Outro Post!"
          />
        </main>
      </div>
    </div>
  )
}