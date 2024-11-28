import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";

export const Formulario = ({ row, closeModal }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { setRows, user } = useAppContext();

  useEffect(() => {
    if (row) { // Si es una actualización
      setValue("DESCRIPCION", row.DESCRIPCION);
    }
  }, [row, setValue]);

  async function submit(values) {
    if (row) { // Si están actualizando
      toast("¿Desea guardar los cambios?", {
        action: {
          label: "Guardar",
          onClick: async () => {
            try {
              const response = await axios.put(
                `/actualizarEstadoUsuario`,
                { ...values, ID: row.ID }
              );
              const newRows = await axios.get("/getEstadosUsuario");
              toast.success(response.data);
              closeModal(false);
              setRows(newRows.data);
              await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} editó un estado` });
            } catch (error) {
              toast.error(error.response.data); // Muestra el mensaje de error
              console.error(error);
            }
          },
        },
      });
    } else { // Si están creando
      try {
        const response = await axios.post("/crearEstadoUsuario", values);
        const newRows = await axios.get("/getEstadosUsuario");
        toast.success(response.data);
        closeModal(false);
        setRows(newRows.data);
        await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} creó el estado ${values.DESCRIPCION}` });
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
              placeholder="descripcion"
              autoFocus
              {...register("DESCRIPCION", {
                required: "La descripción es obligatoria.",
                pattern: {
                  value: /^(Activo|Inactivo)$/, // Solo permite "ACTIVO" o "INACTIVO"
                  message: "La descripción debe ser 'Activo' o 'Inactivo' la primera letra mayúscula."
                }
              })}
              isInvalid={errors.DESCRIPCION} // Mostrar error si es inválido
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

