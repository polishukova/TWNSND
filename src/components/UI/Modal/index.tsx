import classNames from 'classnames'

import styles from './Modal.module.scss'

type ModalType = {
  title: string
  subtitle?: string
  onApprove: () => void
  approveMsg: string
  cancelMsg: string
  onCancel: () => void
  openModal: boolean
}
const Modal: React.FC<ModalType> = ({ title, subtitle, approveMsg, cancelMsg, openModal, onApprove, onCancel }) => {
  return (
    <div className={classNames(styles.bgModal, { [styles.showModal]: openModal })}>
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.text}> {subtitle}</p>}
        </div>
        <div className={styles.innerBtn}>
          <button onClick={onApprove} className={styles.btnExit}>
            {approveMsg}
          </button>
          <button onClick={onCancel} className={styles.btnCancel}>
            {cancelMsg}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
