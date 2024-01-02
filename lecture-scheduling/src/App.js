import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './Components/Basic/Home';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import Admin from './Components/Admin/Admin';
import Lecturer from './Components/Basic/Lecturer';
function App() {
  return (
    <>
<Routes>
<Route exact path="/" element={<Home />} />
<Route exact path="/register" element={<Register />} />
<Route exact path="/login" element={<Login />} />
<Route exact path="/admin" element={<Admin />} />
<Route exact path="/lecturer" element={<Lecturer />} />
</Routes>
    </>
  );
}

export default App;
