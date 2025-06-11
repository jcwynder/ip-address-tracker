const ipAddressInput = document.getElementById("ip-address-input");
const searchButton = document.getElementById("search-button");
const ipAddressValue = document.getElementById("ip-address-value");
const locationValue = document.getElementById("location-value");
const timezoneValue = document.getElementById("timezone-value");
const ispValue = document.getElementById("isp-value");
const mapElement = document.getElementById("map");

// No API_KEY needed for basic GeoJS usage!

let map = null; // Initialize map variable globally
let marker = null; // Initialize marker variable globally

// Function to initialize or update the map
function initializeMap(lat, lng) {
  if (map === null) {
    map = L.map(mapElement).setView([lat, lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  } else {
    map.setView([lat, lng], 13);
  }

  if (marker !== null) {
    map.removeLayer(marker);
  }

  marker = L.marker([lat, lng]).addTo(map);
}

// Function to fetch IP data using GeoJS
async function fetchIpData(ip = "") {
  // GeoJS endpoint for IP geolocation
  // If no IP is provided, it defaults to the client's IP
  const url = ip
    ? `https://get.geojs.io/v1/ip/geo/${ip}.json`
    : "https://get.geojs.io/v1/ip/geo.json";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // GeoJS might return a 404 or other status if IP is invalid
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // GeoJS doesn't typically have a 'fail' status like ip-api or 'code' like ipify
    // An error would usually be indicated by a non-200 HTTP status code,
    // which is handled by response.ok check above.
    // We'll also check if basic location data is present.
    if (!data.latitude || !data.longitude) {
      alert("Could not find location data for the provided IP/domain.");
      return;
    }

    updateInfo(data);
    initializeMap(parseFloat(data.latitude), parseFloat(data.longitude)); // GeoJS gives strings, convert to float
  } catch (error) {
    console.error("Error fetching IP data:", error);
    alert(
      "Failed to fetch IP data. Please check your input or try again later. (Error details in console)"
    );
  }
}

// Function to update the information display based on GeoJS response structure
function updateInfo(data) {
  ipAddressValue.textContent = data.ip || "N/A";
  locationValue.textContent = `${data.city || "N/A"}, ${data.region || "N/A"} ${
    data.postal_code || ""
  }, ${data.country || "N/A"}`;
  timezoneValue.textContent = `UTC ${data.timezone || "N/A"}`; // GeoJS gives timezone directly
  ispValue.textContent = data.organization || "N/A"; // GeoJS uses 'organization' for ISP
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const ipOrDomain = ipAddressInput.value.trim();
  fetchIpData(ipOrDomain);
});

// Event listener for "Enter" key in the input field
ipAddressInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const ipOrDomain = ipAddressInput.value.trim();
    fetchIpData(ipOrDomain);
  }
});

// Fetch user's IP on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchIpData(); // No argument means it will fetch the user's current IP
});
