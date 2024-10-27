export const PlatformsIcon = ({ width = '24', height = '24' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 16.5L12 21.75L21 16.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M3 12L12 17.25L21 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M3 7.5L12 12.75L21 7.5L12 2.25L3 7.5Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
