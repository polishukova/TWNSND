import classNames from 'classnames'

import { ParamersFiltersType } from '../../../@types/types/platforms'

import styles from './RadioButtons.module.scss'

type RadioBtnType = {
  id: number
  label?: string
  radioActive?: number | null
  changeRadioActive?: (id: number) => void
}

export const RadioButton = ({ id, label, radioActive, changeRadioActive }: RadioBtnType) => {
  const handleChange = () => {
    if (changeRadioActive) {
      changeRadioActive(id)
    }
  }
  const radioId = String(id)

  return (
    <label htmlFor={radioId}>
      <input name={radioId} id={radioId} onChange={handleChange} type="checkbox" className={styles.inputCheckbox} />
      <p>{label}</p>
      <div
        className={classNames(styles.vueCheckbox, styles.vueCheckboxRadio, {
          [styles.vueCheckboxRadioActive]: radioActive === id
        })}>
        {radioActive === id && <div className={styles.radioChecked} />}
      </div>
    </label>
  )
}
