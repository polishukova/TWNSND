import headerImg from '../../../assets/img/header.png'
import { InfoBlock } from '../InfoBlock'
import { MainAdvantages } from '../MainAdvantages'
import { MainContacts } from '../MainContacts'
import { ReadyMadeSolutions } from '../ReadyMadeSolutions'
import ReviewsSection from '../ReviewsSection'
import { TariffSection } from '../TariffCard/tarifSection'
import { Works } from '../Works/index'

import styles from './Main.module.scss'
const Main = () => {
  return (
    <div>
      <InfoBlock />
      <MainContacts />
      <MainAdvantages />
      <ReadyMadeSolutions />
      <Works />
      <ReviewsSection />
      <div id="tariffSection">
        <TariffSection />
      </div>
    </div>
  )
}

export default Main
