import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import PlatformTemplateCard from '../../UI/PlatformTemplateCard'
import Request from '../Request/index'
import { getTemplates } from '../../../redux/Templates/templatesSlice'

import { ArrowIcon } from '../InfoBlock/ArrowIcon'

import { PathNames } from '../../../pages/Router/types'

import { offScrollModal } from '../../../utils/offScrollModal'

import styles from './ReadyMadeSolutions.module.scss'

export const ReadyMadeSolutions = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const navigate = useNavigate()
  const handlerTemplates = () => {
    navigate(PathNames.Templates)
  }
  const dispatch = useAppDispatch()

  const { templatesCards } = useAppSelector((state) => state.templatesSlice)

  useEffect(() => {
    dispatch(
      getTemplates({
        data: {
          take: 2
        }
      })
    )
  }, [])

  const handleBuy = () => {
    setOpenModal(true)
    offScrollModal()
  }

  const onClose = () => {
    setOpenModal(false)
    offScrollModal()
  }

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.cardWrapper}>
          {templatesCards.map(({ id, name, isUserFavorite, rating }, index) => (
            <div className={styles.card} key={id}>
              <PlatformTemplateCard
                onClick={() => navigate(`/templates/${index}`)}
                onBuyClick={handleBuy}
                title={name}
                like={isUserFavorite ? isUserFavorite : false}
                hiddenLikeImg
                rating={`${rating}`}
                id={id}
                index={index}
              />
            </div>
          ))}
        </div>
        <div className={styles.readyMainSolutionsWrapper}>
          <h2 className={styles.readyMainSolutionsTitle}>Готовые решения</h2>
          <div className={styles.readyMainSolutionsDesc}>
            <p>
              Вам больше не нужно тратить недели или месяцы на создание и настройку чат-ботов с нуля. Мы предоставляем
              вам готовые шаблоны, которые уже протестированы и оптимизированы для достижения конкретных бизнес-целей,
              таких как увеличение конверсии, сбор заявок, автоматизация продаж и обслуживания клиентов.
            </p>
          </div>
          <button className={styles.button} onClick={handlerTemplates}>
            <p>Подобрать решение</p>
            <div className={styles.buttonArrow}>
              <ArrowIcon />
            </div>
          </button>
        </div>
      </div>

      {openModal && <Request closeModal={onClose} sourcePage="page: templates details, type: Request" />}
    </section>
  )
}
