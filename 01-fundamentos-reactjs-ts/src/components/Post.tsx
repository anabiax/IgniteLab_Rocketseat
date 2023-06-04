import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';


interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[]; // um array com vários objetos com este formato 
}

interface PostProps {
    post: PostType;
}



                    // tenho que passar o tipo do objeto inteiro, não de cada propriedade  -> por mais que seja desestruturação, isso é um objeto.
export function Post({ post }: PostProps ) {

    // lib de manipulação de datas usadas
    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { // 'escapar' estas strings p/ não formatá-las
        locale: ptBR,
    });

    // distância da data que foi publicada até o presente momento
    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });

    // ESTADO = variáveis que eu quero que o componente monitore
    const [comments, setComments] = useState([ "da hora!" ]); // valor inicial da variável e função que irá alterar o valor inicial da variável (a que monitora)

    const [newCommentText, setNewCommentText] = useState(''); 
    

                                        // esse cara é um evento do formulário
    const handleCreateNewComment = (event: FormEvent) => {
        event.preventDefault(); // passar este atributo, pq por default o navegador redireciona p/ outra pagina. Se não passar isso aqui quebra.
        
        setComments([...comments, newCommentText]); // pego o array do tamanho de comentários (qnts tenho até agr)
                    // spread operador copia o valor existente da variável (os comentários existentes)
        
        setNewCommentText(''); // estado que armazena o conteúdo da textarea -> voltar p/ o valor original
    };

    const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(event.target.value);
        event.target.setCustomValidity('');  // avisando que não está mais com erro e pode liberar p/ postar coisa
        setNewCommentText(event.target.value);
    };

    // recebe qual comentário eu quero remover e vai fazer alguma coisa com ele -> passar como prop p/ o componente filho (Comment)
    const deleteComment = (commentToDelete: string) => {
        // imutabilidade -> as variáveis não sofrem mutação na memória. Nós criamos um novo valor (espaço na memória)
        
        // criar uma nova lista de comentários s/ o que deletei
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment !== commentToDelete; // se true = mantém na lista ; false = remove da lista aquele item
        });  

        setComments(commentsWithoutDeleteOne);
    };


    const handleNewCommentInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity("Este campo é obrigatório.");
    };

    const isNewCommentEmpty = newCommentText.length === 0;

    return(
        <>
            <article className={styles.post}>
                <header>
                    <div className={styles.author}>
                        <Avatar src={post.author.avatarUrl} />

                        <div className={styles.authorInfo}>
                            <strong>{post.author.name}</strong>
                            <span>{post.author.role}</span>
                        </div>    
                    </div>

                    <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()} >{publishedDateRelativeToNow}</time>
                    
                </header>

                <div className={styles.content}>
                    {post.content.map(line => {

                        if (line.type === 'paragraph') {
                            return <p key={line.content} >{line.content}</p>

                        } else if (line.type === 'link') {
                            return <p key={line.content} ><a href="#">{line.content}</a></p>
                        }
                    })}
                </div>

                <form onSubmit={handleCreateNewComment} className={styles.commentForm}>            

                    <strong>Deixe seu feedback</strong>

                    <textarea
                        name='comment'  // no caso de um formulário qnd adiciono este atributo consigo acessá-lo lá na função de atualizar o valor da variável
                        placeholder='Deixe um comentário.'
                        value={newCommentText} // o valor dela é sempre o do estado. Então, independente de onde venha essa atualização sempre irá refletir
                        onChange={handleNewCommentChange}
                        onInvalid={handleNewCommentInvalid}
                        required
                    />

                    <footer>        
                        <button type='submit' disabled={isNewCommentEmpty} >Publicar</button>  {/* evento de submit é disparado qnd é apertado um enter e/ou click no botão */} 
                    </footer>
                </form>

                <div className={styles.commentList}>
                    {comments.map(comment => {  // texto do comentário é passado p/ dentro da propriedade
                        return(
                            <Comment 
                                key={comment}
                                content={comment}
                                onDeleteComment={deleteComment} // comunicando um componente com o outro passando a função como propriedade
                                // "qnd ocorrer a remoção de um comentário eu executo a função 'deleteComment'"
                            />
                        )
                    })}
                </div>

            </article>
        </>
    )
}