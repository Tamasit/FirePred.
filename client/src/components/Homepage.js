import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios

function Homepage() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
  };

  const smallBoxContainer = {
    display: "flex",
    flexDirection: "column", // Display small boxes from top to bottom on mobile
    alignItems: "center", // Center small boxes horizontally
    justifyContent: "center", // Center small boxes vertically
    width: "100%", // Adjusted to fit the screen width
    margin: "0 auto",
  };

  const smallBoxStyle = {
    width: "60%", // Adjusted to fit the screen width
    height: "200px", // You can adjust the height as needed
    backgroundColor: "#E9EDDE",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    margin: "0 0 20px 0", // Added margin for spacing between small boxes
    position: "relative", // Add position relative to each small box
  };

  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    // Fetch the image from the backend
    axios
      .get("/images/pic1.jpg")
      .then((response) => {
        // Set the image URL in state
        setImageURL(response.config.url);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        console.log("Server response:", error.response);
      });
  }, []);

  const bigBoxStyle = {
    position: "relative",
    width: "100%",
    height: "500px",
    backgroundColor: "#E9EDDE",
    border: "1px solid #ccc",
    padding: "25px", // Adjusted padding for mobile screens
    marginBottom: "20px",
    backgroundImage: imageURL ? `url(${imageURL})` : "",
    backgroundSize: "cover",
    backgroundPosition: "center 60%",
    display: "flex",
    justifyContent: "center",
    textAlign: "start",
    color: "#fff",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const overlayStyle = {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  };

  const smallBoxTextStyle = {
    position: "relative",
    zIndex: 2, // Place the text above the overlay
    textAlign: "center",
    color: "#fff", // Change the text color to white
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add a text shadow for better contrast
  };

  const imageOverlayStyle = {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent overlay color
    zIndex: 1,
    borderRadius: "10px",
  };

  // Media query for larger screens
  const mediaQuery = `@media (min-width: 768px) {
    .bigBoxTextStyle h1,
    .bigBoxTextStyle h2,
    .bigBoxTextStyle h3,
    .bigBoxTextStyle h4,
    .bigBoxTextStyle h5,
    .bigBoxTextStyle h6 {
      padding-left: 250px; // Padding for larger screens
    }

    .smallBoxStyle {
      width: 30%;
      margin-right: 10px;
      margin-bottom: 20px;
    }
  }`;

  const modisImageStyle = {
    backgroundImage: 'url("/images/modis.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const tempImageStyle = {
    backgroundImage: 'url("/images/temp.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const rainfallImageStyle = {
    backgroundImage: 'url("/images/rainfall.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div style={containerStyle}>
      <style>{mediaQuery}</style>

      <div
        style={bigBoxStyle}
        className="flex flex-col justify-center items-start bigBoxTextStyle"
      >
        <div style={{ ...overlayStyle }}></div>
        <div>
          <h1 className="font-light text-5xl">WILDLAND</h1>
          <h1 className="font-light text-3xl">and</h1>
          <h1 className="font-light text-5xl">FOREST FIRE</h1>
          <h1 className="font-light text-5xl">PREDICTION</h1>
          <h1 className="font-light text-3xl">using</h1>
          <h1 className="font-light text-5xl">SATELLITE DATA</h1>
        </div>
      </div>

      <div>
        <br></br>
        <br></br>
        <h1 className="text-2xl font-bold">ข้อมูลที่นำมาใช้มีอะไรบ้าง ?</h1>
        <br></br>
        <br></br>
      </div>

      <div style={smallBoxContainer}>
        <div
          style={{ ...smallBoxStyle, ...modisImageStyle }}
          className="flex flex-col justify-center items-center"
        >
          <div style={{ ...imageOverlayStyle }}></div>
          <h1 style={smallBoxTextStyle} className="text-xl">
            ข้อมูลดาวเทียม MODIS ในประเทศไทย
          </h1>
          <h1 style={smallBoxTextStyle} className="text-l">
            (Moderate Resolution Imaging Spectroradiometer)
          </h1>
        </div>
        <div
          style={{ ...smallBoxStyle, ...tempImageStyle }}
          className="flex flex-col justify-center items-center"
        >
          <div style={{ ...imageOverlayStyle }}></div>
          <h1 style={smallBoxTextStyle} className="text-xl">
            ข้อมูลความชื้นและอุณหภูมิ
          </h1>
          <h1 style={smallBoxTextStyle} className="text-l">
            (Humidity and Temperature Information)
          </h1>
        </div>
        <div
          style={{ ...smallBoxStyle, ...rainfallImageStyle }}
          className="flex flex-col justify-center items-center"
        >
          <div style={{ ...imageOverlayStyle }}></div>
          <h1 style={smallBoxTextStyle} className="text-xl">
            ข้อมูลปริมาณน้ำฝน
          </h1>
          <h1 style={smallBoxTextStyle} className="text-l">
            (Rainfall Information)
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
