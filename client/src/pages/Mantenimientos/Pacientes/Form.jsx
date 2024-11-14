import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";

export const Formulario = ({ row, closeModal }) => {
  const { register, handleSubmit, setValue } = useForm();
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
  }, [roles, generos]); //significa que se va a ejecutar solo cuando cambie roles o estados

  async function submit(values) {
    if (row) {
      // si estan actualizando
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
              toast.error(error.response.data); // Muestra el mensaje de error
              console.error(error);
            }
          },
        },
      });
    } else {
      // si estan creando
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
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Correo"
              {...register("CORREO", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              type="text"
              placeholder="Direccion"
              {...register("DIRECCION", { required: true })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Género</Form.Label>
            <Form.Select {...register("ID_GENERO", { required: true })}>
              <option value="">Seleccione</option>
              {generos.map((item) => (
                <option key={item.ID} value={item.ID}>
                  {item.NOMBRE_GENERO}
                </option>
              ))}
            </Form.Select>
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
              {...register("EDAD", { required: true })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              placeholder="Fecha de Nacimiento"
              {...register("FECHA_NACIMIENTO", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Telefono"
              {...register("TELEFONO", { required: true })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
            <Form.Label>Identidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Identidad"
              {...register("IDENTIDAD", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Sala</Form.Label>
            <Form.Select {...register("ID_SALA", { required: true })}>
              <option value="">Seleccione</option>
              {salas.map((item) => (
                <option key={item.ID} value={item.ID}>
                  {item.SALA}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
            <Form.Label>Diagnostico</Form.Label>
            <Form.Control
              type="text"
              placeholder="Diagnostico"
              {...register("DIAGNOSTICO", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
            {["checkbox"].map((type) => (
              <div key={`default-${type}`} className="mb-3 text-secondary">
                <Form.Check // prettier-ignore
                  type={type}
                  id={`default-${type}`}
                  {...register("DISPOSITIVOOTROHOSPITAL", { required: true })}
                  label={`Paciente venía con un dispositivo de otro hospital`}
                />
              </div>
            ))}
          </Form.Group>
        </Col>
      </Row>
      <Button
        type="submit"
        className="w-100 mt-2"
        style={{ backgroundColor: "#005f99", border: "none" }}>
        Guardar
      </Button>
    </Form>
  );
};
