import classNames from 'classnames'

import { FiltersDataType } from '../../../../@types/types/platforms'

import { useWindowSize } from '../../../../hooks/useWindowsSize'

import { RadioButtonsGroup } from '../../RadioButtonsGroup/RadioButtonsGroup'

import styles from '.././DetailedFilter.module.scss'

type StatisticsFiltersListType = {
  filterItem: FiltersDataType
  isClosed: boolean
  clearAll: boolean
  handleAddPlatformFilters: (id: number, prevRadioactive?: number) => void
}

export const StatisticsFiltersList = ({
  filterItem,
  isClosed,
  clearAll,
  handleAddPlatformFilters
}: StatisticsFiltersListType) => {
  const { width = 0 } = useWindowSize()
  const isMobile = width < 768

  return (
    <div
      className={classNames(styles.statistics, {
        [styles.selectHidden]: isMobile && isClosed
      })}>
      <RadioButtonsGroup
        clearAll={clearAll}
        radioList={filterItem.filters.find((select) => select.name === 'Статистика')?.parameters}
        onChange={(id: number, prevRadioactive?: number) => handleAddPlatformFilters(id, prevRadioactive)}
      />
    </div>
  )
}
