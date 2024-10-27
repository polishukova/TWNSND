import { useEffect, useState } from 'react'
import classNames from 'classnames'

import { useWindowSize } from '../../hooks/useWindowsSize'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import { getTemplates } from '../../redux/Templates/templatesSlice'

import Baner from '../../components/UI/Baner'
import Search from '../../components/UI/Search'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'
import { Basket } from '../../assets/img/Basket'
import FilterIcon from '../../assets/img/platforms/FilterIcon'
import ArrowLineLeft from '../../assets/DetailedFilterIcons/ArrowLineLeft'

import Loader from '../../components/UI/Loader'

import styles from './Templates.module.scss'
import { FiltersCard } from './filtersCard'
import { TemplatesCard } from './templatesCard'

export const mocArr = [
  {
    id: 1,
    imageUrl: null,
    name: 'Универсальный чат-бот для общения с клиентами в мессенджерах',
    description: '',
    cost: 120,
    rating: 4.1,
    isUserFavorite: false
  },
  {
    id: 2,
    imageUrl: null,
    name: 'Универсальный чат-бот для общения с клиентами в мессенджерах',
    description: '',
    cost: 120,
    rating: 4.1,
    isUserFavorite: false
  },
  {
    id: 3,
    imageUrl: null,
    name: 'Универсальный чат-бот для общения с клиентами в мессенджерах',
    description: '',
    cost: 120,
    rating: 4.1,
    isUserFavorite: false
  },
  {
    id: 4,
    imageUrl: null,
    name: 'Универсальный чат-бот для общения с клиентами в мессенджерах',
    description: '',
    cost: 120,
    rating: 4.1,
    isUserFavorite: false
  },
  {
    id: 5,
    imageUrl: null,
    name: 'Универсальный чат-бот для общения с клиентами в мессенджерах',
    description: '',
    cost: 120,
    rating: 4.1,
    isUserFavorite: false
  },
  {
    id: 6,
    imageUrl: null,
    name: 'Универсальный чат-бот для общения с клиентами в мессенджерах',
    description: '',
    cost: 120,
    rating: 4.1,
    isUserFavorite: false
  },
  {
    id: 7,
    imageUrl: null,
    name: 'Универсальный чат-бот для общения с клиентами в мессенджерах',
    description: '',
    cost: 120,
    rating: 4.1,
    isUserFavorite: false
  },
  {
    id: 8,
    imageUrl: null,
    name: 'Универсальный чат-бот для общения с клиентами в мессенджерах',
    description: '',
    cost: 120,
    rating: 4.1,
    isUserFavorite: false
  },
  {
    id: 9,
    imageUrl: null,
    name: 'Универсальный чат-бот для общения с клиентами в мессенджерах',
    description: '',
    cost: 120,
    rating: 4.1,
    isUserFavorite: false
  }
]

const Templates = () => {
  const [displayNumber, setdisplayNumber] = useState(9)
  const [inputValue, setInputValue] = useState('')
  const [isActive, setIsActive] = useState(true)

  const dispatch = useAppDispatch()
  const { templatesStatus, templatesTotalCount } = useAppSelector((state) => state.templatesSlice)

  const { width = 0 } = useWindowSize()
  const isTablet = width <= 768
  const isMobile = width <= 380
  const isActiveMobile = isActive && isMobile

  useEffect(() => {
    setIsActive(isTablet ? false : true)
    dispatch(
      getTemplates({
        data: {
          take: displayNumber
        }
      })
    )
  }, [dispatch, displayNumber, isTablet])

  const handleActive = () => setIsActive((prev) => !prev)

  return (
    <div className={styles.wrap}>
      <Baner />
      <Search inputValue={inputValue} setInputValue={setInputValue} className={styles.search} />
      <div className={styles.filterBtn} onClick={() => handleActive()}>
        <p>Фильтр</p>
        <div>{isActive ? <ArrowLineLeft /> : <FilterIcon />}</div>
      </div>
      <div className={styles.inner}>
        {isActive && (
          <div className={styles.filters}>
            <FiltersCard inputValue={inputValue} />
            <div className={styles.label}>
              <div className={styles.filterTitle}>Стоимость</div>
              <div className={styles.priceFilter}>
                <span>от</span>
                <input type="number" placeholder="0" className={styles.price}></input>
                <span>до</span>
                <input type="number" placeholder="99.999" className={styles.price}></input>
                <span>RUB</span>
              </div>
            </div>
            <div className={styles.deleteFilter}>
              <Basket />
              Очистить историю
            </div>
          </div>
        )}
        {templatesStatus !== 'fullfilled' && displayNumber === 9 ? (
          <Loader className={styles.loaderFullScreen} />
        ) : (
          !isActiveMobile && (
            <div
              className={classNames(styles.platformWrap, styles.platformWrapPopular)}
              // style={{ height: templatesCardsLength ? '357px' : '100%' }}
            >
              <TemplatesCard />
            </div>
          )
        )}
      </div>

      {displayNumber < templatesTotalCount && !isActiveMobile && (
        <ButtonNew
          title={'Показать больше'}
          type={ButtonNewTypes.Primary}
          className={styles.btn}
          onClick={() => {
            setdisplayNumber(displayNumber + 9)
          }}
        />
      )}
    </div>
  )
}

export default Templates
