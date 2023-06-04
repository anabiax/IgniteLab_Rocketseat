import styles from './Comment.module.css';
import { Trash, ThumbsUp } from "phosphor-react";
import { Avatar } from './Avatar';
import { useState } from 'react';


interface CommentProps {
    content: string;
    onDeleteComment: (commentToDelete: string) => void; // o retorno dela é vazio
}



export function Comment({ content, onDeleteComment }: CommentProps) {

    const [likeCount, setLikeCount] = useState(0);

    const handleDeleteComment = () => {
        onDeleteComment(content);  //  a única info que tenho do meu comentário (no melhor dos casos seria o id)
    }

    // "eu preciso saber qnts likes já tenho para adicionar + 1". Para atualizá-lo preciso do valor anterior de likes.
    const handleLikeComment = () => {
        setLikeCount((state) => {

        return state + 1;
    });
    }
    

    return (
        <div className={styles.comment}>
            <Avatar 
                hasBorder={false} 
                src="https://github.com/anabiax.png" 
                alt="" 
                onClick={() => console.log("o restOperator é chamado aqui. Toda propriedade passada p/ o avatar vai ser automaticamente enviada para a tag img do componente Avatar.")}
            />
            
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header> 
                        <div className={styles.authorAndTime}>
                            <strong>Sujeito</strong>
                            <time title="29 de janeiro às 14h09" dateTime='2023-01-29'>Há cerca de 1h.</time>

                        </div>

                        <button title="Deletar comentário" onClick={handleDeleteComment}>
                            <Trash size={24} />
                        </button>
                    </header>

                    <p>{content}</p>

                </div>

                <footer>
                    <button onClick={handleLikeComment}>  {/* "eu preciso saber qnts likes já tenho para adicionar + 1" */}
                        <ThumbsUp /> 
                            Aplaudir 
                        <span>{likeCount}</span>
                    </button>
                </footer>
            </div>

        </div>
    )
}