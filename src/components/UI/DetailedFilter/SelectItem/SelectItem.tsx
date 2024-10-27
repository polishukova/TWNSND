import classNames from 'classnames'

import { FilterType } from '../../../../@types/types/platforms'

import { useWindowSize } from '../../../../hooks/useWindowsSize'

import { RadioCheckboxGroup } from '../../RadioCheckboxGroup/RadioCheckboxGroup'
import { CheckBox } from '../../CheckBox'

import ArrowUpSelect from '../../../../assets/DetailedFilterIcons/ArrowUpSelect'
import ArrowBottomSelect from '../../../../assets/DetailedFilterIcons/ArrowBottomSelect'

import styles from '.././DetailedFilter.module.scss'

type SelectItemType = {
  selectItem: FilterType
  activeFilter: string[]
  isCategoryClosed: boolean
  platformFilters: number[]
  clearAll: boolean
  handleChangeSelect: (id: string) => void
  handleAddPlatformFilters: (id: number, prevRadioactive?: number) => void
}

export const SelectItem = ({
  selectItem,
  activeFilter,
  platformFilters,
  clearAll,
  isCategoryClosed,
  handleAddPlatformFilters,
  handleChangeSelect
}: SelectItemType) => {
  const { width = 0 } = useWindowSize()
  const isSelectOpened = activeFilter.includes(selectItem.id.toString())

  return (
    <div
      className={classNames(styles.select, {
        [styles.selectActive]: selectItem.parameters
          .map((item) => item.id)
          .some((itemId) => platformFilters.includes(itemId)),
        [styles.selectOpened]: isSelectOpened,
        [styles.selectHidden]: width < 768 && isCategoryClosed
      })}>
      <div
        className={classNames(styles.titleSelect, {
          [styles.titleSelectActive]: isSelectOpened
        })}
        onClick={() => handleChangeSelect(selectItem.id.toString())}>
        <p>{selectItem.name}</p>
        {isSelectOpened ? <ArrowUpSelect /> : <ArrowBottomSelect />}
      </div>
      <div className={isSelectOpened ? styles.activeSelectItems : styles.hideSelectItems}>
        {selectItem.isMultipleCheckParameters && selectItem.parameters.map((item, index) => (
          <div className={classNames(styles.selectItem)} key={index}>
            <CheckBox
              id={item.id}
              item={item}
              label={item.name}
              onChange={() => handleAddPlatformFilters(item.id)}
              clearAll={clearAll}
            />
          </div>
        ))}
        {!selectItem.isMultipleCheckParameters &&
          <RadioCheckboxGroup radioClassName={styles.selectItem} clearAll={clearAll}
            onChange={(id: number, prevRadioactive?: number) =>
              handleAddPlatformFilters(id, prevRadioactive)}
            radioList={selectItem.parameters}
          />}
      </div>
    </div>
  )
}
