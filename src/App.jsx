import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Notif from "./components/alert";
import "./i18n.jsx";
import './index.css'
import User from './pages/User/index.jsx';

function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/user/*" element={<User />} />
        </Routes>
          <Notif />
      </BrowserRouter>
    </>
  )
}

export default App
