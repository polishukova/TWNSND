type SearchHistoryIconType = {
  active: boolean
}

const SearchHistoryIcon: React.FC<SearchHistoryIconType> = ({ active }) => {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 11.25V18"
        stroke={active ? '#032D60' : 'white'}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.85 21.375L18 18"
        stroke={active ? '#032D60' : 'white'}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0977 14.0203H4.47266V8.39526"
        stroke={active ? '#032D60' : 'white'}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.25391 26.7469C10.9842 28.4786 13.1892 29.6582 15.59 30.1365C17.9908 30.6148 20.4795 30.3703 22.7413 29.434C25.0031 28.4976 26.9364 26.9115 28.2967 24.8762C29.6569 22.841 30.3829 20.448 30.3829 18C30.3829 15.552 29.6569 13.1591 28.2967 11.1238C26.9364 9.0885 25.0031 7.50237 22.7413 6.56603C20.4795 5.62969 17.9908 5.38522 15.59 5.86353C13.1892 6.34184 10.9842 7.52145 9.25391 9.25313L4.47266 14.0203"
        stroke={active ? '#032D60' : 'white'}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default SearchHistoryIcon
