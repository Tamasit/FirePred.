import React from "react";
import { GeoJSON } from "react-leaflet";
import data from "../data/province.json";

const Province = () => {
  const geoStyle = (feature) => {
    const region = feature.properties.REGION6;
    if (region == "ภาคกลาง") {
      return {
        weight: 1,
        color: "red",
        fillColor: "red",
        fillOpacity: 0.3,
      };
    } else if (region == "ภาคตะวันออกเฉียงเหนือ") {
      return {
        weight: 1,
        color: "green",
        fillColor: "green",
        fillOpacity: 0.3,
      };
    } else if (region == "ภาคเหนือ") {
      return {
        weight: 1,
        color: "yellow",
        fillColor: "yellow",
        fillOpacity: 0.3,
      };
    } else {
      return {
        weight: 1,
      };
    }
  };

  const handleClickFeature = (event) => {
    const layer = event.target;
    const prop = event.target.feature.properties;

    let popupContent = "";

    for (const [key, val] of Object.entries(prop)) {
      let roitaiImage = "https://media.timeout.com/images/105240236/image.jpg";

      if (key == "REGION6") {
        popupContent +=
          "<img style='max-width:100%' src='" + roitaiImage + "'/>";
      } else {
        popupContent += "<b>" + key + "</b>" + ": " + val + "<br />";
      }
    }

    layer.bindPopup(popupContent);
  };

  const handleEachFeature = (feature, layer) => {
    layer.bindTooltip(feature.properties.ADM1_TH, {
      direction: "right",
    });
    layer.on({
      click: handleClickFeature,
    });
  };

  return (
    data && (
      <GeoJSON data={data} style={geoStyle} onEachFeature={handleEachFeature} />
    )
  );
};

export default Province;
