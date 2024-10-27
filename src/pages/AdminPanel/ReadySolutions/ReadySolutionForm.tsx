import { useEffect } from 'react'

import classNames from 'classnames'

import { useFileSelect } from '../../../hooks/useFileselect'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import { PlatFormInput } from '../../../components/UI/PlatFormInput/PlatFormInput'
import { PlatFormTextarea } from '../../../components/UI/PlatFormTextarea/PlatFormTextarea'
import ImgPlatform from '../../../assets/img/ImgPlatform'
import {
  setTemplateImg,
  setTemplateLongDesc,
  setTemplateName,
  setTemplateShortDesc
} from '../../../redux/AdminTemplatesCreate/adminTemplateCreateSlice'

import styles from './ReadySolutionForm.module.scss'

type Props = {
  isInEditMode: boolean
}

export const ReadySolutionForm = ({ isInEditMode }: Props) => {
  const dispatch = useAppDispatch()
  const { previewTempImg, templateName, templateShortDesc, templateLongDesc } = useAppSelector(
    (state) => state.adminTemplateCreateSlice
  )

  const { onFileSelect, preview, selectedFile } = useFileSelect()

  useEffect(() => {
    dispatch(setTemplateImg(selectedFile))
  }, [selectedFile])

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
            name={'template-name'}
            value={templateName}
            placeholder={'Введите название готового решения'}
            onChange={(e) => dispatch(setTemplateName(e.target.value))}
          />
          <PlatFormTextarea
            isInEditMode={isInEditMode}
            name={'short-temp-desc'}
            value={templateShortDesc}
            textMaxLength={200}
            placeholder={'Введите описание готового решения для краткой карточки'}
            onChange={(e) => dispatch(setTemplateShortDesc(e.target.value))}
            height={!isInEditMode ? '90px' : ''}
          />
          <PlatFormTextarea
            isInEditMode={isInEditMode}
            name={'long-temp-desc'}
            value={templateLongDesc}
            textMaxLength={800}
            placeholder={'Введите описание готового решения для детальной карточки'}
            onChange={(e) => dispatch(setTemplateLongDesc(e.target.value))}
            height={!isInEditMode ? '250px' : ''}
          />
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
              <img src={preview} alt="img-preview" className={styles.form__img} />
            ) : previewTempImg ? (
              <img src={previewTempImg} alt="img-preview" className={styles.form__img} />
            ) : (
              <ImgPlatform />
            )}
          </label>
          <input type={'file'} id="add-single-img" className={styles.form__inputFile} onChange={onFileSelect} />
        </div>
      </div>
    </form>
  )
}
