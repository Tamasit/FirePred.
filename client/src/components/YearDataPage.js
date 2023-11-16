import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import Papa from "papaparse";

const YearDataPage = () => {
  const [csvData, setCsvData] = useState([]);
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    marginTop: "20px",
  };

  const getChartContainerStyle = () => {
    const isMobile = window.innerWidth < 600; // Adjust the breakpoint as needed

    return {
      margin: "10px",
      ...getChartContainerStyles(isMobile),
    };
  };

  const getChartContainerStyles = (isMobile) => ({
    padding: isMobile ? "10px" : "0", // Add padding for mobile screens
  });

  const getChartWrapperStyle = () => ({
    width: "100%",
    maxWidth: "100%",
    height: "300px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    margin: "8px 0",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#F1F2EB",
    ...getChartWrapperStyles(),
  });

  const getChartWrapperStyles = () => ({
    padding: "10px", // Add padding for a gap between the edge
  });

  const headerStyle = {
    textAlign: "center",
    margin: "1rem",
  };

  const years = Array.from(
    { length: 11 },
    (_, index) => 2013 + index
  ).reverse();

  const navigate = useNavigate();

  const handleCardClick = (year) => {
    navigate(`/YearPage/Year${year}`);
  };

  const renderYearlyChart = (data) => {
    if (!data) {
      return null;
    }

    const years = Object.keys(data);
    const occurrences = years.map((year) => {
      if (Array.isArray(data[year])) {
        return data[year].length;
      } else {
        return 0;
      }
    });

    const yearlyData = {
      labels: years,
      datasets: [
        {
          label: "Occurrences",
          data: occurrences,
          backgroundColor: getRandomColor(),
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 1,
        },
      ],
    };

    const ctx = document.getElementById("yearlyChart");

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: "bar",
      data: yearlyData,
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            type: "linear",
            position: "left",
            beginAtZero: true,
            max: 40000,
          },
          x: {
            type: "category",
            position: "bottom",
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.PUBLIC_URL + "/data/MODISData_2013-2023.csv"
        );
        const result = await response.text();

        Papa.parse(result, {
          header: true,
          dynamicTyping: true,
          complete: (parsedData) => {
            // Set the parsed data to the state
            setCsvData(parsedData.data);

            // Process your CSV data to create the yearlyChartData
            const yearlyData = {};
            parsedData.data.forEach((entry) => {
              const acqDate = entry.acq_date;
              const year = acqDate
                ? new Date(acqDate).getFullYear()
                : undefined;

              if (year && !isNaN(year)) {
                if (!yearlyData[year]) {
                  yearlyData[year] = [];
                }
                yearlyData[year].push(entry);
              }
            });

            // Render the yearly chart with the processed data
            renderYearlyChart(yearlyData);
          },
        });
      } catch (error) {
        console.error("Error fetching or parsing CSV data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center">
      <div style={containerStyle}>
        <div className="flex flex-col items-center">
          <div className="my-4" style={headerStyle}>
            <h1 className="text-3xl font-semibold text-red-500">
              ข้อมูลสถิติการเกิดไฟตั้งแต่ปี 2013 ถึง 2023
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 map-card-container items-center justify-center">
            {years.map((year) => (
              <div
                className="flex items-center justify-center"
                key={year}
                onClick={() => handleCardClick(year)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="max-w-md mx-auto bg-white rounded-xl shadow-md justify-self-center transform hover:scale-105 transition-transform duration-300"
                  style={{
                    height: "100px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                    overflow: "hidden",
                    margin: "10px 10px 20px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "box-shadow 0.3s ease-in-out",
                    cursor: "pointer",
                    borderTop: "1px solid #e5e7eb",
                    backgroundColor: "#F1F2EB",
                    paddingBottom: "10px",
                  }}
                >
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">
                      ภาพรวมประจำปี {year}
                    </h2>
                    <div className="text-right mt-2">
                      <Link
                        to={`/YearPage/Year${year}`}
                        className="text-blue-500"
                      >
                        ดูเพิ่มเติม
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <br></br>
          {/* Yearly Chart */}
          <div className="my-4" style={headerStyle}>
            <h2 className="text-2xl font-semibold text-blue-500">
              กราฟแสดงผลรายปี
            </h2>
          </div>
          <div
            className="w-full max-w-md mx-auto"
            style={getChartContainerStyle()}
          >
            <div style={getChartWrapperStyle()}>
              <canvas id="yearlyChart" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearDataPage;

// Helper function to generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
