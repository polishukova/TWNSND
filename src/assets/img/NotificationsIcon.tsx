type NotificationsIconType = {
  className: string
  onClick: () => void
}

const NotificationsIcon: React.FC<NotificationsIconType> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.73 20C12.5542 20.3031 12.3018 20.5547 11.9982 20.7295C11.6946 20.9044 11.3504 20.9965 11 20.9965C10.6496 20.9965 10.3054 20.9044 10.0018 20.7295C9.69816 20.5547 9.44581 20.3031 9.27 20M21 16H1C1.79565 16 2.55871 15.6839 3.12132 15.1213C3.68393 14.5587 4 13.7956 4 13V8C4 6.14348 4.7375 4.36301 6.05025 3.05025C7.36301 1.7375 9.14348 1 11 1C12.8565 1 14.637 1.7375 15.9497 3.05025C17.2625 4.36301 18 6.14348 18 8V13C18 13.7956 18.3161 14.5587 18.8787 15.1213C19.4413 15.6839 20.2044 16 21 16Z"
          stroke="#032D60"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default NotificationsIcon
