import { motion } from 'framer-motion'
import { ReactNode } from 'react'

import { CloseIcon } from '../../assets/img/platforms/CloseIcon'

import styles from './Modal.module.scss'

const modalVariants = {
  visible: {
    y: '0',
    transition: { duration: 0.5 }
  },
  hidden: { y: '-100%' },
  exit: { y: '100%', transition: { duration: 0.5 } }
}

interface IProps {
  children: ReactNode
  closeModal: () => void
}

export const Modal = ({ children, closeModal }: IProps) => {
  return (
    <motion.div
      className={styles.background}
      onClick={closeModal}
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit">
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation()
        }}>
        <button className={styles.buttonClose} onClick={closeModal}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </motion.div>
  )
}

export default Modal
