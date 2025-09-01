import Navbar from '../components/navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'

const AppLayout = () => {
    return (
        <div>
            <Navbar />
            <main className='h-[100vh] px-4'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AppLayout
