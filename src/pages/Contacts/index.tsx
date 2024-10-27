import Loader from '../../components/UI/Loader'

import { VK } from '../../assets/SharingIcons/VK'

import { Telegram } from '../../assets/SharingIcons/Telegtam'

import { WhatsApp } from '../../assets/SharingIcons/WhatsApp'

import { SharingButton, SharingButtonAppearance } from '../../components/UI/SharingButton/SharingButton'

import { FeedbackForm } from '../../components/APP/FeedbackForm/FeedbackForm'

import { useAppSelector } from '../../redux/hooks'

import { responseStatus } from '../../@types/types/responseStatus'

import { TELEGRAM_LINK, VK_LINK, WHATSAPP_LINK } from './constants'

import styles from './Contacts.module.scss'

const Contacts = () => {
  const { status } = useAppSelector((state) => state.contactsSlice)
  return status === responseStatus.PENDING ? (
    <Loader />
  ) : (
    <div className={styles.contactsPageWrap}>
      <h1 className={styles.title}>Связаться с нами</h1>
      <span className={styles.text}>С 2018 года автоматизируем продажи и сервис через мессенджеры и чат-боты</span>
      <FeedbackForm />
      <div className={styles.bigText}>
        <p>Свяжитесь с нами, чтобы узнать, как чат-боты помогут вашему бизнесу</p>
        <a href="tel:+79119547183">+7 911 954-71-83</a>
      </div>
      <div className={styles.sharingButtons}>
        <SharingButton type={SharingButtonAppearance.VK} icon={<VK />} text={'Vkontakte'} link={VK_LINK} />
        <SharingButton type={SharingButtonAppearance.TG} icon={<Telegram />} text={'Telegram'} link={TELEGRAM_LINK} />
        <SharingButton
          type={SharingButtonAppearance.WhatsApp}
          icon={<WhatsApp />}
          text={'Whatsapp'}
          link={WHATSAPP_LINK}
        />
      </div>
    </div>
  )
}

export default Contacts
