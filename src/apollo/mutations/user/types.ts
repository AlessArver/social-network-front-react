export interface IUpdateUserRequest {
  id: string
  first_name: string
  last_name: string
  avatar?: string
  email: string
  password: string
  is_online: boolean
}
