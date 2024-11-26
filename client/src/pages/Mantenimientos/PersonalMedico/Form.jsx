import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "sonner";

export const Formulario = ({ row, closeModal }) => {
  const { register, handleSubmit, setValue } = useForm();
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

  }, [especialidades]);  

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
              await axios.post('/insertBitacora', {Accion: `${user[0][0].NOMBRE} actualizó un Personal Medico`});
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
        await axios.post('/insertBitacora', {Accion: `${user[0][0].NOMBRE} creó un personal medico`});
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
            <Form.Label>Especialidad</Form.Label>
            <Form.Select {...register("ID_ESPECIALIDAD",{required:true})}>
              <option value="">Seleccione una especialidad</option>
              {especialidades.map((especialidad) => (
                <option key={especialidad.ID} value={especialidad.ID}>
                  {especialidad.NOMBRE_ESPECIALIDAD}
                </option>
              ))}

            </Form.Select>
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
