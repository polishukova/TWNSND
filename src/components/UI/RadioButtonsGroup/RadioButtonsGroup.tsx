import { useEffect, useState } from 'react'

import classNames from 'classnames'

import { ParamersFiltersType } from '../../../@types/types/platforms'

import styles from './RadioButtonsGroup.module.scss'

type RadioButtonsGroupType = {
  radioList?: ParamersFiltersType[]
  onChange: (id: number, prevRadioactive?: number) => void
  clearAll?: boolean
}

export const RadioButtonsGroup = ({ radioList, onChange, clearAll }: RadioButtonsGroupType) => {
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    if (clearAll) {
      setActive(null)
    }
  }, [clearAll])

  const changeRadioActive = (id: number) => {
    if (active === null) {
      onChange(id)
      setActive(id)
    } else if (active !== id) {
      onChange(id, active)
      setActive(id)
    } else {
      onChange(id)
      setActive(null)
    }
  }

  return (
    <>
      {radioList?.map((radio, index) => (
        <button
          key={radio.id + index}
          className={classNames(styles.statisticsBtn, {
            [styles.statisticsBtnActive]: active === radio.id
          })}
          onClick={() => changeRadioActive(radio.id)}>
          {radio.name}
        </button>
      ))}
    </>
  )
}
