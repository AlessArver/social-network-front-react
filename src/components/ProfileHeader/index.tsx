import { ChangeEvent, FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { css } from '@emotion/react'

import { themeVar } from 'apollo/variables/app'
import { IUpdateUserRequest } from 'apollo/mutations/user/types'
import { IUser } from 'apollo/queries/user/user'

import { outlineFont } from 'assets/theme/styles'

import { AddFriend } from 'components/pages/profile/AddFriend'
import { Avatar } from 'components/ui/Avatar'
import { Button, ButtonSize } from 'components/ui/Button'
import { Input } from 'components/ui/Input'
import { Typography, FontTypeEnum, FontWeightEnum } from 'components/ui/Typography'

import s from './index.module.sass'

export interface IProfileHeader {
  user: IUser | null
  me: IUser | null
  updateUserLoading: boolean
  updateUser: (data: Omit<Partial<IUpdateUserRequest>, 'id'>) => void
}
export const ProfileHeader: FC<IProfileHeader> = ({ user, me, updateUserLoading, updateUser }) => {
  const theme = useReactiveVar(themeVar)

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateUser({ avatar: URL.createObjectURL(e.target.files[0]) })
    }
  }

  return (
    <div className={s.profileHeader}>
      <div className={s.profileHeader__column}>
        <div className={s.profileHeader__avatarWrapper}>
          <Input
            onChange={handleChangeAvatar}
            type='file'
            className={s.profileHeader__avatarInputWrapper}
            inputClassName={s.profileHeader__avatarInput}
          />
          <Avatar
            size={150}
            containerClassName={s.profileHeader__avatar}
            src={user?.avatar || me?.avatar}
            isOnline={user?.is_online || me?.is_online}
            showOnline
          />
        </div>
        <div className={s.profileHeader__fullName}>
          <Typography
            fontType={FontTypeEnum.h1}
            fontWeight={FontWeightEnum.bold}
            css={css`
              ${outlineFont(theme.card.background, theme.fontColor)}
            `}
          >
            {user?.first_name || me?.first_name} {user?.last_name || me?.last_name}
          </Typography>
          {/* TODO: need create new component for actions */}
          {me ? (
            me?.id !== user?.id && (
              <div className={s.profileHeader__actions}>
                <Button>Message</Button>
                <div />
                <Button size={ButtonSize.sm}>Remove</Button>
                <Button size={ButtonSize.sm}>Block</Button>
              </div>
            )
          ) : (
            <div className={s.profileHeader__actions}>
              <Button>Message</Button>
              <div />
              <Button size={ButtonSize.sm}>Remove</Button>
              <Button size={ButtonSize.sm}>Block</Button>
            </div>
          )}
          {window.innerWidth < 700 && (
            <Typography fontType={FontTypeEnum.xs} fontWeight={FontWeightEnum.regular} className={s.profile_showMore}>
              show more
            </Typography>
          )}
        </div>
      </div>
      {!!user && !!me && <AddFriend me={me} user={user} />}
    </div>
  )
}
