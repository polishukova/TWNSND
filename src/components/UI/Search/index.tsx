import { useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'

import classNames from 'classnames'

import Close from '../../../assets/img/Close'
import SearchIcons from '../../../assets/img/SearchIcons'
import { useAppDispatch } from '../../../redux/hooks'
import { setSearchValue } from '../../../redux/Platforms/platformsSlice'

import styles from './Search.module.scss'

type SearchType = {
  className?: string
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const Search: React.FC<SearchType> = ({ className, inputValue, setInputValue }) => {
  const debouncedValue = useDebounce<string>(inputValue, 600)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setSearchValue(debouncedValue))
  }, [debouncedValue])

  const closeSearchInput = () => {
    setInputValue('')
    dispatch(setSearchValue(''))
  }

  return (
    <div className={classNames(styles.wrap, className)}>
      <SearchIcons />
      <input
        value={inputValue}
        className={styles.input}
        type="text"
        placeholder="Поиск"
        onChange={(e) => setInputValue(e.target.value.substring(0, 25))}
      />
      {inputValue && <Close className={styles.close} onClick={closeSearchInput} />}
    </div>
  )
}

export default Search
