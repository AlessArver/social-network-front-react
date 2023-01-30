import { MainLayout } from 'layouts/MainLayout'

import { Navbar } from 'components/app/Navbar'

import s from 'styles/pages/friends.module.sass'
import { useLazyQuery, useQuery } from '@apollo/client'
import { FRIENDS, IFriend } from 'apollo/queries/friend'
import { useRouter } from 'next/router'
import { USERS_BY_IDS } from 'apollo/queries/user'
import { useEffect } from 'react'

const FRIEND_TYPES = [
  { text: 'Друзья', slug: 'added' },
  { text: 'В ожидании', slug: 'pending' },
  { text: 'Черный список', slug: 'block' }
]

export default function Friends() {
  const router = useRouter()
  const { id, type } = router.query
  const { data: friends, loading: friendsLoading } = useQuery(FRIENDS, {
    variables: {
      friendsInput: {
        to_id: id,
        status: type || undefined
      }
    }
  })
  const [_getUsersByIds, { data: users }] = useLazyQuery(USERS_BY_IDS)

  useEffect(() => {
    console.log('router', router)
    if (!friendsLoading) {
      console.log(friends?.friends.map((f: IFriend) => f.from_id))

      _getUsersByIds({
        variables: { ids: friends?.friends.map((f: IFriend) => f.from_id) }
      })
    }
  }, [_getUsersByIds, friends?.friends, friendsLoading, router, router.pathname])

  return (
    <MainLayout childrenClassName={s.friends__layout}>
      <div className={s.friends__list}></div>
      <div className={s.frinds__nav}>
        <Navbar
          items={FRIEND_TYPES.map(f => ({
            text: f.text,
            url: f.slug === 'added' ? `/friends/${id}` : `/friends/${id}?type=${f.slug}`
          }))}
          className={s.friends__nav}
        />
      </div>
    </MainLayout>
  )
}
