import { useRef, useState } from 'react'
import classNames from 'classnames'
import { useOnClickOutside } from 'usehooks-ts'

import { SERVER } from '../../../@types/constant'
import { PlatformType } from '../../../@types/types/platforms'
import InputRadio from '../../UI/InputRadio'
import Setings from '../../../assets/img/platforms/Setings'

import styles from './IntegrationsPlatform.module.scss'

type IntegrationsPlatformType = {
  platform: PlatformType | undefined
}

const integrationsTab = ['Все', 'Мессенджеры', 'CRM', 'Сервисы-интеграторы', 'Платежные системы', 'Голосовые помощники']

const IntegrationsPlatform: React.FC<IntegrationsPlatformType> = ({ platform }) => {
  const [valueRadioCheck, setValueRadioCheck] = useState('Все')
  const [openIntegrationsTab, setopenIntegrationsTab] = useState(false)
  const refModal = useRef<HTMLDivElement>(null)

  /*const allIntegrationsPlatform =
    platform &&
    platform.messengers.concat(
      platform.crms,
      platform.integrationServices,
      platform.paymentGateways,
      platform.voiceAssistants
    )

  const filterIntegrationsPlatform = () => {
    switch (valueRadioCheck) {
      case 'Мессенджеры':
        return platform?.messengers
      case 'CRM':
        return platform?.crms
      case 'Сервисы-интеграторы':
        return platform?.integrationServices
      case 'Платежные системы':
        return platform?.paymentGateways
      case 'Голосовые помощники':
        return platform?.voiceAssistants
      default:
        return allIntegrationsPlatform
    }
  } 
  const renderIntegrations = filterIntegrationsPlatform()*/

  useOnClickOutside(refModal, () => {
    setopenIntegrationsTab(false)
  })
  return (
    <>
      <div ref={refModal} className={classNames(styles.wrap, { [styles.wrapActive]: openIntegrationsTab })}>
        {integrationsTab.map((value, index) => (
          <div
            key={index}
            className={styles.item}
            onClick={() => {
              setopenIntegrationsTab(false)
              setValueRadioCheck(value)
            }}>
            <InputRadio activ={valueRadioCheck === value} />
            {value}
          </div>
        ))}
      </div>
      <div
        className={styles.setings}
        onClick={() => {
          setopenIntegrationsTab(true)
        }}>
        <Setings />
      </div>
      <div className={styles.layot}>
        {/* {renderIntegrations &&
          renderIntegrations.map((value) => (
            <div key={value.name} className={styles.wrapCard}>
              <div className={styles.images}>
                <img src={SERVER + platform?.imageUrl} alt="icon" />
              </div>
              <div className={styles.text}>{value.name}</div>
            </div>
          ))} */}
      </div>
    </>
  )
}

export default IntegrationsPlatform
