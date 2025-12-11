import React from "react";

const DownloadCSV = ({ data, fileName = "data.csv", children }) => {
  const downloadCSV = () => {
    if (!data || data.length === 0) {
      return;
    }

    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    data.forEach((row) => {
      const values = headers.map((header) => `"${row[header] || ""}"`);
      csvRows.push(values.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div onClick={downloadCSV} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
};

export default DownloadCSV;
