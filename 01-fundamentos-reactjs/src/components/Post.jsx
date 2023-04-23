import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"
import { useState } from 'react';

                        // desestruturação das props 
export function Post({ author, publishedAt, content }) {

    // lib de manipulação de datas usadas
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { // 'escapar' estas strings p/ não formatá-las
        locale: ptBR,
    });

    // distância da data que foi publicada até o presente momento
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });

    const [comments, setComments] = useState([ 1, 2 ]); // valor inicial da variável


    const handleCreateNewComment = (event) => {
        event.preventDefault();
        
        // imutabilidade - passo não apenas o valor existente, mas tb o novo
        setComments([...comments, comments.length + 1]); // pego o array do tamanho de comentários (qnts tenho até agr)
         // spread operador copia o valor existente da variável
    }
    
    return(
        <>
            <article className={styles.post}>
                <header>
                    <div className={styles.author}>
                        <Avatar src={author.avatarUrl} />

                        <div className={styles.authorInfo}>
                            <strong>{author.name}</strong>
                            <span>{author.role}</span>
                        </div>    
                    </div>

                    <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()} >{publishedDateRelativeToNow}</time>
                </header>

                <div className={styles.content}>
                    {content.map(line => {
                        if (line.type === 'paragraph') {
                            return <p>{line.content}</p>
                        } else if (line.type === 'link') {
                            return <p><a href="#">{line.content}</a></p>
                        }
                    })}
                </div>

                <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                    <strong>Deixe seu feedback</strong>
                    <textarea
                        placeholder='Deixe um comentário.'
                    />

                    <footer>        
                        <button type='submit'>Publicar</button>
                        
                    </footer>
                </form>

                <div className={styles.commentList}>
                    <Comment />
                    <Comment />
                    <Comment />

                </div>

            </article>
        </>
    )
}