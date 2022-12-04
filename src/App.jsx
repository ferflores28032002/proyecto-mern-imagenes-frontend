import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Register } from "./components/index";
import { ToastContainer } from "react-toastify";
import { PublicRoutes, PrivateRoutes } from "./Routes/";
// import Rutas from "./Routes/Rutas";

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route path="/register" element={<Register/>} />

        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default App;
