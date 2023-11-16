import React from "react";
import { GeoJSON, Marker } from "react-leaflet";
import data from "../data/ProvinceData.json";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [12, 20], // Adjusted size
  iconAnchor: [6, 10], // Adjusted anchor point
});
L.Marker.prototype.options.icon = DefaultIcon;

const Province = ({ selectedRegionData }) => {
  const style = {
    color: "#2874A6", // Border color
    weight: 3, // Border width
    fillOpacity: 0.1, // Fill opacity
  };

  return (
    <>
      {data && <GeoJSON data={data} key={JSON.stringify(data)} style={style} />}
      {selectedRegionData &&
        selectedRegionData.map((item, index) => {
          return (
            <Marker
              key={index}
              position={[
                parseFloat(item.new_latitude),
                parseFloat(item.new_longitude),
              ]}
            ></Marker>
          );
        })}
    </>
  );
};

export default Province;
