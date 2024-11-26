import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";

export const Formulario = ({ row, closeModal }) => {
  const { register, handleSubmit, setValue } = useForm();
  const { setRows, user } = useAppContext();
 

  async function submit(values) {
    if (row) { // si estan actualizando
      toast("¿Desea guardar los cambios?", {
        action: {
          label: "Guardar",
          onClick: async () => {
            try {
              const response = await axios.put(
                `/actualizarSalas`,
                {...values, ID: row.ID}
              );
              const newRows = await axios.get("/getSalas");
              toast.success(response.data);
              closeModal(false);
              setRows(newRows.data);
              await axios.post('/insertBitacora', {Accion: `${user[0][0].NOMBRE} actualizó una Sala`});
            } catch (error) {
              toast.error(error.response.data); // Muestra el mensaje de error
              console.error(error);
            }
          },
        },
      });
    } else {// si estan creando
      try {
        const response = await axios.post("/crearSalas", values);
        const newRows = await axios.get("/getSalas");
        toast.success(response.data);
        closeModal(false);
        setRows(newRows.data);
        await axios.post('/insertBitacora', {Accion: `${user[0][0].NOMBRE} creó una nueva Sala`});
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
            <Form.Label>Salas</Form.Label>
            <Form.Control
              type="text"
              placeholder="Salas"
              autoFocus
              {...register("SALA", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>
      
      <Button type="submit" className="w-100 mt-5" style={{backgroundColor:"#005f99", border:"none"}}>
        Guardar
      </Button>
    </Form>
  );
};
