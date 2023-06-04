import './global.css'
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar';
import { Post, PostType } from './components/Post';
import { Header } from './components/Header';


// evitar a todo custo que o back-end me retorne um HTML -> isso deixa o site aberto p/ vulnerabilidades por parte de usuários maliciosos
const posts: PostType[] = [{
  id: 1,
  author: {
    avatarUrl: "https://github.com/anabiax.png",
    name: "AnaB",
    role: "Dev jr"
  },
  content: [
    { type: 'paragraph', content: 'Fala galeraa 👋', },
    { type: 'paragraph', content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"},
    { type: 'link', content: "👉 jane.design/doctorcare" },
  ],
  publishedAt: new Date("2023-01-29 19:00:00"),
},
{
  id: 2,
  author: {
    avatarUrl: "https://github.com/Marianadsm.png",
    name: "Mari",
    role: "Dev jr"
  },
  content: [
    { type: 'paragraph', content: 'Opa 👋'},
    { type: 'paragraph', content: "Que dificil es ser yo!!!!"},
    { type: 'link', content: "👉 jane.design/doctorcare" },
  ],
  publishedAt: new Date("2023-01-30 19:00:00"),
}];

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
            {posts.map(post => {  // iteração == criar uma estrutura de repetição p/ percorrer os posts.
              return(
                <Post 
                    key={post.id}
                    post={post}
                />

                // "Para cada post eu vou retornar um componente Post. Basicamente uma listagem de posts"
              )
            })}
        </main>
      </div>
      
    </>
  )
}