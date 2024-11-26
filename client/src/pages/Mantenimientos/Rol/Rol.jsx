import React from "react";
import Tabla from "../../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";
const columnas = [
  { id: "NOMBRE_ROL", label: "Rol", minWidth: 170 },
  { id: "DESCRIPCION", label: "Descripcion", minWidth: 100 },
  { id: "Acciones", label: "Acciones", minWidth: 100 },
];

const Rol = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {setRows,rows,user} = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/getRoles");
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Roles";
    getData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const deleteRequest = async (id) => {
    try {
      
      const resp =  await axios.delete(`/DeleteRol/${id}`);
      let tabla = rows.filter((data) => {
        return data.ID !== id;
      });
      setRows(tabla);
      toast.success(resp.data.message);
      await axios.post('/insertBitacora', {Accion: `${user[0][0].NOMBRE} eliminó un Rol`});
    } catch (error) {
      toast.error("Este rol puede ser eliminado porque alguien lo tiene asignado");
      // toast.error(error.response.data);
    }
  };

  const filteredData = rows?.filter(
    (item) =>
      item.DESCRIPCION?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.NOMBRE_ROL?.toLowerCase().includes(searchTerm.toLowerCase())
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
        titulo = {"Roles"}
        modalBtnValue={'Nuevo'}
        permisoConsulta={true}
        permisoActualizar={true}
        permisoEliminar={true}
      />
    </div>
  );
};

export default Rol;