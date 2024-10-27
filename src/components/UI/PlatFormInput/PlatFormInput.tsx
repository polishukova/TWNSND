import classNames from 'classnames'

import { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'

import styles from './PlatFormInput.module.scss'

type PlatFormInputProps = {
  value: string | undefined
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  type: HTMLInputTypeAttribute
  placeholder?: string
  name: string
  isInEditMode?: boolean
}

export const PlatFormInput = ({
  onChange,
  value,
  placeholder,
  name,
  type,
  isInEditMode,
  ...inputProperties
}: PlatFormInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapperEdit]: isInEditMode
      })}>
      <input
        {...inputProperties}
        className={classNames(styles.input, {
          [styles.inputEdit]: isInEditMode
        })}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}></input>
    </div>
  )
}
