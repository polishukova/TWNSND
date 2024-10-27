import { useState } from 'react'

import classNames from 'classnames'

import { FiltersDataType } from '../../../../@types/types/platforms'

import { useWindowSize } from '../../../../hooks/useWindowsSize'

import ArrowBottomSelect from '../../../../assets/DetailedFilterIcons/ArrowBottomSelect'
import ArrowUpSelect from '../../../../assets/DetailedFilterIcons/ArrowUpSelect'

import { RangeInputsGroup } from '../../RangeInputsGroup/RangeInputsGroup'

import styles from '.././DetailedFilter.module.scss'

import { StatisticsFiltersList } from './StatisticsFiltersList'
import { FiltersList } from './FiltersList'

type DetailedFilterItemType = {
  filterItem: FiltersDataType
  activeFilter: string[]
  platformFilters: number[]
  clearAll: boolean
  cost?: { from: string; to: string }
  handleChangeCost?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined
  handleChangeSelect: (id: string) => void
  handleAddPlatformFilters: (id: number, prevRadioactive?: number) => void
}

export const DetailedFilterItem = ({
  filterItem,
  activeFilter,
  platformFilters,
  clearAll,
  cost,
  handleChangeCost,
  handleChangeSelect,
  handleAddPlatformFilters
}: DetailedFilterItemType) => {
  const [isClosed, setIsClosed] = useState(true)

  const { width = 0 } = useWindowSize()
  const isMobile = width < 768
  const isItemInsideChecked = filterItem.filters
    .map((selectItem) =>
      selectItem.parameters.map((item) => item.id).some((itemId) => platformFilters.includes(itemId))
    )
    .find((item) => item)
  const isPriceSpecified = cost && (cost.from || cost.to)
  const isStatisticsBlock = filterItem.name === 'Статистика'
  const isTariffsBlock = filterItem.name === 'Тарифы'

  return (
    <div
      className={classNames(styles.filter, {
        [styles.filterInline]: isStatisticsBlock,
        [styles.selectActive]: isMobile && isClosed && (isItemInsideChecked || isPriceSpecified)
      })}
      key={filterItem.id}>
      <div className={styles.titleWrap}>
        <h3>{filterItem.name}</h3>
        {isMobile && (
          <button onClick={() => setIsClosed(isClosed ? false : true)}>
            {isClosed ? <ArrowBottomSelect /> : <ArrowUpSelect />}
          </button>
        )}
      </div>
      {!isStatisticsBlock && (
        <FiltersList
          filterItem={filterItem}
          clearAll={clearAll}
          activeFilter={activeFilter}
          platformFilters={platformFilters}
          isCategoryClosed={isClosed}
          handleAddPlatformFilters={handleAddPlatformFilters}
          handleChangeSelect={handleChangeSelect}
        />
      )}
      {isStatisticsBlock && (
        <StatisticsFiltersList
          filterItem={filterItem}
          isClosed={isClosed}
          handleAddPlatformFilters={handleAddPlatformFilters}
          clearAll={clearAll}
        />
      )}
      {isTariffsBlock && (
        <RangeInputsGroup
          value={'RUB'}
          cost={cost}
          onChange={handleChangeCost}
          wrapClassName={classNames(styles.priceFilter, {
            [styles.selectHidden]: isMobile && isClosed
          })}
          inputClassName={classNames(styles.price, {
            [styles.priceError]: (cost && cost.from && cost.to && Number(cost.from) > Number(cost.to))
          }
          )}
          isError={!!cost && !!cost.from && !!cost.to &&
            (Number(cost.from) > Number(cost.to))}
        />
      )}
    </div>
  )
}
