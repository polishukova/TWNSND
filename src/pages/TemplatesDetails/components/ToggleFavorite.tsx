import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { addFavoriteTemplate, removeFavoriteTemplate, getTemplate } from '../../../redux/Templates/templatesSlice'
import Plas from '../../../assets/img/platforms/Plas'
import styles from '../TemplatesDetails.module.scss'
import { useAppSelector } from '../../../redux/hooks'

export function ToggleFavorite() {
  const dispatch = useDispatch()
  const { templateCard } = useAppSelector((state) => state.templatesSlice)
  const { statusTemplate } = useAppSelector((state) => state.platformsSlice)
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(
        getTemplate({
          templateId: Number(id),
          getDetails: false
        })
      )
    }
  }, [dispatch])

  const addToFavoriteClick = () => {
    if (id) {
      dispatch(
        addFavoriteTemplate({
          platformTemplateId: Number(id),
          callback: () => {
            dispatch(getTemplate({ templateId: Number(id), getDetails: false }))
          }
        })
      )
    }
  }

  const removeFromFavorites = () => {
    if (id) {
      dispatch(
        removeFavoriteTemplate({
          platformTemplateId: Number(id),
          callback: () => {
            dispatch(getTemplate({ templateId: Number(id), getDetails: false }))
          }
        })
      )
    }
  }

  const handleToggleFavorite = () => {
    if (templateCard.isUserFavorite) {
      removeFromFavorites()
    } else {
      addToFavoriteClick()
    }
  }

  return (
    <div
      className={classNames(styles.addPlatform, {
        [styles.removePlatform]: templateCard.isUserFavorite
      })}
      onClick={handleToggleFavorite}>
      {templateCard.isUserFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      <Plas />
    </div>
  )
}
