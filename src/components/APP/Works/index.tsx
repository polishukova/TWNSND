import ReactPlayer from 'react-player'

import YBall from '../InfoBlock/Artboard 8 1.png'

import styles from './Works.module.scss'
import Laptop from './laptop.png'

const UrlVideo: string = 'https://www.youtube.com/watch?v=MMkwlnxYPcY'

interface post {
  title: string
}

const POST: post[] = [
  {
    title:
      'Мы — агентство мессенджер-маркетинга Townsend. С 2018 года автоматизируем продажи, увеличиваем конверсию и эффективность бизнес-процессов, помогаем клиентам достичь нужных результатов с помощью чат-ботов в мессенджерах. Работаем "под ключ" на KPI в виде конверсий, заявок и продаж.'
  },
  {
    title:
      'Главным преимуществом решений — является быстрый запуск. Вам не нужно тратить несколько недель или месяцев на разработку, тестирование, анализ, внесение правок. Мы даём вам готовые шаблоны, уже прошедшие все эти этапы и проверенные на наших клиентах в самых разных нишах. На сайте вы найдёте только те решения, которые уже не раз приносили результаты и гарантированно работают.'
  },
  {
    title:
      'Предлагаем вам эффективные и гарантированно качественные шаблоны чат-ботов для быстрого и успешного решения задач бизнеса. Определите, какие задачи вы хотите решить, какие возможности вам необходимы и выберите подходящий вариант. Большой выбор, удобная форма подбора с фильтром, разнообразие категорий помогут вам найти то, что нужно для вашего бизнеса.'
  }
]

export const Works = () => {
  return (
    <section className={styles.works}>
      <h3>Как это работает</h3>
      <div className={styles.conteiner}>
        <div className={styles.player}>
          <ReactPlayer controls={true} url={UrlVideo} width="100%" height="100%" />
        </div>

        <div className={styles.service}>
          <h3>О сервисе</h3>
          <div className={styles.wrapperService}>
            <div className={styles.wrapperServiceText}>
              {POST.map(({ title }) => (
                <div className={styles.serviceText}>
                  <p>{title}</p>
                </div>
              ))}
            </div>
            <div className={styles.wrapperServiceAnimations}>
              <img src={Laptop} alt="#" />
              <div className={styles.laptopAnimations}>
                <img className={styles.ballAnimation} src={YBall} alt="#" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
