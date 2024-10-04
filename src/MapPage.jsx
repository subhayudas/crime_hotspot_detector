

import React, { useEffect } from 'react';

const MapPage = () => {
  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {
    const centerLocation = { lat: 37.7749, lng: -122.4194 }; 
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: centerLocation,
    });

    new window.google.maps.Marker({
      position: centerLocation,
      map: map,
      title: 'Crime Hotspot',
    });
  };

  return (
    <div>
      <h2>Crime Hotspot Map</h2>
      <div id="map" style={{ height: '80vh', width: '100%' }}></div>
    </div>
  );
};

export default MapPage;
