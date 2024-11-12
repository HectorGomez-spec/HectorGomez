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
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    async function getRoles() {
      const response = await axios.get("/getRoles");
      setRoles(response.data);
      const resp2 = await axios.get("/getEstados");
      setEstados(resp2.data);
      console.log(user)
    }
    getRoles();
    console.log(row);
  }, []);


  
  useEffect(() => {
    if (row) {
      setValue("NOMBRE", row.NOMBRE);
      setValue("APELLIDO", row.APELLIDO);
      setValue("CORREO", row.CORREO);
      setValue("ID_ROL", row.IDROL);
      setValue("ID_ESTADO_USUARIO", row.IDESTADO);
    }
  }, [roles,estados]);//significa que se va a ejecutar solo cuando cambie roles o estados

  async function submit(values) {
    if (row) { // si estan actualizando
      toast("¿Desea guardar los cambios?", {
        action: {
          label: "Guardar",
          onClick: async () => {
            try {
              const response = await axios.put(
                `/actualizarUsuario`,
                {...values, ID: row.ID}
              );
              const newRows = await axios.get("/getUsuarios");
              toast.success(response.data);
              closeModal(false);
              setRows(newRows.data);
              await axios.post('/insertBitacora', {Accion: `${user[0][0].NOMBRE} editó un usuario`});

            } catch (error) {
              toast.error(error.response.data); // Muestra el mensaje de error
              console.error(error);
            }
          },
        },
      });
    } else {// si estan creando
      try {
        const response = await axios.post("/crearUsuario", {...values,ID_ESTADO_USUARIO: 1});
        const newRows = await axios.get("/getUsuarios");
        toast.success(response.data);
        closeModal(false);
        setRows(newRows.data);
        await axios.post('/insertBitacora', {Accion: `${user[0][0].NOMBRE} creó el usuario ${values.NOMBRE} ${values.APELLIDO}`});
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
              placeholder="Nombres"
              autoFocus
              {...register("NOMBRE", { required: true })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              {...register("APELLIDO", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo"
              {...register("CORREO", { required: true })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Rol</Form.Label>
            <Form.Select {...register("ID_ROL", { required: true })}>
              <option value="">Seleccione</option>
              {roles.map((rol) => (
                <option key={rol.ID} value={rol.ID}>
                  {rol.NOMBRE_ROL}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {!row && ( //si estas creando
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"} // Mostrar como texto o contraseña
                placeholder="Contraseña"
                {...register("USER_PASSWORD", { required: !row })} // La contraseña solo es obligatoria si no hay datos previos
              />
            </Form.Group>
            <Form.Check
              type="checkbox"
              id="showPasswordCheck" // Agrega un id al checkbox
              label={
                <Form.Label controlId="showPasswordCheck">
                  Mostrar contraseña
                </Form.Label>
              } // El label apunta al id del checkbox
              onChange={(e) => setShowPassword(e.target.checked)}
            />
          </Col>
        )}
        {row && ( //si estas actualizando
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Estado</Form.Label>
              <Form.Select {...register("ID_ESTADO_USUARIO", { required: true })}>
                <option value="">Seleccione</option>
                {estados.map((estado) => (
                  <option key={estado.ID} value={estado.ID}>
                    {estado.DESCRIPCION}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        )}
      </Row>
      <Button type="submit" className="w-100 mt-5" style={{backgroundColor:"#005f99", border:"none"}}>
        Guardar
      </Button>
    </Form>
  );
};
