import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import { getFilteredPlatforms, getSearchPlatforms, setSearchValue } from '../../../redux/Platforms/platformsSlice'

import ArrowLineLeft from '../../../assets/DetailedFilterIcons/ArrowLineLeft'

import { offScrollModal } from '../../../utils/offScrollModal'

import Button, { ButtonTypes } from '../Button'
import Loader from '../Loader'

import { DetailedFilterItem } from './DetailedFilterItem/DetailedFilterItem'

import styles from './DetailedFilter.module.scss'

type DetailedFilterType = {
  isOpen: boolean
  openDetailedFilter: (value: boolean) => void
  setFilters: (arr: number[]) => void
  setPlatformCost: (cost: { from: string, to: string }) => void,
  currentDescending: boolean
}

export const DetailedFilter = ({ isOpen, openDetailedFilter, setFilters,
  setPlatformCost, currentDescending }: DetailedFilterType) => {
  const [openSelector, setOpenSelector] = useState(false)
  const [activeFilter, setActiveFilter] = useState<Array<string>>([])
  const [platformFilters, setPlatformFilters] = useState<Array<number>>([])
  const [clearAll, setClearAll] = useState(false)
  const [cost, setCost] = useState({ from: '', to: '' })

  const dispatch = useAppDispatch()
  const { filtersData } = useAppSelector((state) => state.platformsSlice)
  const filtersStatus = useAppSelector((state) => state.statusPlatformsSlice.statusGetFiltes)
  const { searchValue } = useAppSelector((state) => state.platformsSlice)
  const isTariffFromEndsWithComma = cost.from[cost.from.length - 1] === ',' || cost.from[cost.from.length - 1] === '.'
  const isTariffToEndsWithComma = cost.to[cost.to.length - 1] === ',' || cost.to[cost.to.length - 1] === '.'

  useEffect(() => {
    if (filtersStatus === 'rejected') {
      openDetailedFilter(false)
    }
  }, [filtersStatus])

  const handleChangeSelect = (id: string) => {
    if (!activeFilter.includes(id)) {
      setActiveFilter([...activeFilter, id])
    } else {
      const currentFilters = activeFilter.filter((item) => item !== id)
      setActiveFilter([...currentFilters])
    }

    setOpenSelector(!openSelector)
  }

  const handleAddPlatformFilters = (id: number, prevRadioactive?: number) => {
    if (!platformFilters.includes(id)) {
      if (prevRadioactive !== undefined) {
        const currentFilters = platformFilters.filter((item) => item !== prevRadioactive)
        setPlatformFilters([...currentFilters, id])
        setFilters([...currentFilters, id])
      } else {
        setPlatformFilters([...platformFilters, id])
        setFilters([...platformFilters, id])
      }
    } else {
      const currentFilters = platformFilters.filter((item) => item !== id)
      setPlatformFilters([...currentFilters])
      setFilters([...currentFilters])
    }
    setClearAll(false)
  }

  const handleApplyFilters = () => {
    if (platformFilters.length > 27) {
      openDetailedFilter(false)
      toast.error('Максимально возможное количество фильтров превышено.')
      return
    }
    if (cost.to && Number(cost.from) > Number(cost.to)) return
    if (isTariffFromEndsWithComma) {
      setCost({ ...cost, ['from']: cost.from + '0' })
      setPlatformCost({ ...cost, ['from']: cost.from + '0' })
    }
    if (isTariffToEndsWithComma) {
      setCost({ ...cost, ['to']: cost.to + '0' })
      setPlatformCost({ ...cost, ['to']: cost.to + '0' })
    }
    dispatch(
      getFilteredPlatforms({
        parametersId: parametersString,
        costFrom: cost.from ? (
          isTariffFromEndsWithComma ?
            (cost.from + '0') : cost.from) : '0',
        costTo: cost.to ? (
          isTariffToEndsWithComma ?
            (cost.to + '0') : cost.to) : '10000',
        skip: 0,
        take: 9,
        byDescending: false
      })
    )
    openDetailedFilter(false)
    offScrollModal()
    dispatch(setSearchValue(''))
  }

  const handleClearAll = () => {

    if (!searchValue) {
      dispatch(
        getFilteredPlatforms({
          parametersId: '',
          costFrom: '0',
          costTo: '10000',
          skip: 0,
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
              skip: 0,
              take: 9,
              byDescending: currentDescending
            }
          })
        )
      }
    }
    setClearAll(true)
    setPlatformFilters([])
    setFilters([])
    setCost({ from: '', to: '' })
    setPlatformCost({ from: '', to: '' })
    setActiveFilter([])
  }

  const handleChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex1 = new RegExp(/^((10000((\.|,)[0-9]{1,2})?)|([0-9]{1,4}((\.|,)[0-9]{0,2})?))$/)
    const length = e.target.value.length
    if (e.target.value[0] === '0' && length > 1 && e.target.value[1] !== '.' && e.target.value[1] !== ',') {
      e.target.value = e.target.value.slice(0, length - 1)
    }
    if (regex1.test(e.target.value) || e.target.value === '') {
      setCost({ ...cost, [e.target.name]: e.target.value })
      setPlatformCost({ ...cost, [e.target.name]: e.target.value })
    } else {
      e.target.value = e.target.value.slice(0, length - 1)
    }
  }

  const parametersString = platformFilters.map((param) => `parametersId=${param}`).join('&')

  return (
    <div
      className={classNames(styles.wrap, {
        [styles.hidden]: !isOpen
      })}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Фильтр</h1>
          <div
            className={styles.iconBack}
            onClick={() => {
              openDetailedFilter(false)
              offScrollModal()
            }}>
            <ArrowLineLeft />
          </div>
        </div>
        {filtersStatus !== 'fulfilled' ? (
          <Loader />
        ) : (
          <div className={styles.selectsContainer}>
            {filtersData.map((filterItem, index) => (
              <DetailedFilterItem
                key={index}
                filterItem={filterItem}
                activeFilter={activeFilter}
                platformFilters={platformFilters}
                clearAll={clearAll}
                handleChangeSelect={handleChangeSelect}
                handleAddPlatformFilters={handleAddPlatformFilters}
                cost={filterItem.name === 'Тарифы' ? cost : undefined}
                handleChangeCost={filterItem.name === 'Тарифы' ? handleChangeCost : undefined}
              />
            ))}
          </div>
        )}
        {(platformFilters.length !== 0 || cost.from || cost.to) && (
          <div className={styles.btns}>
            <Button
              title={'Очистить фильтр'}
              type={ButtonTypes.Primary}
              onClick={handleClearAll}
              className={styles.btnFilterReset}
            />
            <Button
              title={'Применить'}
              type={ButtonTypes.Primary}
              className={styles.btnFilterAccept}
              onClick={handleApplyFilters}
            />
          </div>
        )}
      </div>
    </div>
  )
}
