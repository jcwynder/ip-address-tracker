const ipAddressInput = document.getElementById("ip-address-input");
const searchButton = document.getElementById("search-button");
const ipAddressValue = document.getElementById("ip-address-value");
const locationValue = document.getElementById("location-value");
const timezoneValue = document.getElementById("timezone-value");
const ispValue = document.getElementById("isp-value");
const mapElement = document.getElementById("map");

let map = null; // Initialize map variable globally
let marker = null; // Initialize marker variable globally

// Function to initialize or update the map
function initializeMap(lat, lng) {
  if (map === null) {
    // Initialize the map if it doesn't exist
    map = L.map(mapElement).setView([lat, lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  } else {
    // Just set the new view if the map already exists
    map.setView([lat, lng], 13);
  }

  // Clear existing marker if any
  if (marker !== null) {
    map.removeLayer(marker);
  }

  // Add new marker
  marker = L.marker([lat, lng]).addTo(map);
}

// Function to fetch IP data
async function fetchIpData(ip = "") {
  const url = ip ? `https://ip-api.com/json/${ip}` : "http://ip-api.com/json/";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.status === "fail") {
      alert(`Error: ${data.message || "Could not find IP information."}`);
      return;
    }

    updateInfo(data);
    initializeMap(data.lat, data.lon);
  } catch (error) {
    console.error("Error fetching IP data:", error);
    alert(
      "Failed to fetch IP data. Please check your input or try again later."
    );
  }
}

// Function to update the information display
function updateInfo(data) {
  ipAddressValue.textContent = data.query || "N/A";
  locationValue.textContent = `${data.city || "N/A"}, ${
    data.regionName || "N/A"
  } ${data.zip || ""}, ${data.country || "N/A"}`;
  timezoneValue.textContent = `UTC ${data.timezone || "N/A"}`;
  ispValue.textContent = data.isp || "N/A";
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const ipOrDomain = ipAddressInput.value.trim();
  fetchIpData(ipOrDomain);
});

// Event listener for "Enter" key in the input field
ipAddressInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const ipOrDomain = ipAddressInput.value.trim();
    fetchIpData(ipOrDomain);
  }
});

// Fetch user's IP on page load
fetchIpData(); // No argument means it will fetch the user's current IP
