import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "react-bootstrap";
import { ImFilePdf } from "react-icons/im";
import date from "date-and-time";

export function GenerarPDF({ head, body, nombre }) {
  //arreglo con los id de las columnas ej: ["IdObjeto","Descripcion"]
  const id = Object.entries(head)
    .filter((item) => item[1].id !== "#" && item[1].id !== "Acciones")
    .map((item) => item[1].id);
  //arreglo con los nombres (labels) de las columnas ej: ["Id Objeto","Descripcion"]
  const columns = Object.entries(head)
    .filter((item) => item[1].label !== "Acciones")
    .map((item) => item[1].label);
  //arreglo con los datos de las filas ej: [{},{}]
  const rows = Object.entries(body).map((item) => item[1]);

  //extrae los datos de las filas dependiendo del id,  ej: row[id] significaria objeto.IdObjeto
  const extractedRows = rows.map((row, index) => {
    const extractedData = id.map((id) => row[id]);
    extractedData.unshift(index + 1);
    return extractedData;
  });

  const now = new Date();
  const fecha = date.format(now, "YYYY/MM/DD HH:mm:ss");

  function CrearPDF() {
    const doc = new jsPDF();
    let totalPagesExp = "{total_pages_count_string}";
    autoTable(doc, {
      startY: 30,
      pageBreak: "auto",
      showFoot: "everyPage",
      styles: {
        fontSize: 10,
        halign: "justify",
        cellWidth: "auto",
      },
      headStyles: { fillColor: [56, 84, 172] },
      head: [columns],
      body: extractedRows,
      didDrawPage: function (data) {
        doc.setTextColor(40);
        let texto = `Sistema de Vigilancia Epidemiológica`;
        let textoWidth = doc.getTextWidth(texto);
        let paginaWidth = doc.internal.pageSize.width;
        let x = (paginaWidth - textoWidth) / 2;
        doc.setFontSize(18);
        doc.text(texto, x, 15);
        //nombre de la tabla que se imprime
        let mantenimiento = `${nombre}`;
        let mantenimientoWidth = doc.getTextWidth(mantenimiento);
        let x1 = (paginaWidth - mantenimientoWidth) / 2;
        doc.setFontSize(14);
        doc.text(mantenimiento, x1, 25);

        let currentPageNum = doc.internal.getCurrentPageInfo().pageNumber;

        // Footer
        var str = "Pagina " + currentPageNum;
        if (typeof doc.putTotalPages === "function") {
          str = str + " de " + totalPagesExp + `      Fecha: ${fecha} `;
        }

        doc.setFontSize(8);
        doc.setTextColor(40);

        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();

        doc.text(str, 14, pageHeight - 10);
      },
    });

    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }

    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }
    const pdfUrl = doc.output("bloburl");
    window.open(pdfUrl);
  }

  return (
    <Button
      onClick={CrearPDF}
      style={{ backgroundColor: "#ce181e", border: "none", width: "100%" }}>
      Reporte <ImFilePdf style={{ fontSize: "18px" }} />
    </Button>
  );
}
