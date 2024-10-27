import { useEffect, useState } from 'react'

import classNames from 'classnames'

import Check from '../../../assets/img/Check'

import { ParamersFiltersType } from '../../../@types/types/platforms'

import styles from './CheckBox.module.scss'

type CheckBoxType = {
  id: number
  onChange: (e: boolean) => void
  item?: ParamersFiltersType
  label?: string
  clearAll?: boolean
}

export const CheckBox = ({ id, clearAll, onChange, label }: CheckBoxType) => {
  const [isChecked, setChecked] = useState(false)

  useEffect(() => {
    if (clearAll) {
      setChecked(false)
    }
  }, [clearAll])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!isChecked)
    onChange(e.target.checked)
  }

  return (
    <label htmlFor={String(id)}>
      <input
        name={String(id)}
        id={String(id)}
        onChange={handleChange}
        type="checkbox"
        className={styles.inputCheckbox}
      />
      <p className={isChecked ? styles.labelName : ''}>{label}</p>
      <div
        className={classNames(styles.vueCheckbox, {
          [styles.vueCheckboxActive]: isChecked
        })}>
        {isChecked && <Check />}
      </div>
    </label>
  )
}
