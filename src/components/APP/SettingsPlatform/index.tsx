import parse from 'html-react-parser'

import { PlatformType } from '../../../@types/types/platforms'

import styles from './SettingsPlatforms.module.scss'

type SettingsPlatformsType = {
  platform: PlatformType | undefined
}

const SettingsPlatforms: React.FC<SettingsPlatformsType> = ({ platform }) => {
  return (
    <>
      {/*       <div className={styles.wrap}>{parse(`${platform?.settingsHtml}`)}</div>
      <div className={styles.title}>Конструктор {platform?.name}. Видеоинструкция</div>
      <div className={styles.video}>{parse(`${platform?.videoHtml}`)}</div> */}
    </>
  )
}

export default SettingsPlatforms
