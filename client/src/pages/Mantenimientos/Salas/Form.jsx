import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";
import { useEffect } from "react";

export const Formulario = ({ row, closeModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { setRows, user } = useAppContext();

  useEffect(()=>{
    if(row){
      setValue("SALA", row.SALA);
    }
  },[])

  async function submit(values) {
    if (row) {
      toast("¿Desea guardar los cambios?", {
        action: {
          label: "Guardar",
          onClick: async () => {
            try {
              const response = await axios.put(
                `/actualizarSalas`,
                { ...values, ID: row.ID }
              );
              const newRows = await axios.get("/getSalas");
              toast.success(response.data);
              closeModal(false);
              setRows(newRows.data);
              await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} actualizó una Sala` });
            } catch (error) {
              toast.error(error.response.data);
              console.error(error);
            }
          },
        },
      });
    } else {
      try {
        const response = await axios.post("/crearSalas", values);
        const newRows = await axios.get("/getSalas");
        toast.success(response.data);
        closeModal(false);
        setRows(newRows.data);
        await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} creó una nueva Sala` });
      } catch (error) {
        toast.error(error.response.data);
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
              {...register("SALA", {
                required: "El nombre de la sala es obligatorio.",
                validate: (value) => {
                  // Verifica que solo contenga letras, números, y espacios simples
                  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/.test(value)) {
                    return "Solo se permiten letras, números y espacios.";
                  }
                  if (/\s{2,}/.test(value)) {
                    return "No se permiten dobles espacios.";
                  }
                  return true; // Si todo está bien, pasa la validación
                },
              })}y
              isInvalid={errors.SALA}
            />
            <Form.Control.Feedback type="invalid">
              {errors.SALA?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Button
        type="submit"
        className="w-100 mt-5"
        style={{ backgroundColor: "#005f99", border: "none" }}
      >
        Guardar
      </Button>
    </Form>
  );
};
