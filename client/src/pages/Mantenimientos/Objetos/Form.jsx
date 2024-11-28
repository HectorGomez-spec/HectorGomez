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
    if (row) { // si se están editando los datos de un objeto
      setValue("OBJETO", row.OBJETO);
      setValue("DESCRIPCION", row.DESCRIPCION);
    }
  }, [row, setValue]);

  async function submit(values) {
    if (row) { // si están actualizando
      toast("¿Desea guardar los cambios?", {
        action: {
          label: "Guardar",
          onClick: async () => {
            try {
              const response = await axios.put(
                `/actualizarObjetos`,
                { ...values, ID: row.ID }
              );
              const newRows = await axios.get("/getObjetos");
              toast.success(response.data);
              closeModal(false);
              setRows(newRows.data);
              await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} Actualizó un Objeto` });
            } catch (error) {
              toast.error(error.response.data); // Muestra el mensaje de error
              console.error(error);
            }
          },
        },
      });
    } else { // si están creando
      try {
        const response = await axios.post("/crearObjetos", values);
        const newRows = await axios.get("/getObjetos");
        toast.success(response.data);
        closeModal(false);
        setRows(newRows.data);
        await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} creó un nuevo Objeto` });
        console.log(values);
      } catch (error) {
        toast.error(error.response.data); // Muestra el mensaje de error
        console.error(error);
      }
    }
  }

  return (
    <Form className="h-75 w-75" onSubmit={handleSubmit(submit)}>
      {/* Campo de Nombre Objeto */}
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="objeto">
            <Form.Label>Nombre Objeto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del Objeto"
              autoFocus
              {...register("OBJETO", {
                required: "El nombre del objeto es obligatorio.",
                minLength: {
                  value: 3,
                  message: "El nombre del objeto debe tener al menos 3 caracteres."
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "El nombre solo puede contener letras y espacios."
                }
              })}
              isInvalid={errors.OBJETO}
            />
            <Form.Control.Feedback type="invalid">
              {errors.OBJETO?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {/* Campo de Descripción */}
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción del objeto"
              {...register("DESCRIPCION", {
                required: "La descripción es obligatoria.",
                minLength: {
                  value: 5,
                  message: "La descripción debe tener al menos 5 caracteres."
                }
              })}
              isInvalid={errors.DESCRIPCION}
            />
            <Form.Control.Feedback type="invalid">
              {errors.DESCRIPCION?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Button type="submit" className="w-100 mt-5" style={{ backgroundColor: "#005f99", border: "none" }}>
        Guardar
      </Button>
    </Form>
  );
};
