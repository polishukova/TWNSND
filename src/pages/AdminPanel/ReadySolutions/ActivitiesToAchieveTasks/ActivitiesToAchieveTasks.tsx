import PlusIcon from '../../../../assets/img/PlusIcon'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { addTemplateEvent } from '../../../../redux/AdminTemplatesCreate/adminTemplateCreateSlice'

import { AddEvent } from '../AddEvent/AddEvent'

import styles from './ActivitiesToAchieveTasks.module.scss'

export const ActivitiesToAchieveTasks = () => {
  /* const { width = 0 } = useWindowSize()
  const isMobile = width <= 768 */
  const templateEvents = useAppSelector((state) => state.adminTemplateCreateSlice.templateEvents)
  /* const eventsToDisplay = isMobile ? [templateEvents[0]] : templateEvents */
  const dispatch = useAppDispatch()

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>Мероприятия для достижения задач:</p>
      <div
        className={styles.subtitleWrap} onClick={() => {
          dispatch(addTemplateEvent())
        }}>
        <PlusIcon />
        <p className={styles.subtitle}>Добавить мероприятие</p>
      </div>
      <div className={styles.activitiesListWrap}>
        {templateEvents.map((event) => (
          <AddEvent key={event.id} data={event} />
        ))}
      </div>
    </div>
  )
}
