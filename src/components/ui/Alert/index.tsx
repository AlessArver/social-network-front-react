import { IAlertModel } from 'models/alert'

import s from './index.module.sass'
import { MdClose } from 'react-icons/md'
import clsx from 'clsx'

export interface IAlert {
  onRemove?: () => void
}
export const Alert = ({ message, status, onRemove }: IAlert & IAlertModel) => {
  return (
    <div className={clsx(s.alert, s[`alert_${status}`])}>
      {message}
      {!!onRemove && <MdClose onClick={onRemove} />}
    </div>
  )
}
