import { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes, useState } from 'react'
import { Noop } from 'react-hook-form'

import { motion } from 'framer-motion'

import classNames from 'classnames'

import { errorVariants } from '../PhoneNumberInput/PhoneNumberInput'

import styles from './FeedbackFormInput.module.scss'

type FeedBackFormInputProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur: Noop
  onFocus: () => void
  type: HTMLInputTypeAttribute
  placeholder?: string
  name: string
  error?: string
  isActive?: boolean
  isOptional?: boolean
}

export const FeedBackFormInput = ({
  onChange,
  value,
  onBlur,
  onFocus,
  placeholder,
  name,
  error,
  type,
  isActive,
  isOptional,
  ...inputProperties
}: FeedBackFormInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  const [isFocus, toggleIsFocus] = useState(false)

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
      {error && !isFocus && (
        <motion.p className={styles.error} variants={errorVariants} initial="hidden" animate="visible">
          {error}
        </motion.p>
      )}
      <input
        {...inputProperties}
        className={`${inputProperties.className || ''} ${classNames(styles.input, {
          [styles.errorInput]: !!error,
          [styles.filledInput]: inputProperties.readOnly
        })}`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        type={type}
      />
      {!isActive && placeholder && (
        <span
          className={classNames(styles.placeholder, {
            [styles.errorPlaceholder]: !!error,
            [styles.linkPlaceholder]: name === 'Link'
          })}>
          {placeholder} {!isOptional && <span>*</span>}
        </span>
      )}
    </div>
  )
}
