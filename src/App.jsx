import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Notif from "./components/alert";
import "./i18n.jsx";
import "./index.css";
import Supervisor from "./pages/Supervisor/index.jsx";
import NotFoundPage from "./pages/NotFoundPage/index.jsx";
import User from "./pages/User/index.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact  path="/*" element={<Login />} />
          <Route path="/supervisor/*" element={<Supervisor />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/not-found" element={<NotFoundPage />} />
        </Routes>
        <Notif />
      </BrowserRouter>
    </>
  );
}

export default App;
