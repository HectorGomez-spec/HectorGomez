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
    if (row) {
      setValue("NOMBRE_INFECCION", row.NOMBRE_INFECCION);
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
                `/actualizarInfeccion`,
                { ...values, ID: row.ID }
              );
              const newRows = await axios.get("/getInfeccion");
              toast.success(response.data);
              closeModal(false);
              setRows(newRows.data);
              await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} Actualizó una infección` });
            } catch (error) {
              toast.error(error.response?.data || 'Error al guardar los cambios');
              console.error(error);
            }
          },
        },
      });
    } else { // si están creando
      try {
        const response = await axios.post("/crearInfeccion", values);
        const newRows = await axios.get("/getInfeccion");
        toast.success(response.data);
        closeModal(false);
        setRows(newRows.data);
        await axios.post('/insertBitacora', { Accion: `${user[0][0].NOMBRE} Ingresó una nueva infección` });
        console.log(values);
      } catch (error) {
        toast.error(error.response?.data || 'Error al crear la infección');
        console.error(error);
      }
    }
  }

  return (
    <Form className="h-75 w-75" onSubmit={handleSubmit(submit)}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nombre Infección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              autoFocus
              {...register("NOMBRE_INFECCION", {
                required: "El nombre de la infección es obligatorio.",
                pattern: {
                  value: /^[A-Za-z0-9\s]+$/, // Permite solo letras, números y espacios
                  message: "El nombre solo puede contener letras, números y espacios. No se permiten signos especiales."
                }
              })}
              isInvalid={errors.NOMBRE_INFECCION} // Si hay un error, marcar el campo como inválido
            />
            <Form.Control.Feedback type="invalid">
              {errors.NOMBRE_INFECCION?.message} {/* Muestra el mensaje de error */}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción"
              {...register("DESCRIPCION", {
                required: "La descripción es obligatoria.",
                pattern: {
                  value: /^[A-Za-z0-9\s]+$/, // Permite solo letras, números y espacios
                  message: "La descripción solo puede contener letras, números y espacios. No se permiten signos especiales."
                }
              })}
              isInvalid={errors.DESCRIPCION} // Si hay un error, marcar el campo como inválido
            />
            <Form.Control.Feedback type="invalid">
              {errors.DESCRIPCION?.message} {/* Muestra el mensaje de error */}
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

