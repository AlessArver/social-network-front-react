import { ChangeEvent, useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { css } from '@emotion/react'

import { isCustomThemeVar, themeVar } from 'apollo/variables/app'

import { localstorageFields } from 'constants/index'

import { MainLayout } from 'layouts/MainLayout'

import { FontTypeEnum, FontWeightEnum, Typography } from 'components/ui/Typography'
import { Input } from 'components/ui/Input'
import { Button } from 'components/ui/Button'

import s from 'styles/pages/palette.module.sass'

export default function Palette() {
  const theme = useReactiveVar(themeVar)
  const [inputVal, setInputVal] = useState('Background:')

  const handleChangeNavbarColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({ ...theme, navbar: { ...theme.navbar, color: e.target.value } })
  }

  const handleChangeBackgroundColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({ ...theme, background: e.target.value })
  }

  const handleChangeFontColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({ ...theme, fontColor: e.target.value })
  }

  const handleChangeShadowColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({ ...theme, shadowColor: e.target.value })
  }

  const handleChangeCardColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({ ...theme, card: { ...theme.card, background: e.target.value } })
  }

  const handleChangeCardBorderColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({ ...theme, card: { ...theme.card, borderColor: e.target.value } })
  }

  const handleChangeFormColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({ ...theme, form: { ...theme.form, background: e.target.value } })
  }

  const handleChangeFormBorderColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({ ...theme, form: { ...theme.form, borderColor: e.target.value } })
  }

  const handleChangeFormFontColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({ ...theme, form: { ...theme.form, color: e.target.value } })
  }

  const handleChangeFormPlaceholderColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({
      ...theme,
      form: {
        ...theme.form,
        '::placeholder': {
          ...theme.form['::placeholder'],
          color: e.target.value
        }
      }
    })
  }

  const handleChangeFormFocusColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({
      ...theme,
      form: {
        ...theme.form,
        ':focus': {
          ...theme.form[':focus'],
          borderColor: e.target.value
        }
      }
    })
  }

  const handleChangeButtonColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({
      ...theme,
      button: {
        ...theme.button,
        background: e.target.value
      }
    })
  }

  const handleChangeButtonBorderColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({
      ...theme,
      button: {
        ...theme.button,
        borderColor: e.target.value
      }
    })
  }

  const handleChangeButtonFontColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({
      ...theme,
      button: {
        ...theme.button,
        color: e.target.value
      }
    })
  }

  const handleChangeButtonHoverColor = (e: ChangeEvent<HTMLInputElement>) => {
    themeVar({
      ...theme,
      button: {
        ...theme.button,
        '&:hover': {
          ...theme.button['&:hover'],
          background: e.target.value
        }
      }
    })
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }

  const onResetStyles = () => {
    isCustomThemeVar(false)
    localStorage.removeItem(localstorageFields.theme)
  }

  const onSaveStyles = () => {
    isCustomThemeVar(true)
    localStorage.setItem(localstorageFields.theme, JSON.stringify(theme))
  }

  return (
    <MainLayout>
      <div className={s.palette__form}>
        <div
          className={s.palette__fieldWrapper}
          css={css`
            border-color: ${theme.card.borderColor};
          `}
        >
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Navbar color:</Typography>
            <input value={theme.navbar.color} onChange={handleChangeNavbarColor} type='color' />
          </div>
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Background color:</Typography>
            <input value={theme.background} onChange={handleChangeBackgroundColor} type='color' />
          </div>
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Font color:</Typography>
            <input value={theme.fontColor} onChange={handleChangeFontColor} type='color' />
          </div>
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Shadow color:</Typography>
            <input value={theme.shadowColor} onChange={handleChangeShadowColor} type='color' />
          </div>
        </div>
        <div
          className={s.palette__fieldWrapper}
          css={css`
            border-color: ${theme.card.borderColor};
          `}
        >
          <Typography fontType={FontTypeEnum.h2} fontWeight={FontWeightEnum.medium} className={s.palettte__title}>
            Card
          </Typography>
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Background:</Typography>
            <input value={theme.card.background} onChange={handleChangeCardColor} type='color' />
          </div>
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Border color:</Typography>
            <input value={theme.card.borderColor} onChange={handleChangeCardBorderColor} type='color' />
          </div>
        </div>
        <div
          className={s.palette__fieldWrapper}
          css={css`
            border-color: ${theme.card.borderColor};
          `}
        >
          <Typography fontType={FontTypeEnum.h2} fontWeight={FontWeightEnum.medium} className={s.palettte__title}>
            Forms
          </Typography>
          <div className={s.palette__field}>
            <Input value={inputVal} placeholder='Background:' onChange={handleChangeInput} />
            <input value={theme.form.background} onChange={handleChangeFormColor} type='color' />
          </div>
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Border color:</Typography>
            <input value={theme.form.borderColor} onChange={handleChangeFormBorderColor} type='color' />
          </div>
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Color:</Typography>
            <input value={theme.form.color} onChange={handleChangeFormFontColor} type='color' />
          </div>
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Placeholder color:</Typography>
            <input value={theme.form['::placeholder'].color} onChange={handleChangeFormPlaceholderColor} type='color' />
          </div>
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Focus color:</Typography>
            <input value={theme.form[':focus'].borderColor} onChange={handleChangeFormFocusColor} type='color' />
          </div>
        </div>
        <div
          className={s.palette__fieldWrapper}
          css={css`
            border-color: ${theme.card.borderColor};
          `}
        >
          <Typography fontType={FontTypeEnum.h2} fontWeight={FontWeightEnum.medium} className={s.palettte__title}>
            Button
          </Typography>
          <div className={s.palette__field}>
            <div>
              <Typography className={s.palettte__label}>Background:</Typography>
            </div>
            <input value={theme.button.background} onChange={handleChangeButtonColor} type='color' />
          </div>
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Border color:</Typography>
            <input value={theme.button.borderColor} onChange={handleChangeButtonBorderColor} type='color' />
          </div>
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Color:</Typography>
            <input value={theme.button.color} onChange={handleChangeButtonFontColor} type='color' />
          </div>
          <div className={s.palette__field}>
            <Typography className={s.palettte__label}>Background hover:</Typography>
            <input value={theme.button['&:hover'].background} onChange={handleChangeButtonHoverColor} type='color' />
          </div>
        </div>
        <div className={s.palette__actions}>
          <Button onClick={onResetStyles} className={s.palette__actionsItem}>
            Reset styles
          </Button>
          <Button onClick={onSaveStyles} className={s.palette__actionsItem}>
            Save
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
