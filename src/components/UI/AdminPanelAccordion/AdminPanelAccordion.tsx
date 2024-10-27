import classNames from 'classnames'

import { useToggle } from '../../../hooks/useToggle'

import { AccordionArrowIcon } from '../../../assets/AdminPanel/ReadySolutions/AccordionArrowIcon'

import styles from './AdminPanelAccordion.module.scss'

type TAccordion = {
  title: string
  children: React.ReactNode
}

export const AdminPanelAccordion = ({ title, children }: TAccordion) => {
  const [isOpen, setIsOpen] = useToggle(false)

  return (
    <div className={styles.accordionSection}>
      <div className={styles.accordionTitle} onClick={setIsOpen}>
        {title}
        <div className={classNames(styles.accordionArrow, { [styles.rotate]: isOpen })}>
          <AccordionArrowIcon />
        </div>
      </div>
      <div className={classNames(styles.accordionContent, { [styles.open]: isOpen })}>
        <div className={styles.accordionContentInner}>{children}</div>
      </div>
    </div>
  )
}
