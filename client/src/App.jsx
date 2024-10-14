import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Perfil } from "./pages/Perfil/Perfil";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Routes>
        {/* las rutas publicas van aqui */}
        <Route path="/" element={<Login />} />

        {/* las rutas protegidas van aqui */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/perfil" element={<Perfil />} />
        </Route>
        
      </Routes>
      <Toaster
          position="top-center"
          duration={4000}
          closeButton
          toastOptions={{
            style: {
              fontSize: "15px",
            },
          }}
        />
    </>
  );
}

export default App;
