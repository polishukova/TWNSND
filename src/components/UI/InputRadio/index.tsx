import classNames from 'classnames'

import styles from './InputRadio.module.scss'

type InputRadioType = {
  activ: boolean
}

const InputRadio: React.FC<InputRadioType> = ({ activ }) => {
  return (
    <label>
      <input type="checkbox" className={styles.inputCheckbox} />
      <span className={classNames(styles.vueCheckbox)}>{activ ? <div className={styles.activ}></div> : null}</span>
    </label>
  )
}

export default InputRadio
