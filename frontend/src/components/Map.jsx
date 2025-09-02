import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { FaMapMarkerAlt, FaPhone, FaClock, FaDirections, FaUser } from "react-icons/fa";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "24px",
  border: "2px solid rgba(217, 194, 123, 0.3)",
  overflow: "hidden"
};

// Salon location coordinates
const salonLocation = {
  lat: 29.22235,
  lng: 79.50632
};

const mapStyles = [
  {
    "featureType": "all",
    "elementType": "geometry",
    "stylers": [{"color": "#2d2d2d"}]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#D9C27B"}]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#000000"}, {"lightness": 13}]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#2d2d2d"}]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#D9C27B"}, {"lightness": 14}, {"weight": 1.4}]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{"color": "#404040"}]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{"color": "#2d2d2d"}, {"lightness": 5}]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#D9C27B"}, {"lightness": -5}]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#F4E4A6"}, {"lightness": 25}, {"weight": 0.2}]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{"color": "#555555"}, {"lightness": 8}]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{"color": "#404040"}, {"lightness": 16}]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{"color": "#2d2d2d"}, {"lightness": 9}]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#1a1a1a"}, {"lightness": 17}]
  }
];

const Map = () => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const customMarkerIcon = {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    fillColor: "#D9C27B",
    fillOpacity: 1,
    strokeColor: "#F4E4A6",
    strokeWeight: 2,
    scale: 2,
    anchor: { x: 12, y: 24 }
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${salonLocation.lat},${salonLocation.lng}&destination_place_id=ChIJdd4hrwug8EcRmSrV3Vo6llI`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-black via-[#23211b] to-[#181818] p-6 pb-20 border border-[#D9C27B]/20">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaMapMarkerAlt className="text-3xl text-[#D9C27B]" />
          <h2 className="text-3xl font-bold text-white">
            Find Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6]">Salon</span>
          </h2>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] mx-auto mb-4"></div>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Located in the heart of Haldwani - Easy to find with convenient parking
        </p>
      </div>

      {/* Map Container */}
      <div className="relative mb-6">
        <LoadScript googleMapsApiKey="AIzaSyA-FsvFe-EjYVmGNABxdYF4mTOxuv2DFgs">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={salonLocation}
            zoom={16}
            options={{
              styles: mapStyles,
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: false,
              scaleControl: true,
              streetViewControl: true,
              rotateControl: false,
              fullscreenControl: true,
              gestureHandling: 'cooperative',
              backgroundColor: '#2d2d2d'
            }}
          >
            <Marker 
              position={salonLocation} 
              icon={customMarkerIcon}
              onClick={() => setShowInfoWindow(true)}
            />
            
            {showInfoWindow && (
              <InfoWindow
                position={salonLocation}
                onCloseClick={() => setShowInfoWindow(false)}
              >
                <div className="bg-black/95 backdrop-blur-sm text-white p-4 rounded-lg border border-[#D9C27B]/30 min-w-[250px] shadow-xl">
                  <h3 className="text-xl font-bold text-[#D9C27B] mb-3 flex items-center gap-2">
                    ✂️ Me & Guys Unisex Salon
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#D9C27B]" />
                      Kaladhungi Road, Kusumkhera, Haldwani (263139)
                    </p>
                    <p className="flex items-center gap-2">
                      <FaPhone className="text-[#D9C27B]" />
                      +91 7997135893
                    </p>
                    <p className="flex items-center gap-2">
                      <FaClock className="text-[#D9C27B]" />
                      Mon - Sun: 9:00 AM - 9:00 PM
                    </p>
                    <p className="flex items-center gap-2">
                      <FaUser className="text-[#D9C27B]" />
                      Owner: Ansar Salmani
                    </p>
                  </div>
                  <button 
                    onClick={handleGetDirections}
                    className="mt-3 w-full bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-semibold py-2 px-4 rounded-lg hover:from-[#F4E4A6] hover:to-[#D9C27B] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaDirections />
                    Get Directions
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
        
        {/* Floating Action Buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button 
            onClick={handleGetDirections}
            className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black p-3 rounded-full shadow-lg hover:from-[#F4E4A6] hover:to-[#D9C27B] transition-all duration-300 hover:scale-110"
            title="Get Directions"
          >
            <FaDirections className="text-lg" />
          </button>
          <a 
            href="tel:+917997135893"
            className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black p-3 rounded-full shadow-lg hover:from-[#F4E4A6] hover:to-[#D9C27B] transition-all duration-300 hover:scale-110"
            title="Call Now"
          >
            <FaPhone className="text-lg" />
          </a>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/50 p-4 rounded-xl border border-[#D9C27B]/20 text-center hover:border-[#D9C27B]/40 transition-all duration-300">
          <FaMapMarkerAlt className="text-2xl text-[#D9C27B] mx-auto mb-2" />
          <h4 className="font-semibold text-white mb-1">Address</h4>
          <p className="text-sm text-gray-300">Kaladhungi Road, Kusumkhera</p>
          <p className="text-sm text-gray-400">Haldwani (263139)</p>
        </div>
        
        <div className="bg-black/50 p-4 rounded-xl border border-[#D9C27B]/20 text-center hover:border-[#D9C27B]/40 transition-all duration-300">
          <FaPhone className="text-2xl text-[#D9C27B] mx-auto mb-2" />
          <h4 className="font-semibold text-white mb-1">Contact</h4>
          <p className="text-sm text-gray-300">+91 7997135893</p>
          <p className="text-sm text-gray-400">Call us anytime</p>
        </div>
        
        <div className="bg-black/50 p-4 rounded-xl border border-[#D9C27B]/20 text-center hover:border-[#D9C27B]/40 transition-all duration-300">
          <FaClock className="text-2xl text-[#D9C27B] mx-auto mb-2" />
          <h4 className="font-semibold text-white mb-1">Hours</h4>
          <p className="text-sm text-gray-300">Mon - Sun</p>
          <p className="text-sm text-gray-400">9:00 AM - 9:00 PM</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <button 
          onClick={handleGetDirections}
          className="bg-gradient-to-r from-[#D9C27B] to-[#F4E4A6] text-black font-semibold py-3 px-8 rounded-full hover:from-[#F4E4A6] hover:to-[#D9C27B] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          <FaDirections />
          Get Directions
        </button>
        <a
          href="tel:+917997135893"
          className="border-2 border-[#D9C27B] text-[#D9C27B] font-semibold py-3 px-8 rounded-full hover:bg-[#D9C27B] hover:text-black transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <FaPhone />
          Call Now
        </a>
      </div>
    </div>
  );
};

export default Map;
