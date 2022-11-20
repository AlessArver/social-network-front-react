import { useState } from "react";

import { MainLayout } from "layouts/MainLayout";

import { Dialog, IDialog } from "components/pages/dialogs/Dialog";
import s from "styles/pages/dialogs.module.sass";

function Dialogs() {
  const [dialogs] = useState<IDialog[]>([
    { id: 543, fullName: "Roman Romanov", text: "Hi, how a u?" },
  ]);

  return (
    <MainLayout>
      <div className={s.dialogs}>
        {dialogs.map((m) => (
          <Dialog {...m} key={m.id} className={s.dialogs__item} />
        ))}
      </div>
    </MainLayout>
  );
}
Dialogs.requireAuth = true;

export default Dialogs;
