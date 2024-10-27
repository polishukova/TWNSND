import { mainContacts } from './constants'

import styles from './contacts.module.scss'

const ContactsList = () => {
  return (
    <>
      {mainContacts.map(({ name, Icon, link }) => (
        <li>
          <a href={link}>
            <Icon />
            <span>{name}</span>
          </a>
        </li>
      ))}
    </>
  )
}

export const MainContacts = () => {
  return (
    <div id={styles.mainContacts}>
      <ul>
        <ContactsList />
      </ul>
    </div>
  )
}
