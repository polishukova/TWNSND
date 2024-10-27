import { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'

import styles from './PossibInput.module.scss'

type PlatFormInputProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  type: HTMLInputTypeAttribute
  placeholder?: string
  name: string
  isInEditMode?: boolean
}

export const PossibInput = ({
  onChange,
  value,
  placeholder,
  name,
  type,
  isInEditMode,
  ...inputProperties
}: PlatFormInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={styles.possib__inputWrapper}>
      <input
        {...inputProperties}
        className={styles.possib__input}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}></input>
    </div>
  )
}
