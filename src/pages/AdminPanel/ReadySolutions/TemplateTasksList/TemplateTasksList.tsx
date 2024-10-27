import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'

import { addTemplateTask } from '../../../../redux/AdminTemplatesCreate/adminTemplateCreateSlice'

import PlusIcon from '../../../../assets/img/PlusIcon'

import { TemplateTask } from './TemplateTask'

import styles from './TemplateTasksList.module.scss'

export const TemplateTasksList = () => {
  const templateTasks = useAppSelector((state) => state.adminTemplateCreateSlice.templateTasks)
  const dispatch = useAppDispatch()
  return (
    <div className={styles.wrap}>
      <p className={styles.title}>Задачи</p>
      <div
        className={styles.subtitleWrap}
        onClick={() => {
          dispatch(addTemplateTask())
        }}>
        <PlusIcon />
        <p className={styles.subtitle}>Добавить задачу</p>
      </div>
      <div className={styles.taskListWrap}>
        {templateTasks.map((task) => (
          <TemplateTask task={task} key={'task-' + task.id} />
        ))}
      </div>
    </div>
  )
}
