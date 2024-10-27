import { useEffect } from 'react'

import classNames from 'classnames'

import { SERVER } from '../../../../@types/constant'

import { useFileSelect } from '../../../../hooks/useFileselect'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'

import {
  removeTag,
  setPlatformUrl,
  postPlatformImg,
  setPlatformLongDesc,
  setPlatformName,
  setPlatformShortDesc,
  setPlatformImg
} from '../../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'

import { PlatFormInput } from '../../../UI/PlatFormInput/PlatFormInput'
import { PlatFormTextarea } from '../../../UI/PlatFormTextarea/PlatFormTextarea'
import ImgPlatform from '../../../../assets/img/ImgPlatform'
import { AddableSection } from '../AddableSection/AddableSection'

import Close from '../../../../assets/img/Close'

import styles from './PlatForm.module.scss'

type PlatFormProps = {
  isInEditMode?: boolean
}

export const PlatForm = ({ isInEditMode }: PlatFormProps) => {
  const dispatch = useAppDispatch()
  const { platformName, platformUrl, platformShortDesc, platformLongDesc, previewImg, tags } = useAppSelector(
    (state) => state.adminPlatformCreateSlice
  )

  const { onFileSelect, preview, selectedFile } = useFileSelect()
  useEffect(() => {
    dispatch(setPlatformImg(selectedFile))
  }, [selectedFile])
  const templatesMessengers = useAppSelector(
    (state) =>
      state.adminFiltersSlice.chosenFiltersUI
        .find((category) => category.name === 'Каналы')
        ?.filters.find((filter) => filter.name === 'Мессенджеры')?.parameters
  )

  return (
    <form
      className={classNames(styles.template__form, {
        [styles.template__formEdit]: isInEditMode
      })}>
      <div
        className={classNames(styles.form__info, {
          [styles.form__infoEdit]: isInEditMode
        })}>
        <div
          className={classNames(styles.form__text, {
            [styles.form__textEdit]: isInEditMode
          })}>
          <PlatFormInput
            isInEditMode={isInEditMode}
            type={'text'}
            name={'platform-name'}
            value={platformName}
            placeholder={'Введите название платформы'}
            onChange={(e) => dispatch(setPlatformName(e.target.value))}
          />
          <PlatFormInput
            isInEditMode={isInEditMode}
            type={'url'}
            name={'platform-url'}
            value={platformUrl}
            pattern={'https://.*'}
            placeholder={'Введите ссылку на сайт Платформы'}
            onChange={(e) => dispatch(setPlatformUrl(e.target.value))}
          />
          <PlatFormTextarea
            isInEditMode={isInEditMode}
            name={'short-desc'}
            value={platformShortDesc}
            textMaxLength={200}
            placeholder={'Введите описание платформы для краткой карточки'}
            onChange={(e) => dispatch(setPlatformShortDesc(e.target.value))}
            height={!isInEditMode ? '90px' : ''}
          />
          <PlatFormTextarea
            isInEditMode={isInEditMode}
            name={'long-desc'}
            value={platformLongDesc}
            textMaxLength={800}
            placeholder={'Введите описание платформы для детальной карточки'}
            onChange={(e) => dispatch(setPlatformLongDesc(e.target.value))}
            height={!isInEditMode ? '250px' : ''}
          />
          {isInEditMode && templatesMessengers?.length !== 0 && (
            <div className={classNames(styles.messengers, styles.messengersEdit)}>
              {templatesMessengers?.map((value, index) => (
                <span key={value.id} className={styles.form__messengers}>
                  {index === templatesMessengers.length - 1 ? value.name : `${value.name}, `}
                </span>
              ))}
            </div>
          )}
          <div
            className={classNames(styles.form__sectionsWrap, {
              [styles.form__sectionsWrapEdit]: isInEditMode
            })}>
            <AddableSection title={'Фильтрация'}></AddableSection>
            <AddableSection title={'Добавьте Тэг'}></AddableSection>
            {tags?.length !== 0 && (
              <div className={styles.categoriesWrapper}>
                {tags.map((tag, index) => (
                  <span key={'tag-' + index} className={styles.category}>
                    {tag.name}
                    <Close className={styles.categoryRemove} onClick={() => dispatch(removeTag(tag.name))} />
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className={classNames(styles.form__imgWrap, {
            [styles.form__imgWrapEdit]: isInEditMode
          })}>
          <label
            htmlFor="add-single-img"
            className={classNames(styles.form__labelFile, {
              [styles.form__labelFileEdit]: isInEditMode
            })}>
            {selectedFile ? (
              <img src={preview} alt="img-preview" className={styles.form__img}></img>
            ) : previewImg ? (
              <img src={SERVER + previewImg} alt="img-preview" className={styles.form__img}></img>
            ) : (
              <ImgPlatform />
            )}
          </label>
          <input type={'file'} id="add-single-img" className={styles.form__inputFile} onChange={onFileSelect} />
        </div>
      </div>
    </form >
  )
}
