import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Perfil } from "./pages/Perfil/Perfil";
import { Toaster } from "sonner";
import Nav from "./components/Nav";
import RecuperarContraseña from "./pages/Login/RecuperarContraseña";
import Registro from "./pages/Login/Registro";

function App() {
  return (
    <>
      <Routes>
        {/* las rutas publicas van aqui */}
        <Route element={<Nav />}>
          <Route path="/" element={<Login />} />
          <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
          <Route path="/registro" element={<Registro/>} />
        </Route>

        {/* las rutas protegidas van aqui */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<Nav />}>
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Route>
      </Routes>

      <Toaster
        position="top-center"
        duration={4000}
        closeButton
        toastOptions={{ style: { fontSize: "15px" } }}
      />
      <footer>
        &copy; 2024 Sistema de Vigilancia Epidemiológica. Todos los derechos
        reservados.
      </footer>
    </>
  );
}

export default App;
