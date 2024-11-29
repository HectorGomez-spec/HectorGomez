import React from "react";
import Tabla from "../../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";

const columnas = [
  { id: "N", label: "N", minWidth: 100 },
  { id: "Nombre_Rol", label: "Rol", minWidth: 170 },
  { id: "Objeto", label: "Pantalla", minWidth: 100 },
  { id: "Insertar", label: "Ingresar", minWidth: 100 },
  { id: "Actualizar", label: "Actualizar", minWidth: 100 },
  { id: "Eliminar", label: "Eliminar", minWidth: 100 },
  { id: "Consultar", label: "Consultar", minWidth: 100 },
  { id: "Acciones", label: "Acciones", minWidth: 100 },
];

const Permisos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setRows, rows, user } = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/GetPermisos");
      response.data.map((permiso) => {
        if (permiso.Insertar == 0) {
          permiso.Insertar = "NO";
        } else {
          permiso.Insertar = "SI";
        }

        if (permiso.Actualizar == 0) {
          permiso.Actualizar = "NO";
        } else {
          permiso.Actualizar = "SI";
        }

        if (permiso.Eliminar == 0) {
          permiso.Eliminar = "NO";
        } else {
          permiso.Eliminar = "SI";
        }

        if (permiso.Consultar == 0) {
          permiso.Consultar = "NO";
        } else {
          permiso.Consultar = "SI";
        }
      });
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Permisos";
    getData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = rows.filter(
    (item) =>
      item.Objeto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Nombre_Rol?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="center w-100">
      {rows && (
        <Tabla
          columns={columnas}
          rows={rows}
          formulario={Formulario}
          filteredData={filteredData}
          handleSearchChange={handleSearchChange}
          searchTerm={searchTerm}
          titulo={"Permisos"}
          permisoConsulta={true}
          permisoActualizar={true}
        />
      )}
    </div>
  );
};

export default Permisos;
