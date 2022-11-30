import { Route, Routes } from "react-router-dom";
import { Register, Login, Dashboard } from "./components/index";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
