import { useEffect, useState } from 'react'

import { ParamersFiltersType } from '../../../@types/types/platforms'

import { RadioButton } from './RadioButton'

type RadioCheckboxGroupType = {
  radioClassName: string
  radioList?: ParamersFiltersType[]
  onChange: (id: number, prevRadioactive?: number) => void
  clearAll?: boolean
}

export const RadioCheckboxGroup = ({ radioClassName, radioList, onChange, clearAll }: RadioCheckboxGroupType) => {
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
        <div className={radioClassName} key={index}>
          <RadioButton id={radio.id} label={radio.name} radioActive={active} changeRadioActive={changeRadioActive} />
        </div>
      ))}
    </>
  )
}
