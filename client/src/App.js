import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import PredictionPage from "./components/PredictionPage";
import YearDataPage from "./components/YearDataPage"; // Import YearDataPage component
import Year2023 from "./components/YearPage/Year2023";
import Year2022 from "./components/YearPage/Year2022";
import Year2021 from "./components/YearPage/Year2021";
import Year2020 from "./components/YearPage/Year2020";
import Year2019 from "./components/YearPage/Year2019";
import Year2018 from "./components/YearPage/Year2018";
import Year2017 from "./components/YearPage/Year2017";
import Year2016 from "./components/YearPage/Year2016";
import Year2015 from "./components/YearPage/Year2015";
import Year2014 from "./components/YearPage/Year2014";
import Year2013 from "./components/YearPage/Year2013";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/YearDataPage/*" element={<YearDataPage />} />
        <Route path="/YearPage/Year2023" element={<Year2023 />} />
        <Route path="/YearPage/Year2022" element={<Year2022 />} />
        <Route path="/YearPage/Year2021" element={<Year2021 />} />
        <Route path="/YearPage/Year2020" element={<Year2020 />} />
        <Route path="/YearPage/Year2019" element={<Year2019 />} />
        <Route path="/YearPage/Year2018" element={<Year2018 />} />
        <Route path="/YearPage/Year2017" element={<Year2017 />} />
        <Route path="/YearPage/Year2016" element={<Year2016 />} />
        <Route path="/YearPage/Year2015" element={<Year2015 />} />
        <Route path="/YearPage/Year2014" element={<Year2014 />} />
        <Route path="/YearPage/Year2013" element={<Year2013 />} />

        <Route path="/PredictionPage" element={<PredictionPage />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
