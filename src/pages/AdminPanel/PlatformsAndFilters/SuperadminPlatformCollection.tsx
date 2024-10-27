import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import PlatformCard from '../../../components/APP/PlatformCard'
import Button, { ButtonTypes } from '../../../components/UI/Button'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { getPlatforms, getSearchPlatforms } from '../../../redux/Platforms/platformsSlice'

import PlusWhite from '../../../assets/AccountIcons/PlusWhite'

import ModalWindow from '../../../components/APP/ModalWindow/ModalWindow'

import Archive from '../../../assets/PlatformCard/Archive'

import { UpDownArrows } from '../../../assets/AdminPanel/Platforms/UpDownArrows'

import styles from './PlatformsAndFilters.module.scss'

const CREATE_PLATFORM_LINK = '/admin/platforms/create'

const SuperadminPlatformCollection = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { platforms, searchValue } = useAppSelector((state) => state.platformsSlice)
  const page = 0
  const pageSearch = 0
  const activeLetter = 'Показать все'
  const currentDescending = false

  useEffect(() => {
    if (!searchValue) {
      dispatch(
        getPlatforms({
          data: {
            letter: activeLetter === 'Показать все' ? '' : activeLetter,
            skip: page * 9,
            take: 30,
            byDescending: currentDescending,
            isShowUnpublised: true
          }
        })
      )
    } else {
      const trimValue = searchValue.trim()
      if (trimValue) {
        dispatch(
          getSearchPlatforms({
            data: {
              name: trimValue,
              skip: pageSearch * 9,
              take: 9
            }
          })
        )
      }
    }
  }, [dispatch, page, pageSearch, activeLetter, searchValue, currentDescending])

  return (
    <div>
      <div className={styles.headerControl}>
        <h1 className={styles.title}>Платформы</h1>
        <div className={styles.buttonsControl}>
          <Button
            className={styles.buttonControl}
            title={<span>Опубликованные</span>}
            type={ButtonTypes.Primary}
            icon={<UpDownArrows />}
          />
          <Button
            className={styles.buttonControl}
            title={<span>Архив</span>}
            type={ButtonTypes.Primary}
            icon={<Archive />}
          />
        </div>
      </div>
      <div className={styles.platformsCards}>
        <Link to={CREATE_PLATFORM_LINK} className={styles.createCard}>
          <div className={styles.createCardWrapper}>
            <div className={styles.createCardBody}>
              <div className={styles.createCardCircle}>
                <PlusWhite />
              </div>
            </div>
            <h2 className={styles.createCardTitle}>Создать карточку платформы</h2>
          </div>
        </Link>
        {platforms?.map((platform) => (
          <PlatformCard
            onClick={() => navigate(`/platforms/${platform.id}`)}
            platform={platform}
            key={platform.id}
            index={platform.id}
            searchValue={searchValue}
            pageSearch={pageSearch}
            page={page}
            isAdminPublished
          />
        ))}
      </div>
      <ModalWindow title={'Уверены, что хотите снять платформу с публикации?'} type={'toRemovePublished'} />
      <ModalWindow title={'Уверены, что хотите опубликовать платформу?'} type={'toPublish'} />
    </div>
  )
}

export default SuperadminPlatformCollection
