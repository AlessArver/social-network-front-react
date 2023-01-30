import { FC } from 'react'
import clsx from 'clsx'

import s from './index.module.sass'

export interface IAvatar {
  src?: string
  alt?: string
  width: number
  height: number
  className?: string
}
export const Avatar: FC<IAvatar> = ({ src, alt, width, height, className }) => {
  return (
    <div style={{ width, height }} className={clsx(s.avatar, className)}>
      {!!src && <img src={src} alt={alt} className={s.avatar__image} />}
    </div>
  )
}
