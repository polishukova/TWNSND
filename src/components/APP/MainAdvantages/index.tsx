import styles from './advantages.module.scss'

import { DollarIcon, FrameIcon, LightIcon, GroupIcon } from './AdventagesIcon'

export const AdventagesCard = ({
  Icon,
  title,
  description
}: {
  Icon: React.ComponentType
  title: string
  description: string
}) => {
  return (
    <div className={styles.advantages__cardsWwrap}>
      <div className={styles.group}>
        <Icon />
      </div>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}

export const MainAdvantages = () => {
  return (
    <div className={styles.advantages}>
      <div className={styles.advantages__top}>
        <h3>Наши преимущества</h3>
        <p>
          Закажите шаблон чат-бота под любую задачу вашего бизнеса. Здесь вы найдете только проверенные решения,
          созданные на основе нашего 5-летнего опыта.
        </p>
      </div>
      <div className={styles.advantages__bottom}>
        <div className={styles.top_cards}>
          <AdventagesCard
            title="Увеличение конверсий"
            description="За счёт эффективных и гарантированно качественных шаблонов чат-ботов"
            Icon={GroupIcon}
          />
          <AdventagesCard
            title="Снижение затрат"
            description="Готовые и простые бизнес решения позволят не только снизить затраты, но и увеличить прибыль"
            Icon={DollarIcon}
          />
        </div>
        <div className={styles.bottom_cards}>
          <AdventagesCard
            title="Решения по автоматизации"
            description="Позволят экономить время и привлекать больше клиентов"
            Icon={LightIcon}
          />
          <AdventagesCard
            title="Приём оплат в мессенджере"
            description="Используйте проверенные инструменты мессенджер-маркетинга"
            Icon={FrameIcon}
          />
        </div>
      </div>
    </div>
  )
}
