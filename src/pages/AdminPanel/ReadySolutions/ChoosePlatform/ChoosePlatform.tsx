import { ShortPlatformType } from '../../../../@types/types/platforms'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'

import { setPlatform } from '../../../../redux/AdminTemplatesCreate/adminTemplateCreateSlice'

import { AddAnEventIcon } from '../../../../assets/AdminPanel/ReadySolutions/AddAnEventIcon'

import { PlatformModal } from '../../../../components/AppAdminPanel/CreatePlatformPanel/ReadyMadeSolutions/TemplatesPlatformsModal'

import PlatformCard from '../../../../components/APP/PlatformCard'

import { useModal } from '../../../../hooks/useModal'

import styles from './ChoosePlatform.module.scss'

export const ChoosePlatform = () => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const platform = useAppSelector((state) => state.adminTemplateCreateSlice.platform)
  const dispatch = useAppDispatch()
  const handleSelectPlatforms = (platform: ShortPlatformType | null) => {
    dispatch(setPlatform(platform))
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <p>{platform !== null ? 'Платформа' : 'Выбрать платформу для готового решения'}</p>
      </div>
      <div className={styles.containerWrap}>
        <div className={styles.container} onClick={openModal}>
          <div className={styles.icon}>
            <AddAnEventIcon />
          </div>
          <p>{platform !== null ? 'Изменить' : 'Выбрать'}</p>
        </div>
      </div>
      {platform !== null && (
        <div className={styles.selectedPlatforms}>
          <PlatformCard key={platform.id} platform={platform} index={0} className={styles.selectedPlatformCard} />
        </div>
      )}
      <PlatformModal isOpen={isModalOpen} closeModal={closeModal} onSelectPlatforms={handleSelectPlatforms} />
    </div>
  )
}
