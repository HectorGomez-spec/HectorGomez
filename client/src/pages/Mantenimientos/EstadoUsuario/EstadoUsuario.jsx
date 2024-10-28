import React from "react";
import Tabla from "../../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";
const columnas = [
  { id: "N", label: "N°", minWidth: 100 },
  { id: "DESCRIPCION", label: "Descripcion", minWidth: 100 }, // en id tiene que ir el nombre de la columna en la base de datos
  { id: "Acciones", label: "Acciones", minWidth: 100 }, // este siempre lo dejamos
];

const EstadoUsuario = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {setRows,rows,user} = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/getEstadosUsuario");
      setRows(response.data);
  
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Estados de Usuario";
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
      const resp =  await axios.delete(`/eliminarEstadoUsuario/${id}`);
      setRows(tabla);
      toast.success(resp.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const filteredData = rows?.filter(
    (item) =>
      item.DESCRIPCION?.toLowerCase().includes(searchTerm.toLowerCase())
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

export default EstadoUsuario;
