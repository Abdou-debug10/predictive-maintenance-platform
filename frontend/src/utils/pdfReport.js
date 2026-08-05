import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePDF(predictions) {

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("AI Predictive Maintenance Report", 14, 20);

    doc.setFontSize(11);
    doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        14,
        30
    );

    const healthy = predictions.filter(
        p => p.prediction === "Machine Healthy"
    ).length;

    const failure = predictions.filter(
        p => p.prediction === "Machine Failure Predicted"
    ).length;

    doc.setFontSize(14);

    doc.text("Summary", 14, 45);

    doc.setFontSize(11);

    doc.text(
        `Total Predictions : ${predictions.length}`,
        14,
        55
    );

    doc.text(
        `Healthy Machines : ${healthy}`,
        14,
        63
    );

    doc.text(
        `Failure Predictions : ${failure}`,
        14,
        71
    );

    autoTable(doc, {

        startY: 82,

        head: [[
            "ID",
            "Prediction",
            "Confidence",
            "Created At"
        ]],

        body: predictions.map(p => [
            p.id,
            p.prediction,
            `${p.confidence}%`,
            p.created_at
        ])

    });

    doc.save("Predictive_Maintenance_Report.pdf");

}