import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";

export const Formulario = ({ row, closeModal }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { setRows, user } = useAppContext();
 
  useEffect(() => {
    if (row) {
      setValue("NOMBRE_ESPECIALIDAD", row.NOMBRE_ESPECIALIDAD);
    }
  }, []); // Solo se ejecuta cuando se cambia 'row'

  async function submit(values) {
    if (row) { // Si están actualizando
      toast("¿Desea guardar los cambios?", {
        action: {
          label: "Guardar",
          onClick: async () => {
            try {
              const response = await axios.put(
                `/actualizarEspecialidad`,
                { ...values, ID: row.ID }
              );
              const newRows = await axios.get("/getEspecialidad");
              toast.success(response.data);
              closeModal(false);
              setRows(newRows.data);
              await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} actualizó una Especialidad` });
            } catch (error) {
              toast.error(error.response.data); // Muestra el mensaje de error
              console.error(error);
            }
          },
        },
      });
    } else { // Si están creando
      try {
        const response = await axios.post("/crearEspecialidad", values);
        const newRows = await axios.get("/getEspecialidad");
        toast.success(response.data);
        closeModal(false);
        setRows(newRows.data);
        await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} creó una Especialidad` });
        console.log(values);
      } catch (error) {
        toast.error(error.response.data); // Muestra el mensaje de error
        console.error(error);
      }
    }
  }

  return (
    <Form className="h-75 w-75" onSubmit={handleSubmit(submit)}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Especialidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Especialidad"
              autoFocus
              {...register("NOMBRE_ESPECIALIDAD", { 
                required: "El nombre de la especialidad es obligatorio", 
                pattern: {
                  value: /^[A-Za-z\s]+$/i, // Solo letras y espacios
                  message: "Solo se permiten letras y espacios"
                }
              })}
            />
            {errors.NOMBRE_ESPECIALIDAD && (
              <p className="text-danger">{errors.NOMBRE_ESPECIALIDAD.message}</p>
            )}
          </Form.Group>
        </Col>
      </Row>
      
      <Button type="submit" className="w-100 mt-5" style={{backgroundColor:"#005f99", border:"none"}}>
        Guardar
      </Button>
    </Form>
  );
};
