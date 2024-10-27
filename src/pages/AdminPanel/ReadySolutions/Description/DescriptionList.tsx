import { AdminPanelAccordion } from '../../../../components/UI/AdminPanelAccordion/AdminPanelAccordion'

import { mockDescriptionArr as data } from './constants'

import styles from './DescriptionList.module.scss'

export const DescriptionList = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <p>Описание</p>
      </div>
      {data.map((section) =>
        section.filters.map((filter) => (
          <AdminPanelAccordion key={filter.id} title={filter.name}>
            {filter.parameters.map((parameter) => (
              <div className={styles.select} key={parameter.id}>
                <div className={styles.selectIcon}>
                  <input type="checkbox" />
                </div>
                <div className={styles.selectText}>{parameter.name}</div>
              </div>
            ))}
          </AdminPanelAccordion>
        ))
      )}
    </div>
  )
}
