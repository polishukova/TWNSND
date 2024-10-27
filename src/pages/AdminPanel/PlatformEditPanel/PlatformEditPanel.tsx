import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  editPlatform,
  getPlatformInfo,
  postPlatformImg,
  resetAll,
  setPlatformImg,
  setPostImgStatus
} from '../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'
import { getAllFilters, resetAllFilters } from '../../../redux/AdminPlatformCreate/adminFiltersSlice'
import { setStatusPlatform } from '../../../redux/Platforms/statusSlice'

import { fakeAdmin } from '../../../components/AppAdminPanel/AdminPanelHeader/AdminPanelHeader'
import { AdminPanelUserPanel } from '../../../components/AppAdminPanel/AdminPanelHeader/AdminPanelUserPanel/AdminPanelUserPanel'
import { AdditionalSettings } from '../../../components/AppAdminPanel/CreatePlatformPanel/AdditionalSettings/AdditionalSettings'
import { Feedback } from '../../../components/AppAdminPanel/CreatePlatformPanel/Feedback/Feedback'
import { PlatForm } from '../../../components/AppAdminPanel/CreatePlatformPanel/PlatForm/PlatForm'
import { ReadyMadeSolutions } from '../../../components/AppAdminPanel/CreatePlatformPanel/ReadyMadeSolutions/ReadyMadeSolutions'
import ButtonNew, { ButtonNewTypes } from '../../../components/UI/ButtonNew'
import Modal from '../../../components/UI/Modal'
import Loader from '../../../components/UI/Loader'

import styles from './PlatformEditPanel.module.scss'

export const PlatFormEditPanel = () => {
  const [filtersReady, setFiltersReady] = useState<boolean | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState(false)

  const status = useAppSelector((state) => state.statusPlatformsSlice.statusPlatform)
  const filtersStatus = useAppSelector((state) => state.adminFiltersSlice.statusGetFiltes)
  const selectedImg = useAppSelector((state) => state.adminPlatformCreateSlice.platformImg)

  const {
    platformName,
    platformLongDesc,
    platformShortDesc,
    tags,
    postImageStatus,
    previewImg,
    platformUrl,
    /* popularReadyMadeSolutionsBack, */
    readyMadeSolutionsBack,
    settingsBack,
    basicPossibilityBack,
    additionalPossibilityBack
  } = useAppSelector((state) => state.adminPlatformCreateSlice)
  const parameters = useAppSelector((state) => state.adminFiltersSlice.chosenFiltersBack)

  useEffect(() => {
    if (id && filtersReady === false) {
      dispatch(getAllFilters(true))
      setFiltersReady(true)
    }
    if (id && filtersReady && filtersStatus === 'fulfilled') {
      dispatch(getPlatformInfo(id))
    }
  }, [filtersReady, filtersStatus])

  useEffect(() => {
    if (id && postImageStatus === 'fulfilled') {
      dispatch(
        editPlatform({
          id: Number(id),
          platform: {
            name: platformName,
            description: platformShortDesc,
            categories: tags,
            fullDescription: platformLongDesc,
            imageUrl: previewImg ? previewImg : '',
            fileName: previewImg ? previewImg.slice(18) : '',
            url: platformUrl,
            parameters: parameters,
            platformTemplateId: readyMadeSolutionsBack,
            settingsDescription: { id: Number(id), textBlocks: settingsBack },
            basicFeaturesDescription: { id: Number(id), textBlocks: basicPossibilityBack },
            additionalFeaturesDescription: { id: Number(id), textBlocks: additionalPossibilityBack }
          }
        })
      )
      dispatch(setPlatformImg())
      dispatch(setPostImgStatus(''))
    }
  }, [postImageStatus])

  useEffect(() => {
    dispatch(setStatusPlatform(''))
    dispatch(resetAll())
    dispatch(resetAllFilters())
    setFiltersReady(false)
  }, [id])

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      return (event.returnValue = '')
    }
    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true })
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true })
    }
  }, [])

  const handleCancel = () => {
    dispatch(resetAll())
    dispatch(resetAllFilters())
    navigate('/admin/platforms/platform-collection')
    setOpenModal(false)
  }

  const cancelCancel = () => {
    setOpenModal(false)
  }

  return status === 'pending' || status === '' ? (
    <Loader />
  ) : (
    <div className={styles.platformCreation}>
      <div className={styles.platformCreation__template}>
        <div className={styles.template__header}>
          <h2 className={styles.template__title}>Редактирование платформы</h2>
          <div className={styles.template__iconWrap}>
            <AdminPanelUserPanel admin={fakeAdmin} />
          </div>
        </div>
        <PlatForm isInEditMode />
        <AdditionalSettings isInEditMode />
        {/* <Feedback isInEditMode id={Number(id)} /> */}
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
                  editPlatform({
                    id: Number(id),
                    platform: {
                      name: platformName,
                      description: platformShortDesc,
                      categories: tags,
                      fullDescription: platformLongDesc,
                      imageUrl: previewImg ? previewImg : '',
                      fileName: previewImg ? previewImg.slice(18) : '',
                      url: platformUrl,
                      parameters: parameters,
                      platformTemplateId: readyMadeSolutionsBack,
                      settingsDescription: { id: Number(id), textBlocks: settingsBack },
                      basicFeaturesDescription: { id: Number(id), textBlocks: basicPossibilityBack },
                      additionalFeaturesDescription: { id: Number(id), textBlocks: additionalPossibilityBack }
                    }
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
        title={'Вы действительно хотите отменить редактирование платформы?'}
        approveMsg={'Да'}
        cancelMsg={'Нет'}
        onApprove={handleCancel}
        onCancel={cancelCancel}
      />
    </div>
  )
}
