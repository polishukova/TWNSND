import { useState } from 'react'

import classNames from 'classnames'

import { useAppSelector } from '../../../../redux/hooks'

import PlusIcon from '../../../../assets/img/PlusIcon'

import { AddTagModal } from './AddTagModal'

import styles from './AddableSection.module.scss'
import { AddIntegrationModal } from './AddIntegrationModal'

type AddableSectionProps = {
  plusFirst?: boolean
  title: string
  filterName?: string
  filterId?: number
}
export const AddableSection = ({ plusFirst, title, filterName, filterId }: AddableSectionProps) => {
  const chosenFilter = useAppSelector((state) => {
    if (state.adminFiltersSlice.allFilters && plusFirst) {
      return state.adminFiltersSlice.allFilters
        .find((filter) => filter.name === filterName)
        ?.filters.find((filter) => filter.name === title)
    }
  })
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <div
        className={classNames(styles.template__section, {
          [styles.template__sectionPlusFirst]: plusFirst
        })}
        onClick={() => {
          setOpenModal(true)
        }}>
        {plusFirst && <PlusIcon />}
        <p
          className={classNames(styles.section__title, {
            [styles.section__titlePlusFirst]: plusFirst
          })}>
          {' '}
          {plusFirst ? 'Добавить ' + title : title}
        </p>
        {!plusFirst && <PlusIcon />}
      </div>
      {title === 'Добавьте Тэг' && (
        <AddTagModal isOpened={openModal} closeModal={() => setOpenModal(false)}></AddTagModal>
      )}
      {plusFirst && chosenFilter /* && title !== 'Мессенджеры' */ && (
        <AddIntegrationModal
          isOpened={openModal}
          closeModal={() => setOpenModal(false)}
          title={chosenFilter.name}
          params={chosenFilter.parameters}
          id={chosenFilter.id}
          filterName={filterName ? filterName : ''}
          filterId={filterId ? filterId : 0}></AddIntegrationModal>
      )}
    </>
  )
}
