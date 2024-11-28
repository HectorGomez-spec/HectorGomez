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
      setValue("DESCRIPCION", row.DESCRIPCION);
      setValue("TIPO_DISPOSITIVO", row.TIPO_DISPOSITIVO);
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
                `/actualizarDispositivos`,
                { ...values, ID: row.ID }
              );
              const newRows = await axios.get("/getDispositivos");
              toast.success(response.data);
              closeModal(false);
              setRows(newRows.data);
              await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} actualizó un Dispositivo` });
            } catch (error) {
              toast.error(error.response.data); // Muestra el mensaje de error
              console.error(error);
            }
          },
        },
      });
    } else { // si están creando
      try {
        const response = await axios.post("/crearDispositivos", values);
        const newRows = await axios.get("/getDispositivos");
        toast.success(response.data);
        closeModal(false);
        setRows(newRows.data);
        await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} creó un nuevo dispositivo` });
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
          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción del dispositivo"
              autoFocus
              {...register("DESCRIPCION", {
                required: "La descripción es obligatoria.",
                minLength: {
                  value: 3,
                  message: "La descripción debe tener al menos 3 caracteres."
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

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="tipo_dispositivo">
            <Form.Label>Tipo de Dispositivo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tipo de dispositivo"
              {...register("TIPO_DISPOSITIVO", {
                required: "El tipo de dispositivo es obligatorio.",
                pattern: {
                  value: /^[A-Za-z0-9\s]+$/,
                  message: "El tipo de dispositivo solo puede contener letras, números y espacios."
                }
              })}
              isInvalid={errors.TIPO_DISPOSITIVO}
            />
            <Form.Control.Feedback type="invalid">
              {errors.TIPO_DISPOSITIVO?.message}
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
