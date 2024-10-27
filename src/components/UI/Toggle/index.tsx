import styles from './Toggle.module.scss'

interface IProps {
  value: boolean
  onChange: () => void
}

const Toggle = ({ value, onChange }: IProps) => (
  <label className={styles.switch}>
    <input type="checkbox" onClick={onChange} checked={value} readOnly />
    <span className={styles.slider} />
  </label>
)

export default Toggle
