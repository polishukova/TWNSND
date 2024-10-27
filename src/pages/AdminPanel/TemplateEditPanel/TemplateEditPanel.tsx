import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import Modal from '../../../components/UI/Modal'
import ButtonNew, { ButtonNewTypes } from '../../../components/UI/ButtonNew'

import { getTemplate, updatePlatformTemplate } from '../../../redux/Templates/templatesSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { useModal } from '../../../hooks/useModal'
import { resetAll } from '../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'
import { AdminPanelUserPanel } from '../../../components/AppAdminPanel/AdminPanelHeader/AdminPanelUserPanel/AdminPanelUserPanel'
import { fakeAdmin } from '../../../components/AppAdminPanel/AdminPanelHeader/AdminPanelHeader'
import { ReadySolutionForm } from '../ReadySolutions/ReadySolutionForm'
import { DescriptionList } from '../ReadySolutions/Description/DescriptionList'
import { TemplateTasksList } from '../ReadySolutions/TemplateTasksList/TemplateTasksList'
import { ActivitiesToAchieveTasks } from '../ReadySolutions/ActivitiesToAchieveTasks/ActivitiesToAchieveTasks'
import { ChoosePlatform } from '../ReadySolutions/ChoosePlatform/ChoosePlatform'

import styles from './TemplateEditPanel.module.scss'

export const TemplateEditPanel = () => {
  const navigate = useNavigate()
  const { isModalOpen, openModal, closeModal } = useModal()
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { previewTempImg, templateName, templateShortDesc, templateLongDesc } = useAppSelector(
    (state) => state.adminTemplateCreateSlice
  )

  useEffect(() => {
    if (id) {
      dispatch(
        getTemplate({
          templateId: Number(id),
          getDetails: true
        })
      )
    }
  }, [dispatch, id])

  const handleCreation = () => {
    dispatch(resetAll())
    navigate('/admin/templates/details')
    closeModal()
  }

  const temporaryRouteOnSaveClick = () => {
    navigate('/admin/templates/details')
    dispatch(
      updatePlatformTemplate({
        platformTemplateId: Number(id),
        data: {
          imageUrl: 'previewTempImg',
          name: templateName,
          description: templateShortDesc,
          fullDescription: templateLongDesc,
          cost: 0,
          url: '',
          parameters: [0],
          platformId: 0,
          tasks: [
            {
              iconId: 0,
              taskDescription: ['']
            }
          ],
          activbitiesToSolveTasks: [
            {
              activitieNum: 0,
              activitieDescription: ['']
            }
          ]
        },
        callback: () => { }
      })
    )
  }

  return (
    <div className={styles.templates_container}>
      <div className={styles.templates_wrapper}>
        <div className={styles.templates_header}>
          <h1>Редактировать готовое решение</h1>
          <div>
            <AdminPanelUserPanel admin={fakeAdmin} />
          </div>
        </div>
        <ReadySolutionForm isInEditMode={true} />
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
