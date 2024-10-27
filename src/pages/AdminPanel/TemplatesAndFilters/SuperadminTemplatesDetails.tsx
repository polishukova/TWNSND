import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import { UpDownArrows } from '../../../assets/AdminPanel/Platforms/UpDownArrows'
import Archive from '../../../assets/PlatformCard/Archive'
import Button, { ButtonTypes } from '../../../components/UI/Button'
import PlusWhite from '../../../assets/AccountIcons/PlusWhite'
import PlatformTemplateCard from '../../../components/UI/PlatformTemplateCard'

import styles from '../PlatformsAndFilters/PlatformsAndFilters.module.scss'
import { getTemplates, setSuperAdminTemplatesCount } from '../../../redux/Templates/templatesSlice'
import ModalWindow from '../../../components/APP/ModalWindow/ModalWindow'
import ButtonNew, { ButtonNewTypes } from '../../../components/UI/ButtonNew'

const CREATE_TEMPLATES_LINK = '/admin/templates/create'

export const SuperadminTemplatesDetails = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { templatesCards, templatesTotalCount, templatesCount } = useAppSelector((state) => state.templatesSlice)

  useEffect(() => {
    dispatch(
      getTemplates({
        data: {
          take: templatesCount,
          isShowUnpublished: true
        }
      })
    )
  }, [dispatch, templatesCount])

  return (
    <>
      <div className={styles.headerControl}>
        <h1 className={styles.title}>Готовые решения</h1>
        <div className={styles.buttonsControl}>
          <Button
            className={styles.buttonControl}
            title={<span>Опубликованные</span>}
            type={ButtonTypes.Primary}
            icon={<UpDownArrows />}
          />
          <Button
            className={styles.buttonControl}
            title={<span>Архив</span>}
            type={ButtonTypes.Primary}
            icon={<Archive />}
          />
        </div>
      </div>
      <div className={styles.platformsCards}>
        <Link to={CREATE_TEMPLATES_LINK} className={styles.createCard}>
          <div className={styles.createCardWrapper}>
            <div className={styles.createCardBody}>
              <div className={styles.createCardCircle}>
                <PlusWhite />
              </div>
            </div>
            <h2 className={styles.createCardTitle}>Добавить готовое решение</h2>
          </div>
        </Link>
        {templatesCards?.map(({ id, name, isUserFavorite, rating, isPublished }, index) => (
          <div className={styles.card} key={id}>
            <PlatformTemplateCard
              onClick={() => navigate(`/templates/${index}`)}
              title={name}
              like={isUserFavorite ? isUserFavorite : false}
              hiddenLikeImg
              rating={`${rating}`}
              id={id}
              index={index}
              isAdminPublished={isPublished}
            />
          </div>
        ))}
      </div>
      <ModalWindow title={'Уверены, что хотите снять карточку с публикации?'} type={'toRemovePublished'} />
      <ModalWindow title={'Уверены, что хотите опубликовать карточку?'} type={'toPublish'} />
      <ModalWindow title={'Уверены, что хотите переместить карточку в архив?'} type={'toArchive'} />

      {templatesCount < templatesTotalCount && (
        <ButtonNew
          title={'Показать больше'}
          type={ButtonNewTypes.Primary}
          className={styles.btn}
          onClick={() => {
            dispatch(setSuperAdminTemplatesCount())
          }}
        />
      )}
    </>
  )
}
