import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './Components/Auth/LogIn/LogIn';
import Register from './Components/Auth/SignUp/SignUpForm';
import Dashboard from './Components/Dashboard/Dashboard';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import VerifyEmail from "./Components/Auth/VerifyEmail/VerifyEmail";
import DeviceForm from "./Components/DeviceForm/DeviceForm";
import DeviceList from "./Components/DeviceList/DeviceList";
import Deviceitem from "./Components/DeviceItem/DeviceItem";
import EditDeviceForm from "./Components/EditDevice/EditDevice";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
}, []);
  return (
    <Router>
        <Routes>
        <Route
                    path="/"
                    element={isLoggedIn ? <Dashboard /> : <Login />}
                />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>} />
            <Route path="/add-device" element={<PrivateRoutes>
              < DeviceForm/>
            </PrivateRoutes>} />
            <Route path="/room/:roomId/devices" element={<PrivateRoutes>
              <DeviceList />
            </PrivateRoutes>} />
            <Route path="/device/:id" element={<PrivateRoutes>
              <Deviceitem />
            </PrivateRoutes>} />
            <Route path="/edit-device/:id" element={<PrivateRoutes>
              <EditDeviceForm />
            </PrivateRoutes>} />
        </Routes>
    </Router>
);
}

export default App
