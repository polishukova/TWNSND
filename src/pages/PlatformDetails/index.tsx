/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  createPlatformReview,
  getPlatform,
  getPlatformReviews,
  setIsOverwritePlatformReviews,
  clearPlatformReview
} from '../../redux/Platforms/platformsSlice'
import { SERVER } from '../../@types/constant'

import { ParamersFiltersType } from '../../@types/types/platforms'

import TabsWorks from '../../components/APP/TabsWorks'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'
import PlatformDetailsFn, { TabPlatformType } from '../../components/UI/PlatformDetailsFn'
import PlatformTemplateCard from '../../components/UI/PlatformTemplateCard'
import Loader from '../../components/UI/Loader'
import ReviewCard from '../../components/APP/ReviewCard'
import { useToggle } from '../../hooks/useToggle'
import ModalReview from '../../layout/ModalReview'
import ShortUserInfo from '../../components/UI/ShortUserInfo'
import Plas from '../../assets/img/platforms/Plas'
import { setStatusPlatformReviews } from '../../redux/Platforms/statusSlice'
import { addPlatformToFavorites, removePlatformFromFavorites } from '../../redux/FavoritesCards/favoritesCardsSlice'

import { offScrollModal } from '../../utils/offScrollModal'

import Request from '../../components/APP/Request'

import { getTemplates } from '../../redux/Templates/templatesSlice'

import { FavoriteTemplates } from '../../components/APP/FavTemplates/favoriteTemplates'

import styles from './PlatformDetails.module.scss'

const PlatformDetails = () => {
  const refScroll = useRef<null | HTMLDivElement>(null)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [tab, setTab] = useState('')
  const { platform, platformReviews, totalCountReviews } = useAppSelector((state) => state.platformsSlice)
  const { statusPlatform } = useAppSelector((state) => state.statusPlatformsSlice)
  const { registerUser } = useAppSelector((state) => state.signInSlice)

  const { userData } = useAppSelector((state) => state.userSlice)
  const [page, setPage] = useState<number>(0)
  const [isOpenReviewModal, toggleIsOpenReviewModal] = useToggle()
  const [reviewText, setReviewText] = useState('')
  const messengers = platform?.filters.find((filter) => filter.name === 'Мессенджеры')?.parameters
  const { templatesCards } = useAppSelector((state) => state.templatesSlice)
  const [isOpenModal, toggleModal] = useState(false)
  const [displayNumber, setdisplayNumber] = useState(9)

  useEffect(() => {
    dispatch(
      getTemplates({
        data: {
          take: displayNumber
        }
      })
    )
  }, [dispatch, displayNumber])

  useEffect(() => {
    if (id) {
      dispatch(getPlatform(id))
    }
  }, [id])

  const getMoreReviews = () => {
    setPage(page + 1)
    dispatch(setIsOverwritePlatformReviews(true))
  }

  const sendReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (reviewText.length <= 500 && reviewText) {
      if (id) {
        const data = { platformId: +id, text: reviewText }
        dispatch(
          createPlatformReview({
            data,
            callback: () => {
              toast.success('Отзыв отправлен!')
              dispatch(setStatusPlatformReviews(''))
              dispatch(clearPlatformReview())
              setPage(0)
              getPlatforms()
              closeModal()
              setReviewText('')
            }
          })
        )
      }
    } else {
      if (reviewText.length > 500) {
        toast.error('Длина отзыва не должна превышать 500 символов')
      } else {
        toast.error('Добавьте отзыв перед отправкой')
      }
    }
  }

  const getPlatforms = () => {
    if (id) {
      dispatch(
        getPlatformReviews({
          data: {
            platformId: +id,
            skip: page * 6,
            take: 6,
            byDescending: false
          }
        })
      )
    }
  }

  const closeModal = () => {
    toggleIsOpenReviewModal()
    setReviewText('')
  }

  const addToFavorites = () => {
    if (id) {
      dispatch(
        addPlatformToFavorites({
          platformId: Number(id),
          callback: () => {
            dispatch(getPlatform(id))
          }
        })
      )
    }
  }

  const removeFromFavorites = () => {
    if (id) {
      dispatch(
        removePlatformFromFavorites({
          platformId: Number(id),
          callback: () => {
            dispatch(getPlatform(id))
          }
        })
      )
    }
  }

  const onCloseModal = () => {
    toggleModal(false)
    offScrollModal()
  }

  const onPlaformClick = () => {
    return !platform?.isUserFavorite ? addToFavorites() : removeFromFavorites()
  }

  return statusPlatform === 'fullfilled' ? (
    <div className={styles.wrap}>
      <div className={styles.detailsCard}>
        <div className={styles.infoPlatform}>
          <a href={platform?.url} className={`${styles.title} ${styles.link}`}>
            {platform?.name}
          </a>
          <div className={styles.desc}>{platform?.description}</div>
          <div className={styles.messengers}>
            {messengers?.map((value, index) => (
              <span key={value.id}>{index === messengers.length - 1 ? value.name : `${value.name}, `}</span>
            ))}
          </div>
          <div className={styles.control}>
            <ButtonNew
              onClick={() => {
                setTab('')
                refScroll.current && refScroll.current?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={styles.btn}
              title={'Шаблоны'}
              type={ButtonNewTypes.Primary}
            />
            {registerUser && (
              <div className={styles.addPlatform} onClick={onPlaformClick}>
                {!platform?.isUserFavorite ? 'Добавить в избранное' : 'Удалить из избранного'}
                <Plas />
              </div>
            )}
          </div>
        </div>
        <div className={styles.logoPlatform}>
          <a href={platform?.url} target="_blank" rel="noreferrer">
            <img src={SERVER + platform?.imageUrl} alt="logo platform" />
          </a>
        </div>
      </div>
      <div className={styles.PlatformDetailsFn}>
        <PlatformDetailsFn
          btnText={'Как работает'}
          type={TabPlatformType.Instruction}
          onClick={() => setTab(TabPlatformType.Instruction)}
          tab={tab}
        />
        <PlatformDetailsFn
          btnText={'Отзывы'}
          type={TabPlatformType.Кeviews}
          rating={platform?.rating}
          onClick={() => setTab(TabPlatformType.Кeviews)}
          tab={tab}
          totalCount={totalCountReviews}
        />
      </div>
      {!tab ? (
        <>
          <h2 className={styles.title}>Популярные готовые решения на базе платформы </h2>
          <FavoriteTemplates cards={templatesCards.slice(0, 4)} />
          <h2 ref={refScroll} className={styles.title}>
            Все готовые решения
          </h2>
          <FavoriteTemplates cards={templatesCards} />
        </>
      ) : tab === TabPlatformType.Instruction ? (
        <TabsWorks platform={platform} />
      ) : (
        <div className={styles.reviewsWrapper}>
          <button
            className={styles.addReview}
            disabled={!registerUser}
            onClick={() => {
              toggleIsOpenReviewModal()
            }}>
            Написать отзыв
          </button>
          <div className={styles.reviews}>
            {platformReviews.map((review, index) => {
              return <ReviewCard review={review} key={index} page={page} index={index} />
            })}
          </div>
          {totalCountReviews !== platformReviews.length && platformReviews.length > 1 && (
            <ButtonNew
              title={'Показать больше'}
              type={ButtonNewTypes.Primary}
              className={styles.btn}
              onClick={getMoreReviews}
            />
          )}
        </div>
      )}

      {isOpenModal && <Request closeModal={onCloseModal} sourcePage={''} />}

      {
        <AnimatePresence>
          {isOpenReviewModal && userData && (
            <ModalReview closeModal={closeModal}>
              <ShortUserInfo
                firstName={userData.given_name}
                lastName={userData.family_name}
                photo={null}
                email={userData.email}
              />
              <form
                onSubmit={(e) => {
                  sendReview(e)
                }}
                className={styles.reviewForm}>
                <textarea
                  className={styles.reviewArea}
                  name="reviewText"
                  placeholder="Текст..."
                  onChange={(e) => setReviewText(e.target.value)}></textarea>
                <div className={styles.symbolCount}>{reviewText.length}/500</div>

                <button type="submit" className={styles.reviewbutton}>
                  Опубликовать отзыв
                </button>
              </form>
            </ModalReview>
          )}
        </AnimatePresence>
      }
    </div>
  ) : (
    <Loader className={styles.loader} />
  )
}

export default PlatformDetails
