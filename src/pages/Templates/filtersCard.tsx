import Selected from '../../components/UI/Selected'

import filters from './filters'
import { RightSection } from './rightSection'

import styles from './Templates.module.scss'

type inputValueType = {
  inputValue: string
}

export const FiltersCard: React.FC<inputValueType> = ({ inputValue }) => {
  return (
    <>
      {filters.map((value, index) => (
        <div className={styles.label} key={index}>
          <div className={styles.filterTitle}>{value.titleFilter}</div>
          <Selected
            placeholder={'Выбрать фильтр'}
            valueSelect={inputValue}
            data={value.selects}
            rightSection={<RightSection />}
          />
        </div>
      ))}
    </>
  )
}
