import { useState } from 'react'

import classNames from 'classnames'

import IntegrationsPlatform from '../IntegrationsPlatform'
import SettingsPlatforms from '../SettingsPlatform'
import AdditionalFeaturesPlatform from '../AdditionalFeaturesPlatform'
import BasicFeaturesPlatform from '../BasicFeaturesPlatform'

import { PlatformType } from '../../../@types/types/platforms'

import styles from './TabsWorks.module.scss'

type TabsWorksType = {
  platform: PlatformType | undefined
}
const TabsWorks: React.FC<TabsWorksType> = ({ platform }) => {
  const tabs = [
    { name: 'Интеграции', tab: <IntegrationsPlatform platform={platform} /> },
    { name: 'Настройки', tab: <SettingsPlatforms platform={platform} /> },
    { name: 'Базовые возможности', tab: <BasicFeaturesPlatform platform={platform} /> },
    { name: 'Дополнительные возможности', tab: <AdditionalFeaturesPlatform platform={platform} /> }
  ]
  const [activeNaw, setActiveNaw] = useState('Интеграции')
  return (
    <div className={styles.wrap}>
      <div className={styles.naw}>
        {tabs.map((value, index) => (
          <div
            key={index}
            onClick={() => setActiveNaw(value.name)}
            className={classNames(styles.nawItem, {
              [styles.active]: activeNaw === value.name
            })}>
            {value.name}
          </div>
        ))}
      </div>
      {tabs.map((value, index) => (value.name === activeNaw ? <div key={index}>{value.tab}</div> : ''))}
    </div>
  )
}

export default TabsWorks
