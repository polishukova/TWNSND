import SearchIcons from '../../../../assets/img/SearchIcons'

import styles from './AdminPanelSearchBar.module.scss'

type TProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AdminPanelSearchBar = ({ value, onChange }: TProps) => {
  return (
    <div className={styles.searchBar}>
      <SearchIcons />
      <input type="text" className={styles.input} placeholder="Поиск..." value={value} onChange={onChange}></input>
    </div>
  )
}
