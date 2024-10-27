import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../redux/hooks'
import PlatformTemplateCard from '../../components/UI/PlatformTemplateCard'

import { offScrollModal } from '../../utils/offScrollModal'

import Request from '../../components/APP/Request'

import styles from './Templates.module.scss'

export const TemplatesCard = () => {
  const [isActiveRequestModal, toggleIsActiveRequestModal] = useState(false)

  const { templatesCards } = useAppSelector((state) => state.templatesSlice)
  const navigate = useNavigate()

  const handleBuy = () => {
    toggleIsActiveRequestModal(true)
    offScrollModal()
  }

  const onClose = () => {
    toggleIsActiveRequestModal(false)
    offScrollModal()
  }

  return (
    <>
      {templatesCards.map((value, index) => (
        <PlatformTemplateCard
          onClick={() => navigate(`/templates/${value.id}`)}
          onBuyClick={handleBuy}
          title={value.name}
          like={value.isUserFavorite ? value.isUserFavorite : false}
          rating={String(value.rating)}
          id={value.id}
          index={index}
          className={styles.templatedCard}
        />
      ))}

      {isActiveRequestModal && <Request closeModal={onClose} sourcePage="page: templates details, type: Request" />}
    </>
  )
}
