import styles from './RangeInputsGroup.module.scss'

type RangeInputsGroupType = {
  value: string
  wrapClassName?: string
  inputClassName?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isError?: boolean
  cost?: { from: string; to: string }
}

export const RangeInputsGroup = ({
  value,
  wrapClassName,
  inputClassName,
  onChange,
  cost,
  isError }: RangeInputsGroupType) => {


  return (<>
    <div className={wrapClassName}>
      <span>от</span>
      <input name="from" type="text" placeholder="0" value={(cost && cost.from) ? cost.from : ''}
        className={inputClassName} onChange={onChange} />
      <span>до</span>
      <input name="to" type="text" placeholder="10000" value={(cost && cost.to) ? cost.to : ''}
        className={inputClassName} onChange={onChange} />
      <span>{value}</span>
    </div>
    {isError && <p className={styles.tariffErrorMessage}>Поле "от" не может быть больше поля "до"</p>}
  </>
  )
}
