import parse from 'html-react-parser'

import { PlatformType } from '../../../@types/types/platforms'

import styles from './BasicFeaturesPlatform.module.scss'

type BasicFeaturesPlatformType = {
  platform: PlatformType | undefined
}

const BasicFeaturesPlatform: React.FC<BasicFeaturesPlatformType> = ({ platform }) => {
  return <div className={styles.wrap}>{/* {parse(`${platform?.basicFeaturesHtml}`)} */}</div>
}

export default BasicFeaturesPlatform
