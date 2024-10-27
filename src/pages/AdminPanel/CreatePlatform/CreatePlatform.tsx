import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import { AdminPanelUserPanel } from '../../../components/AppAdminPanel/AdminPanelHeader/AdminPanelUserPanel/AdminPanelUserPanel'
import { fakeAdmin } from '../../../components/AppAdminPanel/AdminPanelHeader/AdminPanelHeader'
import { createPlatform, postPlatformImg, resetAll } from '../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'
import { getAllFilters, resetAllFilters } from '../../../redux/AdminPlatformCreate/adminFiltersSlice'
import { setStatusPlatform } from '../../../redux/Platforms/statusSlice'

import ButtonNew, { ButtonNewTypes } from '../../../components/UI/ButtonNew'
import Modal from '../../../components/UI/Modal'

import { PlatForm } from '../../../components/AppAdminPanel/CreatePlatformPanel/PlatForm/PlatForm'
import { AdditionalSettings } from '../../../components/AppAdminPanel/CreatePlatformPanel/AdditionalSettings/AdditionalSettings'
import { Feedback } from '../../../components/AppAdminPanel/CreatePlatformPanel/Feedback/Feedback'
import { ReadyMadeSolutions } from '../../../components/AppAdminPanel/CreatePlatformPanel/ReadyMadeSolutions/ReadyMadeSolutions'

import styles from './CreatePlatformPanel.module.scss'

export const CreatePlatformPanel = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState(false)

  const {
    platformName,
    platformLongDesc,
    platformShortDesc,
    tags,
    previewImg,
    platformUrl,
    readyMadeSolutionsBack,
    settings,
    basicPossibility,
    additionalPossibility
  } = useAppSelector((state) => state.adminPlatformCreateSlice)
  const parameters = useAppSelector((state) => state.adminFiltersSlice.chosenFiltersBack)
  const tagsForRequest = tags.map((tag) => {
    return ({
      name: tag.name
    })
  })
  const postImageStatus = useAppSelector((state) => state.adminPlatformCreateSlice.postImageStatus)
  const selectedImg = useAppSelector((state) => state.adminPlatformCreateSlice.platformImg)
  const { statusPlatform } = useAppSelector((state) => state.statusPlatformsSlice)

  const settingsBack = settings.map((setting) => {
    return {
      imageUrl: setting.imageUrl,
      title: setting.title,
      text: setting.text
    }
  })

  const basicPossibilityBack = basicPossibility.map((setting) => {
    return {
      title: setting.title,
      text: setting.text
    }
  })

  const additionalPossibilityBack = additionalPossibility.map((setting) => {
    return {
      title: setting.title,
      text: setting.text
    }
  })

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      dispatch(resetAll())
      dispatch(resetAllFilters())
      event.preventDefault()
      return (event.returnValue = '')
    }
    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true })
    dispatch(resetAll())
    dispatch(resetAllFilters())
    dispatch(getAllFilters(false))
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true })
    }
  }, [])

  useEffect(() => {
    if (statusPlatform === 'fulfilled') {
      navigate('/admin/platforms/platform-collection')
      dispatch(setStatusPlatform(''))
    }
  }, [statusPlatform])

  useEffect(() => {
    if (postImageStatus === 'fulfilled') {
      dispatch(
        createPlatform({
          name: platformName,
          description: platformShortDesc,
          categories: tagsForRequest,
          fullDescription: platformLongDesc,
          imageUrl: previewImg ? previewImg : '',
          fileName: previewImg ? previewImg.slice(18) : '',
          url: platformUrl,
          parameters: parameters,
          platformTemplateId: readyMadeSolutionsBack,
          settingsDescription: { textBlocks: settingsBack },
          basicFeaturesDescription: { textBlocks: basicPossibilityBack },
          additionalFeaturesDescription: { textBlocks: additionalPossibilityBack }
        })
      )
    }
  }, [postImageStatus])

  const handleCreation = () => {
    dispatch(resetAll())
    navigate('/admin/platforms/platform-collection')
    setOpenModal(false)
  }

  const handleCancel = () => {
    setOpenModal(false)
  }

  return (
    <div className={styles.platformCreation}>
      <div className={styles.platformCreation__template}>
        <div className={styles.template__header}>
          <h2 className={styles.template__title}>Создание платформы</h2>
          <div className={styles.template__iconWrap}>
            <AdminPanelUserPanel admin={fakeAdmin} />
          </div>
        </div>
        <PlatForm />
        <AdditionalSettings />
        {/* <h3 className={styles.solutions__title}>Популярные готовые решения на базе платформы</h3>
        <ReadyMadeSolutions isPopular={true} /> */}
        <h3 className={styles.solutions__title}>Готовые решения на базе платформы</h3>
        <ReadyMadeSolutions />
      </div>
      <div className={styles.platformCreation__btnsWrap}>
        <div className={styles.btnsWrap__btnWrap}>
          <ButtonNew
            title={'Сохранить'}
            type={ButtonNewTypes.Secondary}
            onClick={() => {
              if (selectedImg) {
                dispatch(postPlatformImg(selectedImg))
              } else {
                dispatch(
                  createPlatform({
                    name: platformName,
                    description: platformShortDesc,
                    categories: tagsForRequest,
                    fullDescription: platformLongDesc,
                    imageUrl: previewImg ? previewImg : '',
                    fileName: previewImg ? previewImg.slice(18) : '',
                    url: platformUrl,
                    parameters: parameters,
                    platformTemplateId: readyMadeSolutionsBack,
                    settingsDescription: { textBlocks: settingsBack },
                    basicFeaturesDescription: { textBlocks: basicPossibilityBack },
                    additionalFeaturesDescription: { textBlocks: additionalPossibilityBack }
                  })
                )
              }
            }}
          />
        </div>
        <div className={styles.btnsWrap__btnWrap}>
          <ButtonNew
            className={styles.btnPrimary}
            title={'Отменить'}
            type={ButtonNewTypes.Primary}
            onClick={() => {
              setOpenModal(true)
            }}
          />
        </div>
      </div>
      <Modal
        openModal={openModal}
        title={'Вы действительно хотите отменить Создание платформы?'}
        approveMsg={'Да'}
        cancelMsg={'Нет'}
        onApprove={handleCreation}
        onCancel={handleCancel}
      />
    </div>
  )
}
