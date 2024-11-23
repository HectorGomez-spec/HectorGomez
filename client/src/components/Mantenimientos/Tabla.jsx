import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ModalC from "./Modal";
import { toast } from "sonner";
import { useEffect } from "react";
import { GenerarPDF } from "../Pdf";

export default function Tabla({
  columns,
  rows,
  modalBtnValue,
  formulario,
  searchTerm,
  handleSearchChange,
  filteredData,
  deleteRequest,
  permisoEliminar,
  permisoConsulta,
  permisoActualizar,
  titulo,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    console.log(rows);
  }, []);
  return (
    <div className="w-75  mt-5 m-auto">
      <div
        style={{
          borderBottom: "2px solid gray",
          marginBottom: "10px",
          color: "#061851",
        }}>
        <h1 style={{ color: "#003366", textAlign: "left" }}>{titulo}</h1>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between mb-2">
        {modalBtnValue && (
          <div
            className="mb-2 mb-md-2"
            style={{width: "14.5%"}}>
            <ModalC
              Nombre={modalBtnValue}
              ContenidoModal={formulario}
            />
          </div>
        )}
        <div style={{width:"14.5%"}}>
          <GenerarPDF head={columns} body={rows} nombre={titulo} />
        </div>
        {permisoConsulta && (
          <div className="mb-2 mb-md-2" style={{ width: "70%" }}>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-100 p-1 rounded-1 border-1"
            />
          </div>
        )}
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#005f99",
                      color: "#fff",
                    }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                            {column.id === "Acciones" && (
                              <>
                                {permisoActualizar && (
                                  <ModalC
                                    Nombre="Editar"
                                    ContenidoModal={formulario}
                                    row={row}
                                  />
                                )}
                                {deleteRequest && permisoEliminar && (
                                  <button
                                    className="btn btn-danger ms-1"
                                    onClick={() =>
                                      toast("¿Desea eliminar este registro?", {
                                        action: {
                                          label: "Si, Eliminar",
                                          onClick: () => {
                                            {
                                              deleteRequest(row.ID);
                                            }
                                          },
                                        },
                                      })
                                    }>
                                    Eliminar
                                  </button>
                                )}
                              </>
                            )}
                            {column.id === "N" && index + 1}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Filas por página"
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
