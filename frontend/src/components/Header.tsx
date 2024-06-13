import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'

const Header = () => {
   const {isLoggedIn}= useAppContext()
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className=" text-3xl text-white font-bold tracking-tight">
            <Link to="/">Holidays.com</Link>
        </span>
        <span className='flex space-x-2'>
            {isLoggedIn? 
            <div className=" flex items-center gap-3"> 
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/my-hotels">My Hotels</Link>
              <button>sign Out</button>
            </div>
            :
            <Link to={'/sign-in'} className="bg-white  flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100">Sign In</Link>
            }
        </span>
      </div>
    </div>
  )
}

export default Header
