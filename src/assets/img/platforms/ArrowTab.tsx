type ArrowTabType = {
  className?: string
}

const ArrowTab: React.FC<ArrowTabType> = ({ className }) => {
  return (
    <svg className={className} width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.5 6.99928L18.9995 3.99958L15.5 1"
        stroke="#032D60"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.999979 3.49951H0.499979V4.49951H0.999979V3.49951ZM18.8198 4.49951C19.096 4.49951 19.3198 4.27565 19.3198 3.99951C19.3198 3.72337 19.096 3.49951 18.8198 3.49951V4.49951ZM0.999979 4.49951L18.8198 4.49951V3.49951L0.999979 3.49951V4.49951Z"
        fill="#032D60"
      />
    </svg>
  )
}

export default ArrowTab
