import styles from './Avatar.module.css';

                        /* desestruturando p/ aplicar valores default nas props*/
                        /*como se lê: eu quero buscar APENAS as props hasBorder e src */
export function Avatar({ hasBorder = true, src }) {


    return (
        <>
            <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={src} />
        </>
    )
}