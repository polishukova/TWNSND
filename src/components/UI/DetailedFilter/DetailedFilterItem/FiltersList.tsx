import { FiltersDataType } from '../../../../@types/types/platforms'

import { SelectItem } from '../SelectItem/SelectItem'

type FiltersListType = {
  filterItem: FiltersDataType
  activeFilter: string[]
  platformFilters: number[]
  clearAll: boolean
  isCategoryClosed: boolean
  handleAddPlatformFilters: (id: number, prevRadioactive?: number) => void
  handleChangeSelect: (id: string) => void
}

export const FiltersList = ({
  filterItem,
  activeFilter,
  platformFilters,
  clearAll,
  isCategoryClosed,
  handleAddPlatformFilters,
  handleChangeSelect
}: FiltersListType) => {
  return (
    <>
      {filterItem.filters.map((selectItem) => (
        <SelectItem
          key={selectItem.id}
          selectItem={selectItem}
          activeFilter={activeFilter}
          platformFilters={platformFilters}
          clearAll={clearAll}
          isCategoryClosed={isCategoryClosed}
          handleAddPlatformFilters={handleAddPlatformFilters}
          handleChangeSelect={handleChangeSelect}
        />
      ))}
    </>
  )
}
