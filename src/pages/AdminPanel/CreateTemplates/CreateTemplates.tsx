import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import Modal from '../../../components/UI/Modal'

import { fakeAdmin } from '../../../components/AppAdminPanel/AdminPanelHeader/AdminPanelHeader'
import { AdminPanelUserPanel } from '../../../components/AppAdminPanel/AdminPanelHeader/AdminPanelUserPanel/AdminPanelUserPanel'
import ButtonNew, { ButtonNewTypes } from '../../../components/UI/ButtonNew'
import { useModal } from '../../../hooks/useModal'
import { resetAll } from '../../../redux/AdminTemplatesCreate/adminTemplateCreateSlice'
import { useAppDispatch } from '../../../redux/hooks'
import { ActivitiesToAchieveTasks } from '../ReadySolutions/ActivitiesToAchieveTasks/ActivitiesToAchieveTasks'
import { ChoosePlatform } from '../ReadySolutions/ChoosePlatform/ChoosePlatform'
import { DescriptionList } from '../ReadySolutions/Description/DescriptionList'
import { ReadySolutionForm } from '../ReadySolutions/ReadySolutionForm'
import { TemplateTasksList } from '../ReadySolutions/TemplateTasksList/TemplateTasksList'

import styles from './CreateTemplates.module.scss'

export const CreateTemplates = () => {
  const navigate = useNavigate()
  const { isModalOpen, openModal, closeModal } = useModal()
  const dispatch = useAppDispatch()

  const handleCreation = () => {
    dispatch(resetAll())
    navigate('/admin/templates/details')
    closeModal()
  }

  const temporaryRouteOnSaveClick = () => {
    navigate('/admin/templates/details')
  }

  useEffect(() => {
    dispatch(resetAll())
  }, [])

  return (
    <div className={styles.templates_container}>
      <div className={styles.templates_wrapper}>
        <div className={styles.templates_header}>
          <h1>Создание готового решения</h1>
          <div>
            <AdminPanelUserPanel admin={fakeAdmin} />
          </div>
        </div>
        <ReadySolutionForm isInEditMode={false} />
        <DescriptionList />
        <TemplateTasksList />
        <ActivitiesToAchieveTasks />
        <ChoosePlatform />
        <div className={styles.templates_tasks}></div>
        <div className={styles.templates_activities}></div>
        <div className={styles.platform_for_templates}></div>
      </div>
      <div className={styles.platformCreation__btnsWrap}>
        <div className={styles.btnsWrap__btnWrap}>
          <ButtonNew title={'Сохранить'} type={ButtonNewTypes.Secondary} onClick={temporaryRouteOnSaveClick} />
        </div>
        <div className={styles.btnsWrap__btnWrap}>
          <ButtonNew
            className={styles.btnPrimary}
            title={'Отменить'}
            type={ButtonNewTypes.Primary}
            onClick={openModal}
          />
        </div>
      </div>
      <Modal
        openModal={isModalOpen}
        title={'Вы действительно хотите отменить Создание готового решения?'}
        approveMsg={'Да'}
        cancelMsg={'Нет'}
        onApprove={handleCreation}
        onCancel={closeModal}
      />
    </div>
  )
}
