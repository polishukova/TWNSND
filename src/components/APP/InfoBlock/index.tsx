import { useNavigate } from 'react-router-dom'

import { PathNames } from '../../../pages/Router/types'

import { ArrowIcon } from './ArrowIcon'
import YBall from './Artboard 8 1.png'
import YBallShadow from './Artboard 9@4x 1.png'
import styles from './InfoBlock.module.scss'

export const InfoBlock = () => {
  const navigate = useNavigate()
  const handlerTemplates = () => {
    navigate(PathNames.Templates)
  }
  return (
    <section className={styles.infoBlock}>
      <div className={styles.conteiner}>
        <div className={styles.ballWrapper}>
          <div className={styles.ball}>
            <img className={styles.ballAnimation} src={YBall} alt="#" />
            <img className={styles.ballShadowAnimation} src={YBallShadow} alt="#" />
          </div>
          <div className={styles.textConteinerRight}>
            <p>
              Автоматизируйте бизнес и получайте больше продаж. Используйте проверенные шаблоны чат-ботов в
              мессенджерах. Это самый простой и эффективный способ получить нужные результаты в короткий срок.
            </p>
          </div>
        </div>

        <div className={styles.textConteinerLeft}>
          <h2>Платформа для покупки чат ботов</h2>
          <div className={styles.button} onClick={handlerTemplates}>
            <p>Подобрать решение</p>
            <div className={styles.buttonArrow}>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
