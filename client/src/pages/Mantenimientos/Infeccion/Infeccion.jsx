import React from "react";
import Tabla from "../../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";
const columnas = [ 
  { id: "NOMBRE_INFECCION", label: "Nombre", minWidth: 100 },
  { id: "DESCRIPCION", label: "Descripcion", minWidth: 100 },
  { id: "Acciones", label: "Acciones", minWidth: 100 },
];

const Infeccion = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {setRows,rows,user} = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/getInfeccion");
      setRows(response.data);
  
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Infeccion";
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
      const resp =  await axios.delete(`/eliminarInfeccion/${id}`);
      setRows(tabla);
      await axios.post('/insertBitacora', {Accion: `${user[0][0].NOMBRE} eliminó una infeccion`});
      toast.success(resp.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const filteredData = rows?.filter(
    (item) =>
    item.NOMBRE_INFECCION?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        titulo={'Infeccion'}
      />
    </div>
  );
};

export default Infeccion;
