import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";

export const Formulario = ({ row, closeModal }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { setRows, user } = useAppContext();

  // Este useEffect asegura que cuando `row` tiene datos, los setea en los campos del formulario
  useEffect(() => {
    if (row) { // Verifica que `row` tenga datos
      setValue("NOMBRE_ESTADO", row.NOMBRE_ESTADO);
    }
  }, [row, setValue]); // Se ejecuta cuando `row` cambia

  // Función para manejar el envío del formulario
  async function submit(values) {
    if (row) { // Si estamos actualizando, se hace un PUT
      toast("¿Desea guardar los cambios?", {
        action: {
          label: "Guardar",
          onClick: async () => {
            try {
              const response = await axios.put(
                `/actualizarEstadoMonitoreo`, 
                { ...values, ID: row.ID } // Se agrega el ID para actualizar
              );
              const newRows = await axios.get("/getEstadoMonitoreo");
              toast.success(response.data);
              closeModal(false);
              setRows(newRows.data);
              await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} actualizó un control Estado Monitoreo` });
            } catch (error) {
              toast.error(error.response?.data || 'Error al guardar los cambios');
              console.error(error);
            }
          },
        },
      });
    } else { // Si estamos creando, se hace un POST
      try {
        const response = await axios.post("/crearEstadoMonitoreo", values);
        const newRows = await axios.get("/getEstadoMonitoreo");
        toast.success(response.data);
        closeModal(false);
        setRows(newRows.data);
        await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} creó un Estado Monitoreo` });
      } catch (error) {
        toast.error(error.response?.data || 'Error al crear el estado');
        console.error(error);
      }
    }
  }

  return (
    <Form className="h-75 w-75" onSubmit={handleSubmit(submit)}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nombre Estado</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              autoFocus
              {...register("NOMBRE_ESTADO", { 
                required: "El nombre del estado es obligatorio.",
                pattern: {
                  value: /^[A-Za-z\s]+$/i, // Solo permite letras y espacios
                  message: "El nombre solo puede contener letras y espacios."
                }
              })}
              isInvalid={errors.NOMBRE_ESTADO} // Si hay error, marcar el campo como inválido
            />
            <Form.Control.Feedback type="invalid">
              {errors.NOMBRE_ESTADO?.message} {/* Muestra el mensaje de error */}
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
