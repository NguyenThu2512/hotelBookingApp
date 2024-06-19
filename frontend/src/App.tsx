import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useAppContext } from "./contexts/AppContext"
import AddHotel from "./pages/AddHotel"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"


function App() {
  const {isLoggedIn}= useAppContext()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>Home page</Layout>} />
        <Route path="/search" element={<>Search page</>} />
        <Route path="/register" element={<Layout><Register/></Layout>} />
        <Route path="/login" element={<Layout><Login/></Layout>} />
        {isLoggedIn &&
          <>
            <Route path="/add-hotel" element={<Layout><AddHotel/></Layout>} />
            <Route path="/my-hotels" element={<Layout><MyHotels/></Layout>} />
            <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel/></Layout>} />
          </> 
        }
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
