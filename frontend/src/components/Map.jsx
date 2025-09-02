import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
};

// Replace with your salon's latitude & longitude
const salonLocation = {
  lat: 29.22235,  // Example: Delhi
  lng: 79.50632
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyA-FsvFe-EjYVmGNABxdYF4mTOxuv2DFgs">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={salonLocation}
        zoom={15}
      >
        {/* Marker at Salon Location */}
        <Marker position={salonLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
