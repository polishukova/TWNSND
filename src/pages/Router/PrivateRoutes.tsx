import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../redux/hooks'
import { ADMIN, MODERATOR, SUPERADMIN } from '../../@types/roles'

type PrivateType = {
  isAdmin?: boolean
  isModerator?: boolean
  isServiceAdmin?: boolean
  isSuperAdmin?: boolean
}

const PrivateRoutes = ({ isAdmin, isModerator, isServiceAdmin, isSuperAdmin }: PrivateType) => {
  const { registerAdmin } = useAppSelector((state) => state.adminSignInSlice)
  const { registerUser } = useAppSelector((state) => state.signInSlice)
  const { role } = useAppSelector((state) => state.adminSignInSlice)

  if (isAdmin) {
    const admin = registerAdmin
    return admin ? <Outlet /> : <Navigate to="/admin/signin" />
  }
  const auth = registerUser
  //сюда присобачь флаг проверки залогинен или нет
  return auth ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoutes
