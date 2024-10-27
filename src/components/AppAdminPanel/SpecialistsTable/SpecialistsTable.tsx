import { TableHTMLAttributes, useState } from 'react'

import classNames from 'classnames'

import { Specialist } from '../../../@types/types/adminPanel/adminPanelPlatforms'
import { useTable } from '../../../hooks/useTable'
import { ThreeDotsIcon } from '../../../assets/AdminPanel/Specialists/ThreeDotsIcon'
import { BlockPopup } from '../AdminPopups/BlockPopup'
import { toggleBlock } from '../../../redux/SuperAdmin/adminSlice'
import { useAppDispatch } from '../../../redux/hooks'
import { SaveDataPopup } from '../AdminPopups/SaveDataPopup'
import { ADMIN } from '../../../@types/roles'

import styles from './SpecialistsTable.module.scss'

import { SpecialistsTableFooter } from './SpecialistsTableFooter/SpecialistsTableFooter'

const RoleCell: React.FC<{ role: string }> = ({ role }) => <td>{role === ADMIN ? 'Администратор' : 'Модератор'}</td>

const StatusCell: React.FC<{ status: boolean }> = ({ status }) => (
  <td>
    <div className={styles.statusWrap}>{status ? 'Активен' : 'Заблокирован'}</div>
  </td>
)

const HeaderRow: React.FC = () => (
  <thead>
    <tr>
      <th className={styles.tableHeader}>Имя</th>
      <th className={styles.tableHeader}>Почта</th>
      <th className={styles.tableHeader}>Роль</th>
      <th className={styles.tableHeader}>Статус</th>
      <th className={styles.tableHeader}></th>
    </tr>
  </thead>
)

const TableBody: React.FC<{ data: Specialist[] }> = ({ data }) => {
  const [showButton, setShowButton] = useState(false)
  const [editingSpecialistEmail, setEditingSpecialistEmail] = useState<Specialist['email']>('')
  const [status, setStatus] = useState(true)

  const handleEditingClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, specialist: Specialist) => {
    event.preventDefault()
    setEditingSpecialistEmail(specialist.email)
    setShowButton(true)
  }

  const dispatch = useAppDispatch()
  return (
    <tbody>
      {data.map((specialist) => {
        const handleClick = () => {
          dispatch(toggleBlock(true))
          setStatus(specialist.state)
          setShowButton(false)
        }

        return (
          <tr
            key={specialist.email}
            className={classNames({
              [styles.activeRow]: specialist.state === true,
              [styles.blockedRow]: specialist.state === false
            })}>
            <td>
              <div className={styles.name}>{specialist.fullName}</div>
            </td>
            <td>{specialist.email}</td>
            <RoleCell role={specialist.role} />
            <StatusCell status={specialist.state} />
            <td className={styles.editCell}>
              <button className={styles.editButton} onClick={(event) => handleEditingClick(event, specialist)}>
                {<ThreeDotsIcon />}
              </button>
              <button
                className={classNames(
                  styles.editingActions,
                  showButton
                    ? { [styles.editingActions_visible]: editingSpecialistEmail === specialist.email }
                    : { [styles.editingActions_hide]: editingSpecialistEmail === specialist.email }
                )}
                onClick={handleClick}>
                {specialist.state ? 'Заблокировать' : 'Разблокировать'}
              </button>
            </td>
          </tr>
        )
      })}
      <BlockPopup status={status} email={editingSpecialistEmail} role={data[0]?.role} />
    </tbody>
  )
}

export const SpecialistsTable = ({
  data,
  rowsPerPage,
  shouldFitContainer,
  ...passThroughProperties
}: {
  data: Specialist[]
  rowsPerPage: number
  shouldFitContainer?: boolean
} & TableHTMLAttributes<HTMLTableElement>) => {
  const [page, setPage] = useState(1)
  const { slice, range } = useTable(data, page, rowsPerPage)

  return (
    <div className={styles.wrapper}>
      <table
        {...passThroughProperties}
        className={styles.table}
        style={{
          ...passThroughProperties.style,
          width: shouldFitContainer ? '100%' : passThroughProperties.style?.width
        }}>
        <HeaderRow />
        <TableBody data={slice} />
      </table>
      <SpecialistsTableFooter range={range} setPage={setPage} page={page} slice={slice} />
      <SaveDataPopup />
    </div>
  )
}
