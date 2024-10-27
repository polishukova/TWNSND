import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { TemplateNewType } from '../../../@types/types/templates'

import PlatformTemplateCard from '../../UI/PlatformTemplateCard'

import { offScrollModal } from '../../../utils/offScrollModal'

import styles from '../../../pages/Templates/Templates.module.scss'
import Request from '../Request'

type FavoriteTemplatesProps = {
  cards: TemplateNewType[]
  onClickBye?: () => void
}
export const FavoriteTemplates = (props: FavoriteTemplatesProps) => {
  const [isOpenModal, toggleIsActiveRequestModal] = useState(false)

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
    <div className={styles.platformWrap}>
      {props.cards.map((value: TemplateNewType, index: number) => (
        <PlatformTemplateCard
          onClick={() => navigate(`/templates/${index}`)}
          onBuyClick={handleBuy}
          title={value.name}
          like={value.isUserFavorite ? value.isUserFavorite : false}
          rating={String(value.rating)}
          id={value.id}
          index={index}
          className={styles.templatedCard}
        />
      ))}
      <>{isOpenModal && <Request closeModal={onClose} sourcePage={''} />}</>
    </div>
  )
}
