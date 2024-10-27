import { Noop } from 'react-hook-form'
import 'react-phone-input-2/lib/material.css'
import { motion } from 'framer-motion'

import PhoneInput from 'react-phone-input-2'

import { ChangeEvent, useEffect, useState } from 'react'

import classNames from 'classnames'

import styles from './PhoneNumberInput.module.scss'
import { ERROR_MESSAGE_RUSSIA, ERROR_MESSAGE_BELARUS, maskNumber } from './contants'

export const errorVariants = {
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  hidden: { y: 3, opacity: 0 }
}

export type PhoneNumberInputTypes = {
  value: string
  onChange: (event: string | ChangeEvent<Element>) => void
  onBlur: Noop
  onFocus: () => void
  placeholder?: string
  name: string
  error?: string
  updateIsPhoneValid: (value: boolean) => void
}

export const PhoneNumberInput = ({
  onChange,
  value,
  onBlur,
  onFocus,
  placeholder,
  name,
  error,
  updateIsPhoneValid
}: PhoneNumberInputTypes) => {
  const [isFocus, toggleIsFocus] = useState(false)
  const [isPhoneValid, setPhoneValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const handleFocus = () => {
    onFocus()
    toggleIsFocus(true)
  }

  const handleBlur = () => {
    onBlur()
    toggleIsFocus(false)
  }

  const isValidNumber = (value: string, country: { name?: string }) => {
    const { name } = country
    if (name === 'Russia') {
      setPhoneValid(value.length === 11)
      setErrorMessage(ERROR_MESSAGE_RUSSIA)
    }
    if (name === 'Belarus') {
      setPhoneValid(value.length === 12)
      setErrorMessage(ERROR_MESSAGE_BELARUS)
    }
    return true
  }

  useEffect(() => {
    updateIsPhoneValid(isPhoneValid)
  }, [isPhoneValid, updateIsPhoneValid])

  return (
    <div className={styles.wrapper}>
      {error && !isFocus && (
        <motion.p variants={errorVariants} initial="hidden" animate="visible" className={styles.errorMessage}>
          {error}
        </motion.p>
      )}
      {isPhoneValid === false && !isFocus && !error && isDirty && (
        <motion.p variants={errorVariants} initial="hidden" animate="visible" className={styles.errorMessage}>
          {errorMessage}
        </motion.p>
      )}
      <PhoneInput
        onlyCountries={['ru', 'by']}
        country="ru"
        masks={maskNumber}
        onChange={(value) => {
          onChange(value)
          setIsDirty(true)
        }}
        onBlur={handleBlur}
        onFocus={handleFocus}
        localization={{ ru: 'Россия', by: 'Беларусь' }}
        countryCodeEditable={false}
        value={value}
        isValid={(value, country: { name?: string }) => isValidNumber(value, country)}
        dropdownClass={styles.dropdownContainer}
        specialLabel={value ? '' : '*'}
        placeholder={placeholder}
        inputClass={classNames(styles.input, { [styles.errorInput]: !!error || (isPhoneValid === false && isDirty) })}
        inputProps={{ name: name }}
        containerClass={styles.container}></PhoneInput>
    </div>
  )
}
