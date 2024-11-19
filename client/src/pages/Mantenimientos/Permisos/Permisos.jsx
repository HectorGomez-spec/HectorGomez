import React from "react";
import Tabla from "../../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";

const columnas = [
  { id: "NOMBRE_ROL", label: "Rol", minWidth: 170 },
  { id: "OBJETO", label: "Pantalla", minWidth: 100 },
  { id: "INSERTAR", label: "Ingresar", minWidth: 100 },
  { id: "ACTUALIZAR", label: "Actualizar", minWidth: 100 },
  { id: "ELIMINAR", label: "Eliminar", minWidth: 100 },
  { id: "CONSULTAR", label: "Consultar", minWidth: 100 },
  { id: "Acciones", label: "Acciones", minWidth: 100 },
];

const Permisos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {setRows,rows,user} = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/GetPermisos");
      response.data.map((permiso) => {
        if (permiso.INSERTAR == 0) {
          permiso.INSERTAR = "NO";
        } else {
          permiso.INSERTAR = "SI";
        }

        if (permiso.ACTUALIZAR == 0) {
          permiso.ACTUALIZAR = "NO";
        } else {
          permiso.ACTUALIZAR = "SI";
        }

        if (permiso.ELIMINAR == 0) {
          permiso.ELIMINAR = "NO";
        } else {
          permiso.ELIMINAR = "SI";
        }

        if (permiso.CONSULTAR == 0) {
          permiso.CONSULTAR = "NO";
        } else {
          permiso.CONSULTAR = "SI";
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
      item.OBJETO?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.NOMBRE_ROL?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="center w-100">
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
    </div>
  );
};

export default Permisos;