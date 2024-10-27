import { motion } from 'framer-motion'

import styles from './ErrorInput.module.scss'

interface IProps {
  errorMessage: string
}

const errorVariants = {
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  hidden: { y: -8, opacity: 0 }
}

const ErrorInput = ({ errorMessage }: IProps) => {
  return (
    <motion.div variants={errorVariants} initial="hidden" animate="visible" className={styles.errorMessage}>
      {errorMessage}
    </motion.div>
  )
}

export default ErrorInput
