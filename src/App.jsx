import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import "./i18n.jsx";
import './index.css'

function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/user/*" element={<User />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
