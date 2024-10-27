import { useState } from 'react'

import classNames from 'classnames'

import { useAppSelector } from '../../../../redux/hooks'

import PlusIcon from '../../../../assets/img/PlusIcon'

import AdminPlatformTemplateCard from '../../../UI/AdminPlatformTemplateCard'

import { TemplatesModal } from './TemplatesModal'

import styles from './ReadyMadeSolutions.module.scss'

/* type SolutionsProps = {
  isPopular?: boolean
} */

export const ReadyMadeSolutions = (/* { isPopular }: SolutionsProps */) => {
  const [modalOpen, setModalOpen] = useState(false)
  const chosenSolutions = useAppSelector(
    (state) =>
      /*  isPopular
      ? state.adminPlatformCreateSlice.popularReadyMadeSolutions
      : */ state.adminPlatformCreateSlice.readyMadeSolutions
  )

  return (
    <div className={classNames(styles.platformWrapList /* , styles.platformWrapPopular */)}>
      <div className={styles.solutions__card} onClick={() => setModalOpen(true)}>
        <div className={styles.card__addBtn}>
          <PlusIcon />
        </div>
        <p className={styles.card__desc}>{'Добавить готовое ' /* + (isPopular ? 'популярное ' : '') */ + 'решение'}</p>
      </div>
      {chosenSolutions.map((value, index) => (
        <AdminPlatformTemplateCard
          key={'template ' + value.id + index}
          index={index}
          template={value}
          className={styles.templatedCardList}
          isOnCreatePage
          /* isPopular={isPopular} */
        />
      ))}
      <TemplatesModal /* isPopular={isPopular} */ isOpen={modalOpen} closeModal={() => setModalOpen(false)} />
    </div>
  )
}
