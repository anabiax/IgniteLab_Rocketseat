import styles from './Avatar.module.css';
import { ImgHTMLAttributes } from 'react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {  // é uma interface global. Então os atributos que já existem eu n preciso repeti-los aqui
    hasBorder?: boolean;   // não é obrigatório passar onde o componente for chamado.
}

                        /* desestruturando p/ aplicar valores default nas props*/
                        /*como se lê: eu quero buscar o que sobrou das props do componente avatar,ou seja, src e alt  */
export function Avatar({ hasBorder = true, ...props }: AvatarProps) {  // restOperator: jogo o que sobrou(resto) p/ o objeto props

    return (
        <>
            <img 
                className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
                {...props} // spredOperator = pego cada valor dentro do objeto props e passo como propriedade da minha tag img
                
            />
        </>
    )
}