import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Perfil } from "./pages/Perfil/Perfil";
import { Toaster } from "sonner";
import Nav from "./components/Nav";
import RecuperarContraseña from "./pages/Login/RecuperarContraseña";
import Registro from "./pages/Login/Registro";

// Cargar Usuarios solo cuando se necesite
const Usuarios = lazy(() => import("./pages/Mantenimientos/Usuarios/Usuarios"));


function App() {
  return (
    <>
      <Routes>
        {/* las rutas públicas van aquí */}
        <Route element={<Nav />}>
          <Route path="/" element={<Login />} />
          <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
          <Route path="/registro" element={<Registro />} />
        </Route>

        {/* las rutas protegidas van aquí */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<Nav />}>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/usuarios"element={<Suspense fallback={<div>Cargando usuarios...</div>}><Usuarios /></Suspense>}/>
          </Route>
        </Route>

      </Routes>
|      <Toaster position="top-center" duration={4000} closeButton toastOptions={{ style: { fontSize: "15px" } }}/>
      <footer>
        &copy; 2024 Sistema de Vigilancia Epidemiológica. Todos los derechos
        reservados.
      </footer>
    </>
  );
}

export default App;
