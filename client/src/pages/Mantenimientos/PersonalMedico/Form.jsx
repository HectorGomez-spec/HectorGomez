import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";

export const Formulario = ({ row, closeModal }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { setRows, user } = useAppContext();
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    async function getEspecialidades() {
      try {
        const response = await axios.get("/getEspecialidad");
        setEspecialidades(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getEspecialidades();
  }, []);

  useEffect(() => {
    if (row) {
      console.log(row);
      setValue("NOMBRE", row.NOMBRE);
      setValue("DIRECCION", row.DIRECCION);
      setValue("TELEFONO", row.TELEFONO);
      setValue("ID_ESPECIALIDAD", row.ID_ESPECIALIDAD);
    }
  }, [row, setValue]);

  async function submit(values) {
    if (row) { // si están actualizando
      toast("¿Desea guardar los cambios?", {
        action: {
          label: "Guardar",
          onClick: async () => {
            try {
              const response = await axios.put(`/actualizarPersonalMedico`, {
                ...values, ID: row.ID
              });
              const newRows = await axios.get("/getPersonalMedico");
              toast.success(response.data);
              closeModal(false);
              setRows(newRows.data);
              await axios.post('/insertBitacora', {
                Accion: `${user[0][0].NOMBRE} actualizó un Personal Medico`
              });
            } catch (error) {
              toast.error(error.response.data); // Muestra el mensaje de error
              console.error(error);
            }
          },
        },
      });
    } else { // si están creando
      try {
        const response = await axios.post("/crearPersonalMedico", values);
        const newRows = await axios.get("/getPersonalMedico");
        toast.success(response.data);
        closeModal(false);
        setRows(newRows.data);
        await axios.post('/insertBitacora', {
          Accion: `${user[0][0].NOMBRE} creó un personal medico`
        });
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
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              autoFocus
              {...register("NOMBRE", {
                required: "El nombre es obligatorio.",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres."
                },
                pattern: {
                  value: /^[A-Za-záéíóúÁÉÍÓÚÑñ\s]+$/,
                  message: "El nombre solo puede contener letras y espacios."
                }
              })}
              isInvalid={errors.NOMBRE}
            />
            <Form.Control.Feedback type="invalid">
              {errors.NOMBRE?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="especialidad">
            <Form.Label>Especialidad</Form.Label>
            <Form.Select
              {...register("ID_ESPECIALIDAD", {
                required: "La especialidad es obligatoria."
              })}
              isInvalid={errors.ID_ESPECIALIDAD}
            >
              <option value="">Seleccione una especialidad</option>
              {especialidades.map((especialidad) => (
                <option key={especialidad.ID} value={especialidad.ID}>
                  {especialidad.NOMBRE_ESPECIALIDAD}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.ID_ESPECIALIDAD?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección"
              {...register("DIRECCION", {
                required: "La dirección es obligatoria."
              })}
              isInvalid={errors.DIRECCION}
            />
            <Form.Control.Feedback type="invalid">
              {errors.DIRECCION?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Teléfono"
              {...register("TELEFONO", {
                required: "El teléfono es obligatorio.",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "El teléfono solo debe contener numeros y minimo 10 dígitos"
                }
              })}
              isInvalid={errors.TELEFONO}
            />
            <Form.Control.Feedback type="invalid">
              {errors.TELEFONO?.message}
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
