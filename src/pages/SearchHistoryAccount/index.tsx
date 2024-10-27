import classNames from 'classnames'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import imgSearch from '../../assets/img/search.svg'
import BasketIcon from '../../assets/img/BasketIcon'
import PlatformCard from '../../components/APP/PlatformCard'
import PlatformTemplateCard from '../../components/UI/PlatformTemplateCard'
import Loader from '../../components/UI/Loader'
import { useWindowSize } from '../../hooks/useWindowsSize'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  deleteViewedCardsFromBd,
  getViewedPlatfroms,
  getViewedPlatfromTemplates
} from '../../redux/ViewedCards/viewedCardsSlice'
import CreateCard from '../../components/UI/CreateCard'

import { PathNames } from '../Router/types'

import styles from './SearchHistoryAccount.module.scss'

const SearchHistoryAccount = () => {
  const dispatch = useAppDispatch()
  const { width = 0 } = useWindowSize()
  const navigate = useNavigate()
  const { viewedPlatfroms, viewedPlatfromTemplates } = useAppSelector((state) => state.viewedCardsSlice)
  const { statusViewedCards, statusViewedPlatfromTemplates } = useAppSelector((state) => state.statusViewedCardsSlice)

  useEffect(() => {
    dispatch(getViewedPlatfromTemplates())
    dispatch(getViewedPlatfroms())
  }, [dispatch])

  const deleteCards = () => {
    dispatch(deleteViewedCardsFromBd())
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>Готовые решения</h3>
          <button className={styles.button} onClick={deleteCards}>
            <BasketIcon /> {width > 840 && 'Очистить историю'}
          </button>
        </div>

        {statusViewedPlatfromTemplates === 'fullfilled' || statusViewedCards === 'fullfilled' ? (
          viewedPlatfromTemplates.length === 0 ? (
            <div className={styles.cardsWrapper}>
              <CreateCard
                title="Добавь готовое решение"
                description="На экране появятся готовые решения, просмотренные за последнее время"
                link={PathNames.Templates}
              />
            </div>
          ) : (
            <div className={styles.cardsWrapper}>
              {viewedPlatfromTemplates.map((platformTemplate, index) => (
                <div key={index}>
                  <PlatformTemplateCard
                    title={platformTemplate.name}
                    like={true}
                    rating={platformTemplate.rating.toString()}
                    id={platformTemplate.id}
                    index={index}
                  />
                </div>
              ))}
            </div>
          )
        ) : (
          <Loader className={styles.loader} />
        )}
      </div>

      <div className={styles.container}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>Платформы</h3>
        </div>
        {statusViewedPlatfromTemplates === 'fullfilled' || statusViewedCards === 'fullfilled' ? (
          viewedPlatfroms.length === 0 ? (
            <div className={styles.cardsWrapper}>
              <CreateCard
                title="Добавь платформу"
                description="На экране появятся платформы, просмотренные за последнее время"
                link={PathNames.Platforms}
              />
            </div>
          ) : (
            <div className={classNames(styles.cardsWrapper, styles.platformsWrapper)}>
              {viewedPlatfroms.map((viewedPlatfrom, index) => (
                <div key={index}>
                  <PlatformCard
                    onClick={() => navigate(`/platforms/${viewedPlatfrom.id}`)}
                    platform={viewedPlatfrom}
                    index={index}
                  />
                </div>
              ))}
            </div>
          )
        ) : (
          <Loader className={styles.loader} />
        )}
      </div>
    </div>
  )
}
export default SearchHistoryAccount
