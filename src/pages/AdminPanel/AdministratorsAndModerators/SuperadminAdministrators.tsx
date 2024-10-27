import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { PlusIcon } from '../../../assets/AdminPanel/Specialists/PlusIcon'
import { SpecialistsTable } from '../../../components/AppAdminPanel/SpecialistsTable/SpecialistsTable'
import { CreateUserAdmin } from '../../../components/AppAdminPanel/AdminPopups/AdminModal/CreateUserAdmin'
import { getAdministrators } from '../../../redux/SuperAdmin/adminSlice'
import { ADMIN } from '../../../@types/roles'

import styles from './AdministratorsAndModerators.module.scss'

export const SuperAdminAdministrators = () => {
  const [isTouched, setIsTouched] = useState(false)
  const administratorsList = useAppSelector((state) => state.adminSlice.adminsList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAdministrators())
  }, [])

  console.log(administratorsList)

  return (
    <div>
      <CreateUserAdmin role={ADMIN} isTouched={isTouched} setIsTouched={setIsTouched} />
      <h1 className={styles.title}>Администраторы</h1>
      <button className={styles.createButton} onClick={() => setIsTouched(true)}>
        <div className={styles.icon}>
          <PlusIcon />
        </div>
        <div>{'Создать'}</div>
      </button>
      <SpecialistsTable data={administratorsList} rowsPerPage={9} shouldFitContainer />
    </div>
  )
}
