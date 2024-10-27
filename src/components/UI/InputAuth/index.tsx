import { ChangeEvent, FC, HTMLInputTypeAttribute, useState } from 'react'
import { motion } from 'framer-motion'
import classNames from 'classnames'

import PasswordOpenIcon from '../../../assets/img/PasswordOpenIcon'
import PasswordCloseIcon from '../../../assets/img/PasswordCloseIcon'

import styles from './InputAuth.module.scss'

export type ViewPassword = 'open' | 'close'

type InputAuthProps = {
  value: string | number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  onFocus: () => void
  type: HTMLInputTypeAttribute
  placeholder?: string
  activeInput: boolean
  name: string
  message?: string
  errorInput?: string
}

const errorVariants = {
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  hidden: { y: 3, opacity: 0 }
}

const InputAuth: FC<InputAuthProps> = ({
  value,
  onChange,
  type,
  placeholder,
  name,
  message,
  errorInput,
  activeInput,
  onBlur,
  onFocus
}) => {
  const [viewPasswordIcon, setViewPasswordIcon] = useState<ViewPassword>('close')
  const [renderingType, setRenderingType] = useState(type)
  const [isFocus, toggleIsFocus] = useState(false)

  const toggleViewPasswordIcon = () => {
    if (viewPasswordIcon === 'close') {
      setViewPasswordIcon('open')
      setRenderingType('text')
    } else {
      setViewPasswordIcon('close')
      setRenderingType(type)
    }
  }

  const handleFocus = () => {
    onFocus()
    toggleIsFocus(true)
  }

  const handleBlur = () => {
    onBlur()
    toggleIsFocus(false)
  }
  return (
    <div className={styles.wrapper}>
      {errorInput && !isFocus && (
        <motion.p
          className={classNames(styles.error, { [styles.errorPass]: name === 'Password' })}
          variants={errorVariants}
          initial="hidden"
          animate="visible">
          {errorInput}
        </motion.p>
      )}
      {activeInput && !errorInput && isFocus && (
        <motion.p className={classNames(styles.message)} variants={errorVariants} initial="hidden" animate="visible">
          {message}
        </motion.p>
      )}
      <input
        className={classNames(styles.input, {
          [styles.errorInput]: !!errorInput
        })}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        type={renderingType}
      />
      {!activeInput && (
        <span
          className={classNames(styles.placeholder, {
            [styles.errorPlaceholder]: !!errorInput
          })}>
          {placeholder} {name !== 'LastName' && name !== 'lastName' && <span>*</span>}
        </span>
      )}
      {type === 'password' && (
        <span className={styles.passwordIcon} onClick={toggleViewPasswordIcon}>
          {viewPasswordIcon === 'open' ? <PasswordOpenIcon /> : <PasswordCloseIcon />}
        </span>
      )}
    </div>
  )
}

export default InputAuth
