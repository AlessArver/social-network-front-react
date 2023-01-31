import { makeVar } from '@apollo/client'

import { IPost } from 'apollo/queries/post'

export const postsVar = makeVar<IPost[]>([])
