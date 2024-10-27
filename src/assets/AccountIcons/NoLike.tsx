type LikeType = {
  className: string
}

const NoLike: React.FC<LikeType> = ({ className }) => {
  return (
    <svg
      className={className}
      width="72"
      height="64"
      viewBox="0 0 72 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_dd_59_1022)">
        <circle cx="36" cy="28" r="16" fill="white" />
        <circle cx="36" cy="28" r="15.8" stroke="#E6EDF3" strokeWidth="0.4" />
      </g>
      <path
        d="M36 34.875C36 34.875 28.1875 30.5 28.1875 25.1875C28.1875 24.2484 28.5129 23.3382 29.1083 22.6119C29.7037 21.8856 30.5324 21.3881 31.4533 21.2039C32.3742 21.0197 33.3305 21.1603 34.1594 21.6017C34.9884 22.0431 35.6388 22.7581 36 23.625V23.625C36.3612 22.7581 37.0116 22.0431 37.8406 21.6017C38.6695 21.1603 39.6258 21.0197 40.5467 21.2039C41.4676 21.3881 42.2963 21.8856 42.8917 22.6119C43.4871 23.3382 43.8125 24.2484 43.8125 25.1875C43.8125 30.5 36 34.875 36 34.875Z"
        stroke="#BFC1C8"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_dd_59_1022"
          x="0"
          y="0"
          width="72"
          height="72"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_59_1022" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="12" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0 0.294118 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_59_1022" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="6" operator="erode" in="SourceAlpha" result="effect2_dropShadow_59_1022" />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0 0.294118 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_59_1022" result="effect2_dropShadow_59_1022" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_59_1022" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default NoLike
