import { Select } from '@mantine/core'

import styles from './select.module.scss'

type SelectedType = {
  onChange?: () => void
  valueSelect: string
  data: string[]
  placeholder?: string
  rightSection: JSX.Element
}

const Selected: React.FC<SelectedType> = ({ onChange, valueSelect, data, placeholder, rightSection }) => {
  return (
    <Select
      placeholder={placeholder}
      data={data}
      onChange={onChange}
      value={valueSelect}
      rightSection={rightSection}
      className={styles.select}
    />
  )
}

export default Selected
