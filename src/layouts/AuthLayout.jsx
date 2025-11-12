import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router'

const AuthLayout = () => {
    const {user, isLogout, isDeactivate, tokenExpired} = useSelector(state => state.user)
    const location = useLocation()
    const publicRoutes = ['/', '/login', '/signup', '/forgotpassword', '/verifyemail', 'verify']

    const isPublic = publicRoutes.includes(location.pathname)

    if(!user) {
        if(isLogout) {
            return <Navigate to='/login' state={{reason: 'logout'}} />
        }else if(isDeactivate) {
            return <Navigate to='/login' state={{reason: 'deactivate'}} />
        }else if(tokenExpired || !isPublic) {
            return <Navigate to='/login' state={{from: location.pathname, reason: 'auth_required'}} replace />
        }
    }
    return <Outlet />
}

export default AuthLayout

