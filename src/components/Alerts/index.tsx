import { useReactiveVar } from '@apollo/client'

import { alertsVar } from 'apollo/variables/app'
import { Alert } from 'components/ui/Alert'

import s from './index.module.sass'

export const Alerts = () => {
  const alerts = useReactiveVar(alertsVar)

  return (
    <div className={s.alerts}>
      {alerts?.map((item, index) => (
        <Alert key={index} {...item} />
      ))}
    </div>
  )
}
