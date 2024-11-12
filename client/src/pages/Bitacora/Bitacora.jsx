import React from "react";
import Tabla from "../../components/Mantenimientos/Tabla";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
const columnas = [
  { id: "N", label: "N°", minWidth: 100 },
  { id: "ACCION", label: "Accion", minWidth: 100 },
  { id: "FECHA_ACCION", label: "Fecha", minWidth: 100 },
  { id: "Acciones", label: "Acciones", minWidth: 100 },
];

const Bitacora = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setRows, rows, user } = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/getBitacora");
      setRows(
        response.data.map((item) => {
          item.FECHA_ACCION = new Date(item.FECHA_ACCION).toLocaleString();
          return item;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Bitacora";
    getData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = rows?.filter(
    (item) =>
      item.ACCION?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.FECHA_ACCION?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteRequest = async (id) => {
    try {
      let tabla = rows.filter((data) => {
        return data.ID !== id;
      });
      const resp =  await axios.delete(`/eliminarBitacora/${id}`);
      setRows(tabla);
      toast.success(resp.data.message); 
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="center w-100">
      <Tabla
        columns={columnas}
        rows={rows}
        filteredData={filteredData}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        permisoEliminar={true}
        deleteRequest={deleteRequest}
      />
    </div>
  );
};

export default Bitacora;
