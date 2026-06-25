import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportPDFButton({
  applications,
}) {

  const generatePDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "CareerHub Application Report",
      14,
      20
    );

    autoTable(doc, {
      startY: 35,

      head: [[
        "Company",
        "Role",
        "Status",
        "Location",
        "Salary"
      ]],

      body: applications.map((app) => [
        app.company,
        app.role,
        app.status,
        app.location || "-",
        app.salary || "-"
      ]),
    });

    doc.save("CareerHub_Report.pdf");
  };

  return (
    <button
      onClick={generatePDF}
      className="
      bg-purple-600
      hover:bg-purple-700
      text-white
      px-5
      py-3
      rounded-xl
      font-semibold
      transition
      "
    >
      Export PDF Report
    </button>
  );
}