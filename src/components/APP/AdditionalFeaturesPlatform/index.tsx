import parse from 'html-react-parser'

import { PlatformType } from '../../../@types/types/platforms'

import styles from './AdditionalFeaturesPlatform.module.scss'

type AdditionalFeaturesPlatformType = {
  platform: PlatformType | undefined
}

const AdditionalFeaturesPlatform: React.FC<AdditionalFeaturesPlatformType> = ({ platform }) => {
  return <div className={styles.wrap}>{/* {parse(`${platform?.additionalFeaturesHtml}`)} */}</div>
}

export default AdditionalFeaturesPlatform
