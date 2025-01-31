const AZSort = ({ className }: NameSortType) => {
  return (
    <svg
      className={className}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 3V21M7 21L3 17M7 21L11 17M15.5 14H20.5L15.5 21H20.5M16 9H20M15 10L18 3L21 10"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

const ZASort = ({ className }: NameSortType) => {
  return (
    <svg
      className={className}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 3V21M7 3L11 7M7 3L3 7M15.5 14H20.5L15.5 21H20.5M16 9H20M15 10L18 3L21 10"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

type NameSortType = {
  sortByAscending?: boolean
  className: string
}

const NameSort = ({ sortByAscending, className }: NameSortType) => {
  return <>{sortByAscending ? <AZSort className={className} /> : <ZASort className={className} />}</>
}

export default NameSort
