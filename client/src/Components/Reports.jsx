import{ useState, useEffect } from "react";
import "./Reports.css";
import { Bar } from "react-chartjs-2"; // Importing chart library

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedType, setSelectedType] = useState("rideUsage");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    // Fetch reports from API (mocked for now)
    fetchReports();
  }, []);

  const fetchReports = () => {
    // Simulated fetching data (replace with actual API call)
    setReports([
      { id: 1, type: "Ride Usage", date: "2024-09-01", status: "Generated" },
      { id: 2, type: "Cost Savings", date: "2024-09-05", status: "In Review" },
      {
        id: 3,
        type: "Environmental Impact",
        date: "2024-09-10",
        status: "Resolved",
      },
    ]);
  };

  const handleDownload = (format) => {
    // Handle download logic based on format
    console.log(`Download in ${format} format`);
  };

  const chartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Ride Usage",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="reports-container">
      <h1 className="reports-title">Reports</h1>
      <div className="report-filters">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="report-type-select"
        >
          <option value="rideUsage">Ride Usage</option>
          <option value="costSavings">Cost Savings</option>
          <option value="environmentalImpact">Environmental Impact</option>
        </select>
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange({ ...dateRange, start: e.target.value })
          }
          className="date-input"
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="date-input"
        />
        <button className="generate-button" onClick={fetchReports}>
          Generate Report
        </button>
      </div>
      <div className="chart-container">
        <Bar data={chartData} />
      </div>
      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.type}</td>
                <td>{report.date}</td>
                <td
                  className={`status ${report.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {report.status}
                </td>
                <td>
                  <button className="view-button">View</button>
                  <button
                    className="download-button"
                    onClick={() => handleDownload("PDF")}
                  >
                    Download PDF
                  </button>
                  <button
                    className="download-button"
                    onClick={() => handleDownload("CSV")}
                  >
                    Download CSV
                  </button>
                  <button
                    className="download-button"
                    onClick={() => handleDownload("Excel")}
                  >
                    Download Excel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
