import React from "react";
import Tabla from "../../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";
const columnas = [
  { id: "NOMBRE1", label: "Nombre", minWidth: 100 },
  { id: "CORREO", label: "Correo", minWidth: 100 },
  { id: "ESTADO", label: "Estado", minWidth: 100 },
  { id: "ROL", label: "Rol", minWidth: 100 },
  { id: "Acciones", label: "Acciones", minWidth: 100 },
];

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {setRows,rows,user} = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/getUsuarios");
      setRows(response.data);
  
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Usuarios";
    getData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const deleteRequest = async (id) => {
    try {
      let tabla = rows.filter((data) => {
        return data.ID !== id;
      });
      const resp =  await axios.delete(`/eliminarUsuario/${id}`);
      setRows(tabla);
      toast.success(resp.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const filteredData = rows?.filter(
    (item) =>
      item.NOMBRE?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.APELLIDO?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.CORREO?.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <div className="center w-100">
      <Tabla
        columns={columnas}
        rows={rows}
        formulario={Formulario}
        filteredData={filteredData}
        deleteRequest={deleteRequest}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        modalBtnValue={'Nuevo'}
        permisoConsulta={true}
        permisoActualizar={true}
        permisoEliminar={true}
      />
    </div>
  );
};

export default Usuarios;
