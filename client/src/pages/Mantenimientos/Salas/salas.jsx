import React from "react";
import Tabla from "../../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";
const columnas = [
  { id: "N", label: "N°", minWidth: 100 },
  { id: "SALA", label: "Salas", minWidth: 100 },
  { id: "Acciones", label: "Acciones", minWidth: 100 },
];

const Salas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {setRows,rows,user} = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/getSalas");
      console.log(response.data); 
      setRows(response.data);
  
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Salas";
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
      const resp =  await axios.delete(`/eliminarSalas/${id}`);
      setRows(tabla);
      toast.success(resp.data);
      await axios.post('/insertBitacora', {Accion: `${user[0][0].NOMBRE} eliminó una Sala`});
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const filteredData = rows?.filter(
    (item) =>
      item.SALA?.toLowerCase().includes(searchTerm.toLowerCase()) 
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
        modalBtnValue={user[1]?.some((permiso) => permiso.ID_OBJETO == 1 && permiso.INSERTAR == 1)? "Nuevo": null}
        permisoConsulta={user[1]?.some((permiso) => permiso.ID_OBJETO == 1 && permiso.CONSULTAR == 1)}
        permisoActualizar={user[1]?.some((permiso) => permiso.ID_OBJETO == 1 && permiso.ACTUALIZAR == 1)}
        permisoEliminar={user[1]?.some((permiso) => permiso.ID_OBJETO == 1 && permiso.ELIMINAR == 1)}
        titulo = {'Salas'}
      />
    </div>
  );
};

export default Salas;
