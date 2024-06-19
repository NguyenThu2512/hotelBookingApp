import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import LogOutButton from './LogOutButton'

const Header = () => {
   const {isLoggedIn}= useAppContext()
   console.log({isLoggedIn})
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className=" text-3xl text-white font-bold tracking-tight">
            <Link to="/">Holidays.com</Link>
        </span>
        <span className='flex space-x-2'>
            {isLoggedIn? 
            <div className=" flex items-center gap-4"> 
               <Link to="/my-bookings" className="font-bold text-white text-lg hover:bg-blue-600 px-2 py-1">My Bookings</Link>
               <Link to="/my-hotels" className="font-bold text-white text-lg hover:bg-blue-600 px-2 py-1">My Hotels</Link>
              <LogOutButton/>
            </div>
            :
            <Link to={'/login'} className="bg-white  flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100">Sign In</Link>
            }
        </span>
      </div>
    </div>
  )
}

export default Header
