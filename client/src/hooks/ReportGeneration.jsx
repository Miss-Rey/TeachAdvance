import React, { useState } from 'react'
import { jsPDF } from 'jspdf'
import "jspdf-autotable"

const ReportGeneration = () => {
    const exportData = (data, className, classCode) => {
        // const [className, setClassName] = useState('')
        const doc = new jsPDF();


        doc.setFontSize(18);
        doc.setTextColor("#1A73E8");
        doc.text(`${className}: ${classCode}`, 165, 15, { align: "center" })

        doc.setFontSize(12);
        doc.setTextColor("#333333");
        doc.text(`Generates on: ${new Date().toLocaleDateString()}`, 105, 25, { align: "left" })
        const tableData = []
        data.forEach((item) => {
            const row = [
                item.firstName || 'N/A',
                item.lastName || 'N/A',
                item.email || 'N/A',
                '+254'+item.phone || 'N/A'
            ];
            tableData.push(row)
        })
        console.log(tableData)
        doc.autoTable({
            startY: 35,
            head: [["Firstname", "Lastname", "Email", "Status"]],
            body: tableData,
            styles: { fontSize: 10, lineColor: "#CCCCCC", lineWidth: 0.1 },
            headStyles: {
                fillColor: "#1A73E8", // Table header background color
                textColor: "#FFFFFF", // Header text color
                halign: "center", // Text alignment
            },
            bodyStyles: { halign: "center" },
            alternateRowStyles: { fillColor: "#F5F5F5" },
        })

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(
                `Page ${i} of ${pageCount}`,
                105,
                doc.internal.pageSize.height - 10,
                { align: "center" }
            );
        }

        // Save the PDF
        doc.save(`${classCode} ${className}.pdf`);
    }

    const exportInstructortData = (data) => {
        const doc = new jsPDF();


        doc.setFontSize(18);
        doc.setTextColor("#1A73E8");
        doc.text('Associated Instructors', 165, 15, { align: "center" })

        doc.setFontSize(12);
        doc.setTextColor("#333333");
        doc.text(`Generates on: ${new Date().toLocaleDateString()}`, 105, 25, { align: "left" })
        const tableData = []
        data.forEach((item) => {
            const row = [
                item.firstName || 'N/A',
                item.lastName || 'N/A',
                item.email || 'N/A',
                '+254'+item.phone || 'N/A'
            ];
            tableData.push(row)
        })
        console.log(tableData)
        doc.autoTable({
            startY: 35,
            head: [["Firstname", "Lastname", "Email", "Phone Number"]],
            body: tableData,
            styles: { fontSize: 10, lineColor: "#CCCCCC", lineWidth: 0.1 },
            headStyles: {
                fillColor: "#1A73E8", // Table header background color
                textColor: "#FFFFFF", // Header text color
                halign: "center", // Text alignment
            },
            bodyStyles: { halign: "center" },
            alternateRowStyles: { fillColor: "#F5F5F5" },
        })

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(
                `Page ${i} of ${pageCount}`,
                105,
                doc.internal.pageSize.height - 10,
                { align: "center" }
            );
        }

        // Save the PDF
        doc.save("Associated Instructors.pdf");
    }

    const exportAdminData = (data) => {
        const doc = new jsPDF();


        doc.setFontSize(18);
        doc.setTextColor("#1A73E8");
        doc.text('System Administrators', 165, 15, { align: "center" })

        doc.setFontSize(12);
        doc.setTextColor("#333333");
        doc.text(`Generates on: ${new Date().toLocaleDateString()}`, 105, 25, { align: "left" })
        const tableData = []
        data.forEach((item) => {
            const row = [
                item.firstName || 'N/A',
                item.lastName || 'N/A',
                item.email || 'N/A',
                '+254'+item.phone || 'N/A'
            ];
            tableData.push(row)
        })
        console.log(tableData)
        doc.autoTable({
            startY: 35,
            head: [["Firstname", "Lastname", "Email", "Phone Number"]],
            body: tableData,
            styles: { fontSize: 10, lineColor: "#CCCCCC", lineWidth: 0.1 },
            headStyles: {
                fillColor: "#1A73E8", // Table header background color
                textColor: "#FFFFFF", // Header text color
                halign: "center", // Text alignment
            },
            bodyStyles: { halign: "center" },
            alternateRowStyles: { fillColor: "#F5F5F5" },
        })

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(
                `Page ${i} of ${pageCount}`,
                105,
                doc.internal.pageSize.height - 10,
                { align: "center" }
            );
        }

        // Save the PDF
        doc.save("System Administrators.pdf");
    }

    return {exportData, exportInstructortData, exportAdminData}
}

export default ReportGeneration