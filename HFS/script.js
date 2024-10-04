const RADIUS = 2000; // Radius in meters (2 km)
let userLocation = null;

document.addEventListener('DOMContentLoaded', () => {
    const userLatitudeEl = document.getElementById('userLatitude');
    const userLongitudeEl = document.getElementById('userLongitude');
    const distressButton = document.getElementById('distressButton');
    const statusMessage = document.getElementById('statusMessage');

    // Check for notification support
    if ('Notification' in window) {
        Notification.requestPermission();
    }

    // Get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            userLatitudeEl.textContent = `Latitude: ${userLocation.latitude}`;
            userLongitudeEl.textContent = `Longitude: ${userLocation.longitude}`;
            statusMessage.textContent = '';

            // Bind the distress signal button click event
            distressButton.addEventListener('click', sendDistressSignal);
        }, () => {
            statusMessage.textContent = 'Unable to retrieve your location.';
        });
    } else {
        statusMessage.textContent = 'Geolocation is not supported by this browser.';
    }

    const sendDistressSignal = () => {
        // Simulate sending a distress signal to nearby users
        alert('Distress signal sent!');

        // Notify nearby users
        notifyNearbyUsers();
    };

    const notifyNearbyUsers = () => {
        // Simulating nearby users receiving the distress signal
        const nearbyUsers = getNearbyUsers(); // You'd replace this with actual logic
        nearbyUsers.forEach(user => {
            if (user) {
                const distance = getDistanceFromLatLonInMeters(
                    userLocation.latitude,
                    userLocation.longitude,
                    user.latitude,
                    user.longitude
                );
                if (distance <= RADIUS) {
                    sendNotification(user);
                }
            }
        });
    };

    const getNearbyUsers = () => {
        // Dummy data for nearby users. In a real application, you'd get this from a database.
        return [
            { latitude: 37.7750, longitude: -122.4195 }, // Within 2 km
            { latitude: 37.8000, longitude: -122.4500 }, // Outside 2 km
            { latitude: 37.7800, longitude: -122.4300 }  // Within 2 km
        ];
    };

    const sendNotification = (user) => {
        if (Notification.permission === 'granted') {
            new Notification('Distress Signal Alert!', {
                body: 'A nearby user is in distress!',
            });
        }
    };

    const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
        const R = 6371000; // Radius of the Earth in meters
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in meters
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };
});
