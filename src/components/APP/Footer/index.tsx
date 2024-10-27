import { LogoFooter } from '../../../assets/FooterIcons/LogoFooter'

import { footerTexts, socialLinks } from './constants'

import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.containerlogo}>
          <LogoFooter />
        </div>
        <div className={styles.containerIcons}>
          {socialLinks.map(({ id, Icon, link }) => (
            <div className={styles.icon} key={id}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Icon />
              </a>
            </div>
          ))}
        </div>
        <div className={styles.lists}>
          <ul className={styles.textList}>
            {footerTexts.map(({ id, text }) => (
              <li className={styles.textDesc} key={id}>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
