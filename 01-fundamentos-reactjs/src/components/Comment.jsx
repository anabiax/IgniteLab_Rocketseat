import styles from './Comment.module.css';
import { Trash, ThumbsUp } from "phosphor-react";
import { Avatar } from './Avatar';

export function Comment() {
    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/anabiax.png" alt="" />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header> 
                        <div className={styles.authorAndTime}>
                            <strong>Sujeito</strong>
                            <time title="29 de janeiro às 14h09" dateTime='2023-01-29'>Há cerca de 1h.</time>

                        </div>

                        <button title="Deletar comentário">
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>Muito bom!</p>
                </div>

                <footer>
                    <button>
                        <ThumbsUp />
                        Aplaudir <span>20</span>
                    </button>
                </footer>
            </div>

        </div>
    )
}