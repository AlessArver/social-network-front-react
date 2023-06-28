import Profile from 'feautures/Profile'

function ProfileMe() {
  return <Profile />
}
ProfileMe.requireAuth = true

export default ProfileMe
