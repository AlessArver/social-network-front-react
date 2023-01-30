import { useState } from 'react'

import { MainLayout } from 'layouts/MainLayout'

import { IDialog } from 'components/pages/dialogs/Dialog'

function Dialogs() {
  // eslint-disable-next-line no-empty-pattern
  const [] = useState<IDialog[]>([{ id: '543', fullName: 'Roman Romanov', text: 'Hi, how a u?' }])

  return (
    <MainLayout>
      Messages
      {/* <div className={s.dialogs}>
        {dialogs.map((m) => (
          <Dialog {...m} key={m.id} className={s.dialogs__item} />
        ))}
      </div> */}
    </MainLayout>
  )
}
Dialogs.requireAuth = true

export default Dialogs
