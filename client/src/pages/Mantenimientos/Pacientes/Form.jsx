import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";

export const Formulario = ({ row, closeModal }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { setRows, user } = useAppContext();
  const [roles, setRoles] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    async function getRoles() {
      const response = await axios.get("/getPacientes");
      setRoles(response.data);
      const resp2 = await axios.get("/getGeneros");
      setGeneros(resp2.data);
      const resp3 = await axios.get("/getSalas");
      setSalas(resp3.data);
    }
    getRoles();
    console.log(row);
  }, []);

  useEffect(() => {
    if (row) {
      setValue("NOMBRE", row.NOMBRE);
      setValue("DIRECCION", row.DIRECCION);
      setValue("TELEFONO", row.TELEFONO);
      setValue("CORREO", row.CORREO);
      setValue("EDAD", row.EDAD);
      setValue("FECHA_NACIMIENTO", row.FECHA_NACIMIENTO);
      setValue("IDENTIDAD", row.IDENTIDAD);
      setValue("ID_GENERO", row.ID_GENERO);
      setValue("ID_SALA", row.ID_SALA);
    }
  }, [roles, generos]);

  async function submit(values) {
    if (row) {
      // si están actualizando
      toast("¿Desea guardar los cambios?", {
        action: {
          label: "Guardar",
          onClick: async () => {
            try {
              const response = await axios.put(`/actualizarGenero`, {
                ...values,
                ID: row.ID,
              });
              const newRows = await axios.get("/getGeneros");
              toast.success(response.data);
              closeModal(false);
              setRows(newRows.data);
              await axios.post("/insertBitacora", {
                Accion: `${user[0][0].NOMBRE} editó un paciente`,
              });
            } catch (error) {
              toast.error(error.response?.data || "Error al guardar los cambios");
              console.error(error);
            }
          },
        },
      });
    } else {
      // si están creando
      try {
        const response = await axios.post("/crearPaciente", values);
        const newRows = await axios.get("/getPacientes");
        toast.success(response.data);
        closeModal(false);
        setRows(newRows.data);
        await axios.post("/insertBitacora", {
          Accion: `${user[0][0].NOMBRE} creó el PACIENTE ${values.NOMBRE}`,
        });
      } catch (error) {
        toast.error(error.response?.data || "Error al crear el paciente");
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
              {...register("NOMBRE", { required: "El nombre es obligatorio." })}
              isInvalid={errors.NOMBRE} // Si hay un error, marcar el campo como inválido
            />
            <Form.Control.Feedback type="invalid">
              {errors.NOMBRE?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Correo"
              {...register("CORREO", { required: "El correo es obligatorio." })}
              isInvalid={errors.CORREO}
            />
            <Form.Control.Feedback type="invalid">
              {errors.CORREO?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección"
              {...register("DIRECCION", { required: "La dirección es obligatoria." })}
              isInvalid={errors.DIRECCION}
            />
            <Form.Control.Feedback type="invalid">
              {errors.DIRECCION?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Género</Form.Label>
            <Form.Select {...register("ID_GENERO", { required: "Seleccione un género." })}>
              <option value="">Seleccione</option>
              {generos.map((item) => (
                <option key={item.ID} value={item.ID}>
                  {item.NOMBRE_GENERO}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.ID_GENERO?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Edad"
              {...register("EDAD", {
                required: "La edad es obligatoria.",
                valueAsNumber: true,
                min: { value: 0, message: "La edad debe ser mayor que 0." },
                max: { value: 120, message: "La edad no puede ser mayor que 120." },
              })}
              isInvalid={errors.EDAD}
            />
            <Form.Control.Feedback type="invalid">
              {errors.EDAD?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              placeholder="Fecha de Nacimiento"
              {...register("FECHA_NACIMIENTO", { required: "La fecha de nacimiento es obligatoria." })}
              isInvalid={errors.FECHA_NACIMIENTO}
            />
            <Form.Control.Feedback type="invalid">
              {errors.FECHA_NACIMIENTO?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Teléfono"
              {...register("TELEFONO", {
                required: "El teléfono es obligatorio.",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "El teléfono solo puede contener números.",
                },
              })}
              isInvalid={errors.TELEFONO}
            />
            <Form.Control.Feedback type="invalid">
              {errors.TELEFONO?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
            <Form.Label>Identidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Identidad"
              {...register("IDENTIDAD", {
                required: "La identidad es obligatoria.",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "La identidad solo puede contener números.",
                },
              })}
              isInvalid={errors.IDENTIDAD}
            />
            <Form.Control.Feedback type="invalid">
              {errors.IDENTIDAD?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Sala</Form.Label>
            <Form.Select {...register("ID_SALA", { required: "Seleccione una sala." })}>
              <option value="">Seleccione</option>
              {salas.map((item) => (
                <option key={item.ID} value={item.ID}>
                  {item.SALA}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.ID_SALA?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Button
        type="submit"
        className="w-100 mt-2"
        style={{ backgroundColor: "#005f99", border: "none" }}
      >
        Guardar
      </Button>
    </Form>
  );
};
