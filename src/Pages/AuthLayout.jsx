import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router'

const AuthLayout = () => {
    const user = useSelector(state => state.user.user)
    const location = useLocation()

    if(user && user !== 'null') {
        return <Outlet />
    }else if(user === 'null') {
        return <Navigate to='/login' />
    } else {
        return <Navigate to='/login' state={{from: location.pathname}} replace={true} />
    }

}

export default AuthLayout