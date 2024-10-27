import { ShortPlatformType } from '../../../../../@types/types/platforms'

import PlatformCard from '../../../../APP/PlatformCard'

type PlatformListProps = {
  platforms: ShortPlatformType[]
  onPlatformClick: (platform: ShortPlatformType) => void,
  selectedPlatform: ShortPlatformType | null
}

export const PlatformList: React.FC<PlatformListProps> = ({ platforms, onPlatformClick, selectedPlatform }) => {
  const handleCardClick = (platform: ShortPlatformType) => {
    onPlatformClick(platform)
  }

  if (!platforms.length) return <div>Платформы не найдены</div>

  return (
    <>
      {platforms.map((platform, index) => (
        <PlatformCard
          key={platform.id}
          platform={platform}
          index={index}
          onClick={() => handleCardClick(platform)}
          isSelected={platform.id === (selectedPlatform ? selectedPlatform.id : 0)}
        />
      ))}
    </>
  )
}
