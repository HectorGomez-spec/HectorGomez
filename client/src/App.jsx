import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Perfil } from "./pages/Perfil/Perfil";
import { Toaster } from "sonner";
import Nav from "./components/Nav";
import RecuperarContraseña from "./pages/Login/RecuperarContraseña";
import Registro from "./pages/Login/Registro";

// Cargar componentes solo cuando se necesite
const Usuarios = lazy(() => import("./pages/Mantenimientos/Usuarios/Usuarios"));
const EstadoUsuario = lazy(() => import("./pages/Mantenimientos/EstadoUsuario/EstadoUsuario"));
const SalasMantenimiento = lazy(() => import("./pages/Mantenimientos/Salas/salas"));
const Especialidad = lazy(() => import("./pages/Mantenimientos/Especialidad/especialidad"));
const Objetos = lazy(() => import("./pages/Mantenimientos/Objetos/Objetos"));
const Bitacora = lazy(() => import("./pages/Bitacora/Bitacora"));
const Salas = lazy(() => import("./pages/Salas/Salas"));


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
            <Route path="/salasMantenimiento"element={<Suspense fallback={<div>Cargando Salas...</div>}><SalasMantenimiento /></Suspense>}/>
            <Route path="/Especialidad"element={<Suspense fallback={<div>Cargando Objetos...</div>}><Especialidad /></Suspense>}/>
            <Route path="/Objetos"element={<Suspense fallback={<div>Cargando Objetos...</div>}><Objetos /></Suspense>}/>
            <Route path="/estadoUsuario"element={<Suspense fallback={<div>Cargando usuarios...</div>}><EstadoUsuario /></Suspense>}/>
            <Route path="/bitacora" element={<Suspense fallback={<div>Cargando bitacora...</div>}><Bitacora /></Suspense>}/>
            <Route path="/Salas" element={<Suspense fallback={<div>Cargando salas...</div>}><Salas /></Suspense>}/>

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
