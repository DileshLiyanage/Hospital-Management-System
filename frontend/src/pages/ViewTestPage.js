import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SummaryApi from "../common/index";

const ViewTestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`${SummaryApi.getTestById.url}/${id}`, {
          method: SummaryApi.getTestById.method,
        });
        const result = await response.json();
        if (response.ok) {
          setTest(result.data);
        } else {
          toast.error(result.message || "Failed to fetch test details.");
        }
      } catch (error) {
        toast.error("Error fetching test details. Please try again.");
      }
    };
    fetchTest();
  }, [id]);

  const downloadPDF = () => {
    if (!test) return;

    const doc = new jsPDF();

    // **Header Section**
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 102, 204);
    doc.text("PRABODHA", 14, 25);
    doc.setTextColor(0, 153, 76);
    const prabodhaWidth = doc.getTextWidth("PRABODHA");
    doc.text("CENTRAL HOSPITAL", 14 + prabodhaWidth + 2, 25);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text("Prabodha Central Hospitals (PVT) LTD", 14, 32);
    doc.text("No.49, Beach Road, Matara, Sri Lanka.", 14, 37);
    doc.text("Tel: 041 2 238 338 / 071 18 41 662", 14, 42);
    doc.text("Email: prabodhahospital@gmail.com", 14, 47);

    doc.setTextColor(0, 102, 204);
    const websiteText = "www.prabodhahealth.lk";
    const websiteX = 160;
    const websiteY = 47;
    doc.text(websiteText, websiteX, websiteY, { align: "right" });

    const websiteWidth = doc.getTextWidth(websiteText);
    doc.link(websiteX - websiteWidth, websiteY - 2, websiteWidth, 5, { url: "https://www.prabodhahealth.lk" });

    // Add the hospital logo on the right side of the header
    // Replace "path/to/logo.png" with the actual path to your logo image
    // doc.addImage("/logo.png", "PNG", 160, 5, 30, 30);

    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 102, 204);
    doc.line(14, 53, 196, 53);

    // **Patient Information Section**
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text(`${test.name || "N/A"}`, 14, 63);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Age: ${test.age || "N/A"}`, 14, 70);
    doc.text(`Gender: ${test.gender || "N/A"}`, 14, 77);
    doc.text(`Address: ${test.address || "N/A"}`, 14, 84);

    const testDate = new Date(test.testDate);
    const formattedDate = testDate.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) + ` ${testDate.getDate()} ${testDate.toLocaleString("en-US", { month: "short" })}, ${testDate.getFullYear().toString().slice(-2)}`;
    
    doc.text(`Registered on: ${formattedDate}`, 100, 63);
    doc.text(`Collected on: ${formattedDate}`, 100, 70);
    doc.text(`Reported on: ${formattedDate}`, 100, 77);

    // **Test Title**
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("BLOOD REPORT", 84, 103 );

    // **Test Results Table**
    const tableColumn = ["Investigation", "Result", "Reference Value", "Unit"];
    
    // Dynamically populate the table with database data (test.testData)
    const tableRows = test.testData && Array.isArray(test.testData)
      ? test.testData.map(data => [
          data.investigation || "N/A",
         `${data.result || "N/A"} - ${test.address || "N/A"}`,
          data.referenceValue || "N/A",
          data.unit || "N/A",
        ])
      : []; // Empty array if no data is available

    // Check if there’s data to display in the table
    if (tableRows.length === 0) {
      doc.setFontSize(12);
      doc.setTextColor(255, 0, 0); // Red color for error message
      doc.text(`Result: ${test.testData || "N/A"}`, 30, 110);
    } else {
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 110,
        styles: { fontSize: 10, cellPadding: 2 },
        headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
        bodyStyles: { textColor: [0, 0, 0] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        columnStyles: {
          0: { cellWidth: 60 }, // Investigation
          1: { cellWidth: 30, halign: "center" }, // Result
          2: { cellWidth: 50, halign: "center" }, // Reference Value
          3: { cellWidth: 30, halign: "center" }, // Unit
        },
      });
    }

    // **Thanks for Reference**
    const finalY = tableRows.length > 0 ? doc.lastAutoTable.finalY || 110 : 110;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);


    // **End of Report**
    doc.text("***End of Report***", 105, finalY + 120, { align: "center" });

    // **Footer Section**
    doc.setFontSize(10);
    doc.text("Medical Lab Technician", 14, finalY + 140);
    doc.text("(DMLT, BMLT)", 14, finalY + 145);
    doc.text("Dr. Menaka Ambepitiya", 80, finalY + 140);
    doc.text("(MD, Pathologist)", 80, finalY + 145);
    doc.text("Dr. Menaka Ambepitiya", 140, finalY + 140);
    doc.text("(MD, Pathologist)", 140, finalY + 145);

    // Footer bottom
    doc.setFontSize(9);
    const generatedDate = new Date().toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    doc.text(`Generated on: ${generatedDate}`, 14, 280);
    doc.text("Page 1 of 1", 180, 280);
    doc.text("Sample Collection 0123456789", 105, 280, { align: "center" });

    // Save the PDF
    doc.save(`Test_Report_${test.name}.pdf`);
  };

  if (!test) {
    return <p className="text-center text-gray-600 mt-10">Loading test details...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Test Details</h2>

        <div className="mb-4">
          <p className="font-semibold">Name: <span className="font-normal">{test?.name || "N/A"}</span></p>
          <p className="font-semibold">Age: <span className="font-normal">{test?.age || "N/A"}</span></p>
          <p className="font-semibold">Gender: <span className="font-normal">{test?.gender || "N/A"}</span></p>
          <p className="font-semibold">Address: <span className="font-normal">{test?.address || "N/A"}</span></p>
          <p className="font-semibold">Test Date: <span className="font-normal">{test?.testDate ? new Date(test.testDate).toLocaleDateString() : "N/A"}</span></p>
          <p className="font-semibold">Test Data: <span className="font-normal">{test?.testData || "N/A"}</span></p>
        </div>

        <div className="text-center">
          <button
            onClick={downloadPDF}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition duration-300"
          >
            Download Report as PDF
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/all-tests")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Back to All Tests
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTestPage;