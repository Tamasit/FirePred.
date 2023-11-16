import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Province from "./data/Province";
import Papa from "papaparse";

const PredictionPage = () => {
  const cardData = [
    { title: "ภาคเหนือ" },
    { title: "ภาคตะวันออกเฉียงเหนือ" },
    { title: "ภาคกลาง" },
    { title: "ภาคตะวันออก" },
    { title: "ภาคตะวันตก" },
    { title: "ภาคใต้" },
  ];

  const cardStyle = {
    marginBottom: "10px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
    transition: "transform 0.2s ease-in-out",
    ":hover": {
      transform: "scale(1.05)",
    },
    height: "100px",
    width: "190px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginRight: "0",
    cursor: "pointer",
  };

  const mapStyle = {
    borderRadius: "8px",
    overflow: "hidden",
    width: "550px",
    height: "750px",
  };

  const calculateTableWidth = () => {
    const columnCount = [
      "latitude",
      "longitude",
      "datetime",
      "temperature",
      "humidity",
      "rain",
      "new_latitude",
      "new_longitude",
      "final_date",
    ].length;

    return columnCount * 120; // Adjust the multiplier as needed
  };

  const tableStyle = {
    width: `${calculateTableWidth()}px`,
    borderCollapse: "collapse",
    margin: "0 auto", // Center the table horizontally
    marginTop: "20px",
  };

  const thailandCenter = [13.2, 101];

  const [data, setData] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedRegionData, setSelectedRegionData] = useState(null);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const file = process.env.PUBLIC_URL + "/data/processedPrediction.csv";
    const res = await fetch(file);
    const text = await res.text();
    const parsedData = Papa.parse(text, { header: true }).data;

    setJsonData(parsedData);
    setData(groupDataByRegion(parsedData));
  };

  const groupDataByRegion = (allData) => {
    const regionData = {};

    cardData.forEach((card) => {
      const region = card.title;
      regionData[region] = allData.filter((item) =>
        isPointInRegion(item, region)
      );
    });

    return regionData;
  };

  const isPointInRegion = (point, region) => {
    switch (region) {
      case "ภาคเหนือ":
        return isPointInBounds(point, NorthernThailandBounds);
      case "ภาคตะวันออกเฉียงเหนือ":
        return isPointInBounds(point, NortheastThailandBounds);
      case "ภาคกลาง":
        return isPointInBounds(point, CenterThailandBounds);
      case "ภาคตะวันออก":
        return isPointInBounds(point, EasternThailandBounds);
      case "ภาคตะวันตก":
        return isPointInBounds(point, WesternThailandBounds);
      case "ภาคใต้":
        return isPointInBounds(point, SouthernThailandBounds);
      default:
        return false;
    }
  };

  const isPointInBounds = (point, bounds) => {
    const [minLat, minLng] = bounds[0];
    const [maxLat, maxLng] = bounds[1];

    return (
      point.new_latitude >= minLat &&
      point.new_latitude <= maxLat &&
      point.new_longitude >= minLng &&
      point.new_longitude <= maxLng
    );
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    const regionData = filterDataByRegion(jsonData, region);
    setSelectedRegionData(regionData);
  };

  const filterDataByRegion = (allData, region) => {
    return allData.filter((item) => isPointInRegion(item, region));
  };

  useEffect(() => {
    createFeatures();
  }, [selectedRegionData]);

  const createFeatures = () => {
    if (!selectedRegionData) return;

    const newFeatures = {
      type: "FeatureCollection",
      features: selectedRegionData.map((point, index) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(point.new_longitude),
            parseFloat(point.new_latitude),
          ],
        },
        properties: {
          id: index,
          title: point.title,
        },
      })),
    };

    setFeatures(newFeatures);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mt-4 mb-2 sm:mt-6 sm:mb-4 md:mt-8 md:mb-6 lg:mt-10 xl:mt-12 text-center">
        <span className="text-blue-700">การคาดการณ์การเกิดไฟ</span>
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center", // Center content horizontally
          gap: "20px",
        }}
      >
        {/* Left side - Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {cardData.map((card, index) => (
            <div
              key={index}
              style={{
                ...cardStyle,
                backgroundColor:
                  selectedRegion === card.title ? "#f0f0f0" : "#fff",
              }}
              onClick={() => handleRegionClick(card.title)}
            >
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

        {/* Map */}
        <div
          style={{ ...mapStyle }}
          className="rounded-lg overflow-hidden shadow-md"
        >
          <MapContainer
            style={{ width: "100%", height: "100%" }}
            center={thailandCenter}
            zoom={6}
            zoomControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Province selectedRegionData={selectedRegionData} />
          </MapContainer>
        </div>
      </div>

      {/* Table */}
      <div>
        <h1 className="text-2xl font-bold mt-4 mb-2 text-center">สรุป</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              {[
                "latitude",
                "longitude",
                "datetime",
                "temperature",
                "humidity",
                "rain",
                "new_latitude",
                "new_longitude",
                "final_date",
              ].map((columnName, index) => (
                <th
                  key={index}
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  {columnName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedRegionData &&
              selectedRegionData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {[
                    "latitude",
                    "longitude",
                    "datetime",
                    "temperature",
                    "humidity",
                    "rain",
                    "new_latitude",
                    "new_longitude",
                    "final_date",
                  ].map((columnName, columnIndex) => (
                    <td
                      key={columnIndex}
                      style={{ border: "1px solid #ddd", padding: "8px" }}
                    >
                      {row[columnName]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <br />
    </div>
  );
};

export default PredictionPage;

const NorthernThailandBounds = [
  [14.9833, 97.3438], // Southernmost latitude, westernmost longitude
  [21.5704, 100.0911], // Northernmost latitude, easternmost longitude
];

const NortheastThailandBounds = [
  [13.0914, 101.6516], // Southernmost latitude, westernmost longitude
  [17.6018, 105.9139], // Northernmost latitude, easternmost longitude
];

const CenterThailandBounds = [
  [12.141025, 99.693323], // Southernmost latitude, westernmost longitude
  [14.657835, 102.525032], // Northernmost latitude, easternmost longitude
];

const WesternThailandBounds = [
  [12.6348, 98.2867], // Southernmost latitude, westernmost longitude
  [18.144, 99.8604], // Northernmost latitude, easternmost longitude
];

const EasternThailandBounds = [
  [11.6667, 101.1154], // Southernmost latitude, westernmost longitude
  [14.9833, 104.2857], // Northernmost latitude, easternmost longitude
];

const SouthernThailandBounds = [
  [5.6129, 98.0586], // Southernmost latitude, westernmost longitude
  [8.0875, 101.4152], // Northernmost latitude, easternmost longitude
];
