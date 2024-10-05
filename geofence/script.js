const geofences = [
    { latitude: 23.25, longitude: 85.26, radius: 1000 }, // Geofence 1
    { latitude: 23.30, longitude: 85.30, radius: 500 },  // Geofence 2
    { latitude: 23.20, longitude: 85.20, radius: 2000 }  // Geofence 3
];

document.getElementById("check-location").addEventListener("click", checkLocation);

function checkLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(checkGeofences, handleError, {
            enableHighAccuracy: true,
            maximumAge: 30000, // Accept cached position for 30 seconds
            timeout: 5000 // Timeout after 5 seconds
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function checkGeofences(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
    let insideGeofence = false;

    geofences.forEach((geofence) => {
        const distance = calculateDistance(userLat, userLng, geofence.latitude, geofence.longitude);
        
        if (distance <= geofence.radius) {
            insideGeofence = true;
            const message = `You are inside the geofenced area at (${geofence.latitude}, ${geofence.longitude})!`;
            showNotification(message);
        }
    });

    if (!insideGeofence) {
        showNotification("You are outside all geofenced areas.");
    }
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

function handleError(error) {
    console.error("Error getting location: ", error);
    showNotification("Error getting your location. Please check your settings.");
}

function showNotification(message) {
    document.getElementById("notification").innerText = message;
}
