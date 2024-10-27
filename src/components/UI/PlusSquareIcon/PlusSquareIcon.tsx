import styles from './PlusSquareIcon.module.scss'

type PlusIconProps = {
  onClick: () => void
  num?: string
}

export const PlusSquareIcon = ({ onClick, num }: PlusIconProps) => {
  return (
    <button className={styles.plussquareicon} onClick={onClick}>
      {num ? (
        <span className={'icon-' + num}></span>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M8 12H16" stroke-linecap="square" stroke-linejoin="round" />
          <path d="M12 16V8" stroke-linecap="square" stroke-linejoin="round" />
        </svg>
      )}
    </button>
  )
}
