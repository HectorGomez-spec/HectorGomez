import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Perfil } from "./pages/Perfil/Perfil";
import { Toaster } from "sonner";
import Nav from "./components/Nav";
import RecuperarContraseña from "./pages/Login/RecuperarContraseña";
import Registro from "./pages/Login/Registro";
import ReporteFecha from "./pages/Estadisticas/ReportePorFecha";

// Cargar componentes solo cuando se necesite
const Usuarios = lazy(() => import("./pages/Mantenimientos/Usuarios/Usuarios"));
const EstadoUsuario = lazy(() => import("./pages/Mantenimientos/EstadoUsuario/EstadoUsuario"));
const SalasMantenimiento = lazy(() => import("./pages/Mantenimientos/Salas/salas"));
const Especialidad = lazy(() => import("./pages/Mantenimientos/Especialidad/especialidad"));
const ControlLavado = lazy(() => import("./pages/Mantenimientos/ControlLavado/ControlLavado"));
const Objetos = lazy(() => import("./pages/Mantenimientos/Objetos/Objetos"));
const Bitacora = lazy(() => import("./pages/Bitacora/Bitacora"));
const Salas = lazy(() => import("./pages/Salas/Salas"));
const SalaOncologia = lazy(() => import("./pages/Salas/SalaOncologia"));
const SalaCardiologia = lazy(() => import("./pages/Salas/SalaCardiologia"));
const Vigilancia = lazy(() => import("./pages/Vigilancia/Vigilancia"));
const ControlHigieneDeManos  = lazy(() => import("./pages/Vigilancia/Control_Manos"));
const Pacientes = lazy(() => import("./pages/Mantenimientos/Pacientes/Pacientes"));
const Roles = lazy(() => import("./pages/Mantenimientos/Rol/Rol"));
const Permisos = lazy(() => import("./pages/Mantenimientos/Permisos/Permisos"));
const PersonalMedico = lazy(() => import("./pages/Mantenimientos/PersonalMedico/PersonalMedico"));
const Dispositivos = lazy(() => import("./pages/Mantenimientos/Dispositivos/Dispositivos")); 
const Infeccion = lazy(() => import("./pages/Mantenimientos/Infeccion/Infeccion")); 
const EstadoMonitoreo = lazy(() => import("./pages/Mantenimientos/EstadoMonitoreo/EstadoMonitoreo"));


// aqui van las cosas de keyla







// hasta aqui

// aqui van las cosas de keyla







// hasta aqui

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
            <Route path="/perfil" element={<Perfil />} /> EstadoMonitoreo
            <Route path="/usuarios"element={<Suspense fallback={<div>Cargando usuarios...</div>}><Usuarios /></Suspense>}/>
            <Route path="/salasMantenimiento"element={<Suspense fallback={<div>Cargando Salas...</div>}><SalasMantenimiento /></Suspense>}/>
            <Route path="/Especialidad"element={<Suspense fallback={<div>Cargando Objetos...</div>}><Especialidad /></Suspense>}/>
            <Route path="/controlLavado"element={<Suspense fallback={<div>Cargando Objetos...</div>}><ControlLavado /></Suspense>}/>
            <Route path="/PersonalMedico"element={<Suspense fallback={<div>Cargando Objetos...</div>}><PersonalMedico /></Suspense>}/>
            <Route path="/Infeccion"element={<Suspense fallback={<div>Cargando Objetos...</div>}><Infeccion /></Suspense>}/>
            <Route path="/EstadoMonitoreo"element={<Suspense fallback={<div>Cargando Objetos...</div>}><EstadoMonitoreo /></Suspense>}/>

            <Route path="/Dispositivos"element={<Suspense fallback={<div>Cargando Objetos...</div>}><Dispositivos /></Suspense>}/>
            <Route path="/Objetos"element={<Suspense fallback={<div>Cargando Objetos...</div>}><Objetos /></Suspense>}/>
            <Route path="/estadoUsuario"element={<Suspense fallback={<div>Cargando usuarios...</div>}><EstadoUsuario /></Suspense>}/>
            <Route path="/bitacora" element={<Suspense fallback={<div>Cargando bitacora...</div>}><Bitacora /></Suspense>}/>
            <Route path="/Salas" element={<Suspense fallback={<div>Cargando salas...</div>}><Salas /></Suspense>}/>
            <Route path="/SalaOncologia" element={<Suspense fallback={<div>Cargando salas...</div>}><SalaOncologia /></Suspense>}/>
            <Route path="/SalaCardiologia" element={<Suspense fallback={<div>Cargando salas...</div>}><SalaCardiologia /></Suspense>}/>
            <Route path="/Vigilancia" element={<Suspense fallback={<div>Cargando vigilancia...</div>}><Vigilancia /></Suspense>}/>
            <Route path="/ControlHigiene" element={<Suspense fallback={<div>Cargando ControlLavado...</div>}><ControlHigieneDeManos /></Suspense>}/>
            <Route path="/Paciente" element={<Suspense fallback={<div>Cargando pacientes...</div>}><Pacientes /></Suspense>}/>

            <Route path="/Roles" element={<Suspense fallback={<div>Cargando roles...</div>}><Roles /></Suspense>}/>
            <Route path="/Permisos" element={<Suspense fallback={<div>Cargando permisos...</div>}><Permisos /></Suspense>}/>
            

            <Route path="/reporteFecha" element={<ReporteFecha />} />
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
