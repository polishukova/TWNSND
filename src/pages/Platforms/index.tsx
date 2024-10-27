import { useEffect, useState } from 'react'

import classNames from 'classnames'

import { useNavigate } from 'react-router-dom'

import { useWindowSize } from '../../hooks/useWindowsSize'

import { ADMIN, MODERATOR, SUPERADMIN } from '../../@types/roles'

import PlatformCard from '../../components/APP/PlatformCard'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'
import Search from '../../components/UI/Search'
import Baner from '../../components/UI/Baner'
import PlatformInfo from '../../components/APP/PlatformInfo'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getFilteredPlatforms, getPlatforms, getSearchPlatforms, setIsOverwrite, setSearchValue } from '../../redux/Platforms/platformsSlice'
import { Sort } from '../../components/UI/Sort'
import { NoSearchResultBlock } from '../../components/UI/NoSearchResultsBlock/NoSearchResultBlock'
import { DetailedFilter } from '../../components/UI/DetailedFilter'
import { SortByName } from '../../components/UI/SortByName'


import styles from './Platforms.module.scss'

const Platforms = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { platforms, totalCount, searchValue } = useAppSelector((state) => state.platformsSlice)
  const [platformFilters, setPlatformFilters] = useState<Array<number>>([])
  const [cost, setCost] = useState({ from: '', to: '' })
  const [page, setPage] = useState<number>(0)
  const [pageSearch, setPageSearch] = useState<number>(0)
  const [currentDescending, setCurrentDescending] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const [openedFilter, setOpenedFilter] = useState(false)

  const userRole = localStorage.getItem('userRole')?.replace(/"/g, '')
  const admin = userRole === ADMIN || userRole === SUPERADMIN || userRole === MODERATOR
  const isShowUnpublised = admin
  const parametersString = platformFilters.map((param) => `parametersId=${param}`).join('&')
  const { width = 0 } = useWindowSize()

  useEffect(() => {
    if (!searchValue) {
      dispatch(
        getFilteredPlatforms({
          parametersId: parametersString,
          costFrom: cost.from ? cost.from : '0',
          costTo: cost.to ? cost.to : '10000',
          skip: page * 9,
          take: 9,
          byDescending: currentDescending
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
              take: 9,
              byDescending: currentDescending
            }
          })
        )
      }
    }
  }, [dispatch, page, pageSearch, searchValue, currentDescending, isShowUnpublised])

  useEffect(() => {
    setPage(0)
    setPageSearch(0)
  }, [searchValue])

  const getPlatformSortByDescending = (byDescending: boolean) => {
    /*     setInputValue('')
        dispatch(setSearchValue(''))
        dispatch(setSearchValue('')) */
    setPage(0)
    setCurrentDescending(byDescending)
    /* inputValue === '' && dispatch(getFilteredPlatforms({
      parametersId: parametersString,
      costFrom: cost.from,
      costTo: cost.to,
      skip: page * 9,
      take: 9,
      byDescending: currentDescending
    })) */
  }

  const openDetailedFilter = (value: boolean) => {
    setOpenedFilter(value)
  }

  const handleClick = () => {
    searchValue ? setPageSearch(pageSearch + 1) : setPage(page + 1)
    dispatch(setIsOverwrite(true))
  }

  return (
    <div className={styles.platformWrap}>
      <DetailedFilter isOpen={openedFilter} openDetailedFilter={openDetailedFilter} setFilters={setPlatformFilters}
        setPlatformCost={setCost} currentDescending={currentDescending} />
      <Baner />
      <Search inputValue={inputValue} setInputValue={setInputValue} className={styles.search} />
      {(width < 635 || width > 768) &&
        <SortByName getPlatformSortByDescending={getPlatformSortByDescending} openFilter={openDetailedFilter} />}
      <div className={classNames(styles.platformInner, { [styles.platformInnerNan]: platforms.length === 0 })}>
        <div className={styles.sort}>
          <Sort openDetailedFilter={openDetailedFilter} />
          {width > 634 && width < 769 &&
            <SortByName getPlatformSortByDescending={getPlatformSortByDescending} openFilter={openDetailedFilter} />}
        </div>
        <div className={styles.layout}>
          {platforms.length !== 0 ? (
            <div className={styles.platformsCards}>
              {platforms.map((platform, index) => (
                <PlatformCard
                  onClick={() => navigate(`/platforms/${platform.id}`)}
                  platform={platform}
                  key={platform.name + index}
                  index={index}
                  searchValue={searchValue}
                  pageSearch={pageSearch}
                  page={page}
                />
              ))}
            </div>
          ) : (
            <NoSearchResultBlock searchValue={searchValue} />
          )}
          {totalCount === platforms.length || platforms.length < 1 ? null : (
            <ButtonNew
              title={'Показать больше'}
              type={ButtonNewTypes.Primary}
              className={styles.btn}
              onClick={handleClick}
            />
          )}
        </div>
      </div>
      <PlatformInfo />
    </div>
  )
}

export default Platforms
