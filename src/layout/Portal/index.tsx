import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

export enum PortalTarget {
  REVIEWMODAL = 'review'
}

interface IPortalProps {
  target: PortalTarget
  children: ReactNode
}

export const Portal = ({ target, children }: IPortalProps) => {
  const root = document.getElementById(target) as HTMLElement

  return ReactDOM.createPortal(children, root)
}
