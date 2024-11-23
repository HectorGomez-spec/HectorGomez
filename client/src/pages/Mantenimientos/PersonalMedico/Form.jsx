import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";

export const Formulario = ({ row, closeModal }) => {
  const { register, handleSubmit, setValue } = useForm();
  const { setRows, user } = useAppContext();
 
  useEffect(() => {
    if (row) {
      setValue("NOMBRE", row.NOMBRE);
      setValue("ID_USUARIO", row.ID_USUARIO);
      setValue("ID_ESPECIALIDAD", row.ID_ESPECIALIDAD);
      setValue("DIRECCION", row.DIRECCION);
      setValue("TELEFONO", row.TELEFONO);
    }
  }, []);//significa que se va a ejecutar solo cuando cambie roles o estados

  async function submit(values) {
    if (row) { // si estan actualizando
      toast("¿Desea guardar los cambios?", {
        action: {
          label: "Guardar",
          onClick: async () => {
            try {
              const response = await axios.put(
                `/actualizarPersonalMedico`,
                {...values, ID: row.ID}
              );
              const newRows = await axios.get("/getPersonalMedico");
              toast.success(response.data);
              closeModal(false);
              setRows(newRows.data);
            } catch (error) {
              toast.error(error.response.data); // Muestra el mensaje de error
              console.error(error);
            }
          },
        },
      });
    } else {// si estan creando
      try {
        const response = await axios.post("/crearPersonalMedico", values);
        const newRows = await axios.get("/getPersonalMedico");
        toast.success(response.data);
        closeModal(false);
        setRows(newRows.data);
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
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              autoFocus
              {...register("NOMBRE", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Usuario"
              autoFocus
              {...register("ID_USUARIO", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Especialidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Especialidad"
              autoFocus
              {...register("ID_ESPECIALIDAD", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              type="text"
              placeholder="Direccion"
              autoFocus
              {...register("DIRECCION", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Telefono"
              autoFocus
              {...register("TELEFONO", { required: true })}
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
