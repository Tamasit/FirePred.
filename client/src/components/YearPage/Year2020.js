import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import Chart from "chart.js/auto";

const NorthernThailandBounds = [
  [14.9833, 97.3438],
  [21.5704, 100.0911],
];

const NortheastThailandBounds = [
  [13.0914, 101.6516],
  [17.6018, 105.9139],
];

const CenterThailandBounds = [
  [12.141025, 99.693323],
  [14.657835, 102.525032],
];

const WesternThailandBounds = [
  [12.6348, 98.2867],
  [18.144, 99.8604],
];

const EasternThailandBounds = [
  [11.6667, 101.1154],
  [14.9833, 104.2857],
];

const SouthernThailandBounds = [
  [5.6129, 98.0586],
  [8.0875, 101.4152],
];

const Year2020 = () => {
  const months = useMemo(
    () => [
      { name: "มกราคม", number: 1 },
      { name: "กุมภาพันธ์", number: 2 },
      { name: "มีนาคม", number: 3 },
      { name: "เมษายน", number: 4 },
      { name: "พฤษภาคม", number: 5 },
      { name: "มิถุนายน", number: 6 },
      { name: "กรกฎาคม", number: 7 },
      { name: "สิงหาคม", number: 8 },
      { name: "กันยายน", number: 9 },
      { name: "ตุลาคม", number: 10 },
      { name: "พฤศจิกายน", number: 11 },
      { name: "ธันวาคม", number: 12 },
    ],
    []
  );

  const cardData = [
    { title: "ภาคเหนือ" },
    { title: "ภาคตะวันออกเฉียงเหนือ" },
    { title: "ภาคกลาง" },
    { title: "ภาคตะวันออก" },
    { title: "ภาคตะวันตก" },
    { title: "ภาคใต้" },
  ];

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "960px",
    margin: "0 auto",
    paddingTop: "20px",
    fontSize: "16px", // Set the default font size for larger screens
  };

  const mobileContainerStyle = {
    fontSize: "10px", // Adjust the font size for mobile screens
    flexDirection: "column",
    margin: "10px", // Adjust the margin for better spacing
    padding: "10px", // Adjust the padding for better spacing
  };
  const cardStyle = {
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "10px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
    transition: "transform 0.2s ease-in-out",
    ":hover": {
      transform: "scale(1.05)",
    },
    padding: "20px",
    width: "300px",
    height: "150px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const chartContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%", // Set a fixed width for the container
    margin: "0 auto", // Center the container
  };

  // Update yearlyChartStyle and monthlyChartStyle
  const yearlyChartStyle = {
    width: "100%", // Make the chart fill the container
    maxWidth: "600px", // Limit the maximum width of the chart
    height: "300px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    margin: "8px 0", // Adjust the margin if needed
    backgroundColor: "#F1F2EB",
  };

  const monthlyChartStyle = {
    width: "100%", // Make the chart fill the container
    maxWidth: "600px", // Limit the maximum width of the chart
    height: "300px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    margin: "8px 0", // Adjust the margin if needed
    backgroundColor: "#F1F2EB",
  };

  const mobileChartSectionStyle = {
    flexDirection: "column",
    marginTop: "20px", // Add some top margin for better spacing
  };

  const chartContainerStyleMobile = {
    ...chartContainerStyle,
    ...mobileChartSectionStyle,
    width: "90%", // Set a fixed width for the container
    margin: "0 auto", // Center the container
    height: "auto", // Let the height adjust dynamically based on content
  };

  const yearlyChartStyleMobile = {
    ...yearlyChartStyle,
    width: "100%", // Make the chart fill the container
    maxWidth: "600px", // Limit the maximum width of the chart
    height: "auto", // Let the height adjust dynamically based on content
    margin: "8px 0", // Adjust the margin if needed
  };

  const monthlyChartStyleMobile = {
    ...monthlyChartStyle,
    width: "100%", // Make the chart fill the container
    maxWidth: "600px", // Limit the maximum width of the chart
    height: "auto", // Let the height adjust dynamically based on content
    margin: "8px 0", // Adjust the margin if needed
  };

  const isMobile = window.innerWidth < 600;
  const [data, setData] = useState(null);

  useEffect(() => {
    const renderYearlyChart = (data) => {
      if (!data) {
        return null;
      }

      const yearlyData = {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Occurrences",
            data: Object.values(data).map((region) => region.length),
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
          scales: {
            y: {
              type: "linear",
              position: "left",
              beginAtZero: true,
            },
            x: {
              type: "category",
              position: "bottom",
            },
          },
        },
      });
    };

    const renderMonthlyChart = (data) => {
      if (!data) {
        return null;
      }

      const monthlyData = {
        labels: months.map((month) => month.name),
        datasets: Object.keys(data).map((region) => ({
          label: region,
          data: months.map((month) => {
            return data[region].filter((item) => {
              const itemMonth = new Date(item.acq_date).getMonth() + 1;
              return itemMonth === month.number;
            }).length;
          }),
          backgroundColor: getRandomColor(),
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 1,
        })),
      };

      const ctx = document.getElementById("monthlyChart");

      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: "bar",
        data: monthlyData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };
    const fetchData = async () => {
      const file = process.env.PUBLIC_URL + "/data/MODISData_2013-2023.csv";
      const res = await fetch(file);
      const text = await res.text();
      const jsonData = Papa.parse(text, { header: true }).data;

      const filterData = jsonData.filter(
        (item) => item.acq_date && item.acq_date.includes("2020")
      );

      const regionData = {
        ภาคเหนือ: filterData.filter((item) => {
          return (
            NorthernThailandBounds[0][0] <= item.latitude &&
            item.latitude <= NorthernThailandBounds[1][0] &&
            NorthernThailandBounds[0][1] <= item.longitude &&
            item.longitude <= NorthernThailandBounds[1][1]
          );
        }),
        ภาคตะวันออกเฉียงเหนือ: filterData.filter((item) => {
          return (
            NortheastThailandBounds[0][0] <= item.latitude &&
            item.latitude <= NortheastThailandBounds[1][0] &&
            NortheastThailandBounds[0][1] <= item.longitude &&
            item.longitude <= NortheastThailandBounds[1][1]
          );
        }),
        ภาคกลาง: filterData.filter((item) => {
          return (
            CenterThailandBounds[0][0] <= item.latitude &&
            item.latitude <= CenterThailandBounds[1][0] &&
            CenterThailandBounds[0][1] <= item.longitude &&
            item.longitude <= CenterThailandBounds[1][1]
          );
        }),
        ภาคตะวันออก: filterData.filter((item) => {
          return (
            EasternThailandBounds[0][0] <= item.latitude &&
            item.latitude <= EasternThailandBounds[1][0] &&
            EasternThailandBounds[0][1] <= item.longitude &&
            item.longitude <= EasternThailandBounds[1][1]
          );
        }),
        ภาคตะวันตก: filterData.filter((item) => {
          return (
            WesternThailandBounds[0][0] <= item.latitude &&
            item.latitude <= WesternThailandBounds[1][0] &&
            WesternThailandBounds[0][1] <= item.longitude &&
            item.longitude <= WesternThailandBounds[1][1]
          );
        }),
        ภาคใต้: filterData.filter((item) => {
          return (
            SouthernThailandBounds[0][0] <= item.latitude &&
            item.latitude <= SouthernThailandBounds[1][0] &&
            SouthernThailandBounds[0][1] <= item.longitude &&
            item.longitude <= SouthernThailandBounds[1][1]
          );
        }),
      };

      setData(regionData);

      renderYearlyChart(regionData);
      renderMonthlyChart(regionData);
    };

    fetchData();
  }, [months]);

  const renderTableData = (data) => {
    if (!data) {
      return null;
    }

    return (
      <div className="flex flex-col items-center">
        {chunkArray(months, 4).map((rowMonths, rowIndex) => (
          <div key={rowIndex} className="flex flex-col md:flex-row mb-8">
            {rowMonths.map((month) => (
              <div
                key={month.number}
                className="mb-4 md:mr-4 border border-solid border-gray-300 rounded p-4 w-full md:w-64"
                style={{ maxWidth: "300px" }} // Adjust the max width for larger screens
              >
                <h2 className="text-xl font-bold">{month.name}</h2>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Region</th>
                      <th>Occurrences</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(data).map((region) => (
                      <tr key={region}>
                        <td>{region}</td>
                        <td>
                          {
                            data[region].filter((item) => {
                              const itemMonth =
                                new Date(item.acq_date).getMonth() + 1;
                              return itemMonth === month.number;
                            }).length
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // Use space-between to push items to each end
          marginRight: isMobile ? "20px" : "200px", // Adjust the margin for mobile screens
          marginLeft: isMobile ? "20px" : "200px", // Adjust the margin for mobile screens
        }}
      >
        <Link
          to="/YearPage/Year2019"
          className="link-to-year2019 hover:text-red-500 transition-colors text-l"
          style={{
            marginRight: isMobile ? "auto" : "0", // Adjust the margin for mobile screens
          }}
        >
          {"<"} ปี 2019
        </Link>

        <Link
          to="/YearPage/Year2021"
          className="link-to-year2021 hover:text-red-500 transition-colors text-l"
          style={{
            marginLeft: isMobile ? "auto" : "0", // Adjust the margin for mobile screens
          }}
        >
          ปี 2021 {">"}
        </Link>
      </div>
      <h1
        className="text-3xl font-bold mt-4 mb-2 sm:mt-6 sm:mb-4 md:mt-8 md:mb-6 lg:mt-10 xl:mt-12 text-center"
        style={{
          fontSize: "25px",
          "@media (maxWidth: 600px)": {
            fontSize: "25px",
          },
        }}
      >
        <span className="text-blue-700">ข้อมูลสถิติการเกิดไฟในปี 2020</span>
      </h1>
      <div
        style={{
          ...containerStyle,
          ...(window.innerWidth < 600 ? mobileContainerStyle : {}),
        }}
      >
        {cardData.map((card, index) => (
          <div key={index} style={cardStyle}>
            <h5 className="mb-2 text-base tracking-tight text-center text-gray-900 dark:text-white">
              {card.title}
              <br />
              <span
                className={`mb-2 text-5xl font-bold tracking-tight ${
                  index < 6 ? "text-red-500" : "text-lime-600"
                }`}
              >
                {data && data[card.title] ? data[card.title].length : 0}
              </span>
              <br />
              {index === 0 ||
              index === 1 ||
              index === 2 ||
              index === 3 ||
              index === 4 ||
              index === 5
                ? "ครั้ง"
                : null}
            </h5>
          </div>
        ))}
      </div>
      <br />
      <h1 className="text-2xl text-center font-bold mt-10 mb-10 text-red-500">
        สรุปผลในแต่ละเดือน
      </h1>
      <div className="text-l">{renderTableData(data)}</div>
      <h1 className="text-2xl text-center font-bold mt-10 mb-10 text-red-500">
        กราฟแสดงผลรายปีและรายเดือน
      </h1>
      <div style={isMobile ? chartContainerStyleMobile : chartContainerStyle}>
        <div style={isMobile ? yearlyChartStyleMobile : yearlyChartStyle}>
          <canvas id="yearlyChart"></canvas>
        </div>
        <div style={isMobile ? monthlyChartStyleMobile : monthlyChartStyle}>
          <canvas id="monthlyChart"></canvas>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Year2020;
