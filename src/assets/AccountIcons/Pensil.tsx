type LikeType = {
  className: string
}

const Pensil: React.FC<LikeType> = ({ className }) => {
  return (
    <svg
      className={className}
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_dd_59_1026)">
        <circle cx="36" cy="28" r="16" fill="white" />
        <circle cx="36" cy="28" r="15.8" stroke="#E6EDF3" strokeWidth="0.4" />
      </g>
      <path
        d="M33.2422 34.8751H29.75C29.5842 34.8751 29.4253 34.8092 29.3081 34.692C29.1909 34.5748 29.125 34.4158 29.125 34.2501V30.7579C29.1247 30.6767 29.1404 30.5963 29.1713 30.5212C29.2021 30.4461 29.2474 30.3779 29.3047 30.3204L38.6797 20.9454C38.7378 20.8863 38.8072 20.8394 38.8836 20.8074C38.9601 20.7754 39.0421 20.7589 39.125 20.7589C39.2079 20.7589 39.2899 20.7754 39.3664 20.8074C39.4428 20.8394 39.5122 20.8863 39.5703 20.9454L43.0547 24.4297C43.1137 24.4879 43.1606 24.5572 43.1927 24.6337C43.2247 24.7101 43.2411 24.7922 43.2411 24.8751C43.2411 24.9579 43.2247 25.04 43.1927 25.1164C43.1606 25.1929 43.1137 25.2622 43.0547 25.3204L33.6797 34.6954C33.6222 34.7526 33.5539 34.7979 33.4788 34.8288C33.4038 34.8596 33.3233 34.8753 33.2422 34.8751V34.8751Z"
        stroke="#032D60"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M36.625 23L41 27.375" stroke="#032D60" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <filter
          id="filter0_dd_59_1026"
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
          <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_59_1026" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="12" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0 0.294118 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_59_1026" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="6" operator="erode" in="SourceAlpha" result="effect2_dropShadow_59_1026" />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0 0.294118 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_59_1026" result="effect2_dropShadow_59_1026" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_59_1026" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default Pensil
