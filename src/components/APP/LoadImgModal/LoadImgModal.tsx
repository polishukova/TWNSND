import classNames from 'classnames'

import { useEffect } from 'react'
import { useFilePicker } from 'use-file-picker'
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator
} from 'use-file-picker/validators'
import { toast } from 'react-toastify'

import { Load } from '../../../assets/AccountIcons/Load'
import { ZoomIn } from '../../../assets/AccountIcons/ZoomIn'
import { ZoomOut } from '../../../assets/AccountIcons/ZoomOut'
import { PlusIcon } from '../../../assets/AdminPanel/Specialists/PlusIcon'
import ButtonNew, { ButtonNewTypes } from '../../UI/ButtonNew'

import { CroppieImg } from './Croppie'

import styles from './LoadImgModal.module.scss'

type Props = {
  isOpenModal: boolean
  setIsOpenModal: () => void
}

const FILESIZE = 30 * 1024 * 1024

export const LoadImgModal = ({ isOpenModal, setIsOpenModal }: Props) => {
  const { openFilePicker, filesContent, loading, errors, clear } = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: false,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(['jpg', 'png']),
      new FileSizeValidator({ maxFileSize: FILESIZE }),
      new ImageDimensionsValidator({
        maxHeight: 900, // in pixels
        maxWidth: 1600,
        minHeight: 320,
        minWidth: 320
      })
    ]
  })

  useEffect(() => {
    // if (loading) {
    //   toast.loading('Загрузка..')
    // }
    if (errors.length) {
      toast.error('Изображение не соответствует требованиям')
    }
  }, [loading, errors])

  return (
    <div className={isOpenModal ? styles.wrapper : styles.hide}>
      <div className={styles.modal}>
        <button className={styles.icon} onClick={() => setIsOpenModal()}>
          <PlusIcon />
        </button>
        <p className={styles.title}>Загрузить фото</p>
        <div className={styles.photo}>
          {filesContent.map((file, index) => (
            <div key={index} className={styles.imgWrapper}>
              <img id="item" alt={file.name} src={file.content} />
              {/* <CroppieImg src={file.content} alt={file.name} /> */} //TODO: доделать в отдельной задаче
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <button className={styles.controlsBtn} onClick={() => openFilePicker()}>
            <Load />
          </button>
          <div className={styles.loupes}>
            <button className={styles.controlsBtn}>
              <ZoomIn />
            </button>
            <button className={styles.controlsBtn}>
              <ZoomOut />
            </button>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={classNames(styles.btn, styles.cancel)} onClick={() => setIsOpenModal()}>
            Отмена
          </button>
          <ButtonNew title={'Загрузить'} type={ButtonNewTypes.Secondary} buttonType="submit" className={styles.btn} />
        </div>
      </div>
    </div>
  )
}
