import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const AppLayout = () => {
    return (
        <div>
            <Navbar />
            <main className='min-h-[100vh] flex flex-col mx-auto bg-[#18181a] pb-8'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AppLayout
