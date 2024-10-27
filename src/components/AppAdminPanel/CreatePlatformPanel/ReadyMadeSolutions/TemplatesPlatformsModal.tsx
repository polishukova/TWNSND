import { useEffect, useState } from 'react'
import classNames from 'classnames'

import { ShortPlatformType } from '../../../../@types/types/platforms'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { getPlatforms, setIsOverwrite, setSearchValue } from '../../../../redux/Platforms/platformsSlice'
import { setPlatform } from '../../../../redux/AdminTemplatesCreate/adminTemplateCreateSlice'

import { AdminPanelSearchBar } from '../../AdminPanelHeader/AdminPanelSearchBar/AdminPanelSearchBar'
import ButtonNew, { ButtonNewTypes } from '../../../UI/ButtonNew'
import { PlatformList } from '../PlatForm/PlatformList/PlatformList'

import styles from './ReadyMadeSolutions.module.scss'

type TPlatformModal = {
  isOpen: boolean
  closeModal: () => void
  onSelectPlatforms: (selectedPlatform: ShortPlatformType | null) => void
}

export const PlatformModal: React.FC<TPlatformModal> = ({ isOpen, closeModal, onSelectPlatforms }) => {
  const dispatch = useAppDispatch()
  const { platforms, totalCount, searchValue } = useAppSelector((state) => state.platformsSlice)

  const [page, setPage] = useState<number>(0)
  const [currentDescending, setCurrentDescending] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<ShortPlatformType | null>(null)

  useEffect(() => {
    if (isOpen) {
      fetchPlatforms()
    }
  }, [isOpen, page, currentDescending, searchValue])

  useEffect(() => {
    if (searchValue) {
      setPage(0)
    }
  }, [searchValue])

  const fetchPlatforms = () => {
    const trimValue = searchValue.trim()
    dispatch(
      getPlatforms({
        data: {
          name: trimValue,
          skip: page * 9,
          take: 9,
          byDescending: currentDescending
        }
      })
    )
  }

  const getPlatformSortByDescending = (byDescending: boolean) => {
    setPage(0)
    setCurrentDescending(byDescending)
    dispatch(setSearchValue(''))
    fetchPlatforms()
  }

  const handleClick = () => {
    setPage(page + 1)
    dispatch(setIsOverwrite(true))
    fetchPlatforms()
  }

  const toggleSelectPlatform = (platform: ShortPlatformType | null) => {
    setSelectedPlatform(platform)
  }

  const handleSelect = () => {
    dispatch(setPlatform(selectedPlatform))
    closeModal()
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value))
  }

  const filteredPlatforms = platforms.filter((platform) =>
    platform.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <div
      className={classNames(styles.templatesModal__background, {
        [styles.templatesModal__backgroundClosed]: !isOpen
      })}>
      <div className={styles.templatesModal}>
        <div className={styles.templatesModal__header}>
          <AdminPanelSearchBar value={searchValue} onChange={handleSearchChange} />
        </div>
        <div className={classNames(styles.platformWrap, styles.platformWrapPopular)}>
          <PlatformList
            platforms={filteredPlatforms}
            onPlatformClick={toggleSelectPlatform}
            selectedPlatform={selectedPlatform}
          />
          {totalCount === platforms.length || platforms.length < 1 ? null : (
            <ButtonNew
              title={'Показать больше'}
              type={ButtonNewTypes.Primary}
              className={styles.btn}
              onClick={handleClick}
            />
          )}
        </div>
        <div className={styles.modalBtnsWrap}>
          <div className={styles.modalBtns__wrap}>
            <div className={styles.modalBtns__btn}>
              <ButtonNew title={'Выбрать'} type={ButtonNewTypes.Secondary} onClick={handleSelect} />
            </div>
            <div className={styles.modalBtns__btn}>
              <ButtonNew title={'Отменить'} type={ButtonNewTypes.Primary} onClick={closeModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
