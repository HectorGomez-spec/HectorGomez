import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";
import { useEffect } from "react";

export function Formulario({ row, closeModal }) {
  const { register, handleSubmit, setValue } = useForm();
  const { setRows, setUser,user } = useAppContext();

  const onSubmit = async (values) => {
    toast("¿Desea guardar los cambios?", {
      action: {
        label: "Guardar",
        onClick: async () => {
          try {
            const response = await axios.put(`/UpdatePermisos/${row.Id}`, {
              ...values,
              Id_Objeto: row.IdObjeto,
            });
            let tabla = await axios.get("/GetPermisos");
            tabla.data.map((permiso) => {
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
            setRows(tabla.data);
            toast.success(response.data.message);
            closeModal(false);
          } catch (error) {
            toast.error('Error al guardar los cambios');
            console.log(error);
          }
        },
      },
    });
  };

  return (
    <Form className="h-75 w-75" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Permiso Insercion</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...register("Insertar")}>
          {row.Insertar === "SI" ? (
            <>
              <option value={1}>SI</option>
              <option value={0}>NO</option>
            </>
          ) : (
            <>
              <option value={0}>NO</option>
              <option value={1}>SI</option>
            </>
          )}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Permiso Actualizar</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...register("Actualizar")}>
          {row.Actualizar === "SI" ? (
            <>
              <option value={1}>SI</option>
              <option value={0}>NO</option>
            </>
          ) : (
            <>
              <option value={0}>NO</option>
              <option value={1}>SI</option>
            </>
          )}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Permiso Eliminar</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...register("Eliminar")}>
          {row.Eliminar === "SI" ? (
            <>
              <option value={1}>SI</option>
              <option value={0}>NO</option>
            </>
          ) : (
            <>
              <option value={0}>NO</option>
              <option value={1}>SI</option>
            </>
          )}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Permiso Consultar</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...register("Consultar")}>
          {row.Consultar === "SI" ? (
            <>
              <option value={1}>SI</option>
              <option value={0}>NO</option>
            </>
          ) : (
            <>
              <option value={0}>NO</option>
              <option value={1}>SI</option>
            </>
          )}
        </Form.Select>
      </Form.Group>
      <Button variant="success" type="submit" className="w-100 mt-5">
        {row ? "Editar" : "Guardar"}
      </Button>
    </Form>
  );
}