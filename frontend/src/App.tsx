import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Register from "./pages/Register"
import Login from "./pages/Login"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>Home page</Layout>} />
        <Route path="/search" element={<>Search page</>} />
        <Route path="/register" element={<Layout><Register/></Layout>} />
        <Route path="/login" element={<Layout><Login/></Layout>} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
