import { AnimatePresence } from 'framer-motion'

import classNames from 'classnames'

import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getTemplate } from '../../redux/Templates/templatesSlice'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'
import Loader from '../../components/UI/Loader'

import Request from '../../components/APP/Request'

import Consultation from '../../components/APP/Consultation'

import { offScrollModal } from '../../utils/offScrollModal'
import { useToggle } from '../../hooks/useToggle'

import { TemplatesDescCard } from './components/TemplatesDescCard'
import { Task } from './components/Task'
import { Event } from './components/Event'
import { ToggleFavorite } from './components/ToggleFavorite'
import { PriceCardButtons } from './components/PriceCardButtons'

import { description, tasks, events } from './constant'

import styles from './TemplatesDetails.module.scss'

const TemplatesDetails = () => {
  const [isActiveRequestModal, toggleIsActiveRequestModal] = useToggle()
  const [isActiveConsultationModal, toggleIsActiveConsultationModal] = useToggle()
  const dispatch = useAppDispatch()
  const { templatesStatus, templateFavoriteStatus } = useAppSelector((state) => state.templatesSlice)
  const { statusTemplate } = useAppSelector((state) => state.platformsSlice)
  const { registerUser } = useAppSelector((state) => state.signInSlice)
  const { templateCard } = useAppSelector((state) => state.templatesSlice)

  const { id } = useParams()

  const handleToggleModal = (flag: string) => {
    if (flag === 'request') {
      toggleIsActiveRequestModal()
      offScrollModal()
    }

    if (flag === 'consultation') {
      toggleIsActiveConsultationModal()
      offScrollModal()
    }
  }

  const status = templatesStatus === 'fullfilled' || templateFavoriteStatus === 'fullfilled'

  if (!status) {
    return <Loader className={styles.loader} />
  }

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.detailsCard}>
          <div className={styles.infoPlatform}>
            <h2 className={styles.title}>Комплексная воронка для языковой школы</h2>
            <div className={styles.desc}>
              Заменяет LMS и помогает выстроить бесшовный автоматизированный путь студента в мессенджере.
              <div>
                <span>Платформа:</span> Salebot
              </div>
            </div>
            <div className={styles.control}>
              <ButtonNew
                className={styles.btn}
                title={'Заказать'}
                type={ButtonNewTypes.Secondary}
                onClick={() => handleToggleModal('request')}
              />
              {registerUser && <ToggleFavorite />}
            </div>
          </div>
          <div className={styles.logoPlatform}>
            <div className={styles.noLogo}></div> {/* задача с логотипом еще в разработке, по этому пока что пусто */}
          </div>
        </div>
        <div className={styles.titles}>Описание:</div>
        <div className={styles.templatesDesc}>
          <TemplatesDescCard data={description.slice(0, 4)} />
          <TemplatesDescCard data={description.slice(4)} />
        </div>
        <div className={styles.titles}>Задачи:</div>
        <div className={styles.task}>
          {tasks.map(({ id, text }) => (
            <Task key={id} text={text} />
          ))}
        </div>
        <div className={styles.titles}>Мероприятия для достижения задач:</div>
        <div className={styles.events}>
          {events.map((item) => (
            <Event key={item.id} data={item} />
          ))}
        </div>
        <div className={styles.titles}>Выберите свой идеальный вариант:</div>
        <div className={styles.price}>
          <div className={styles.priceCard}>
            <h3 className={styles.priceText}>Готовое решение</h3>
            <PriceCardButtons toggleModal={handleToggleModal} />
            <div className={styles.priceNum}>
              RUB 00,00 <span>в месяц</span>
            </div>
          </div>
          <div className={classNames(styles.priceCard, styles.nextPriceCard)}>
            <h3 className={styles.priceText}>Создать уникальное решение</h3>
            <PriceCardButtons toggleModal={handleToggleModal} />
            <p>Индивидуальный расчет стоимости</p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isActiveRequestModal && (
          <Request
            closeModal={() => handleToggleModal('request')}
            sourcePage="page: templates details, type: Request"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isActiveConsultationModal && (
          <Consultation
            closeModal={() => handleToggleModal('consultation')}
            sourcePage="page: templates details, type: consultation"
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default TemplatesDetails
