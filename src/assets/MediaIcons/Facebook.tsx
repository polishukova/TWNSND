import { useWindowSize } from '../../hooks/useWindowsSize'

const Facebook = () => {
  const { width: widthWindow = 0 } = useWindowSize()

  return (
    <svg
      width={widthWindow > 1024 ? '12.5' : widthWindow > 480 ? '11.5' : '9.5'}
      height={widthWindow > 1024 ? '24' : widthWindow > 480 ? '22' : '18'}
      viewBox="0 0 14 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.72828 13.3806H12.6123L13.2221 9.4109H8.72749V7.24129C8.72749 5.59223 9.26305 4.12993 10.7963 4.12993H13.26V0.665705C12.8271 0.606895 11.9116 0.478149 10.1817 0.478149C6.56944 0.478149 4.45167 2.39742 4.45167 6.77001V9.4109H0.738281V13.3806H4.45167V24.2914C5.18709 24.4027 5.93198 24.4781 6.69661 24.4781C7.38779 24.4781 8.06238 24.4146 8.72828 24.324V13.3806Z"
        fill="#032D60"
      />
    </svg>
  )
}

export default Facebook
