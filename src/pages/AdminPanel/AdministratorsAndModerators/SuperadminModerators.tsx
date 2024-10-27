import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { PlusIcon } from '../../../assets/AdminPanel/Specialists/PlusIcon'
import { SpecialistsTable } from '../../../components/AppAdminPanel/SpecialistsTable/SpecialistsTable'
import { CreateUserAdmin } from '../../../components/AppAdminPanel/AdminPopups/AdminModal/CreateUserAdmin'
import { getModerators } from '../../../redux/SuperAdmin/adminSlice'
import { MODERATOR } from '../../../@types/roles'

import styles from './AdministratorsAndModerators.module.scss'

export const SuperAdminModerators = () => {
  const [isTouched, setIsTouched] = useState(false)
  const moderatorsList = useAppSelector((state) => state.adminSlice.moderatorsList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getModerators())
  }, [])

  return (
    <div>
      <CreateUserAdmin role={MODERATOR} isTouched={isTouched} setIsTouched={setIsTouched} />
      <h1 className={styles.title}>Модераторы</h1>
      <button className={styles.createButton} onClick={() => setIsTouched(true)}>
        <div className={styles.icon}>
          <PlusIcon />
        </div>
        <div>{'Создать'}</div>
      </button>
      <SpecialistsTable data={moderatorsList} rowsPerPage={9} shouldFitContainer />
    </div>
  )
}
