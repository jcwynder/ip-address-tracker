# IP Address Tracker

This is a solution to the IP Address Tracker challenge on Frontend Mentor. Users can search for any IP address or domain and see key information about it, along with its location on an interactive map. When the page loads, it automatically displays information for the user's current IP address.

## Table of Contents

- [IP Address Tracker](#ip-address-tracker)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [The Challenge](#the-challenge)
    - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Usage](#usage)
  - [Reflection](#reflection)
  - [Acknowledgments](#acknowledgments)

## Overview

### The Challenge

The goal of this challenge was to build an IP address tracker that displays geolocation information for a given IP address or domain. This involved integrating with a free IP geolocation API and an interactive mapping library (Leaflet.js) to visualize the location.

### Features

- **IP/Domain Search:** Users can enter an IP address or a domain name to get its geolocation data.
- **Auto-detect User's IP:** On initial page load, the application automatically detects and displays the user's current IP address and location.
- **Geolocation Details:** Displays the IP Address, Location (City, Region, Country, Zip), Timezone, and ISP.
- **Interactive Map:** Shows the precise location of the IP address on a Leaflet map with a marker.
- **Responsive Design:** The layout adapts seamlessly to different screen sizes, from mobile devices to desktop.

## Technologies Used

- **HTML5:** For structuring the content.
- **CSS3:** For styling and responsive design.
- **JavaScript (ES6+):** For fetching data, dynamic content updates, and map interactions.
- **IP-API.com:** A free, no-key-required API for IP geolocation data.
- **Leaflet.js:** A lightweight, open-source JavaScript library for mobile-friendly interactive maps.

## Usage

1.  Upon opening `index.html`, the application will automatically fetch and display details for your current IP address.
2.  To search for a different IP address or domain, type it into the input field at the top of the page.
3.  Click the arrow button or press `Enter` to initiate the search.
4.  The information panel and the map will update with the new geolocation data.

## Reflection

My development process for this IP Address Tracker began with setting up the foundational HTML structure, establishing the core layout, and linking essential external libraries like Google Fonts and Leaflet. I then moved on to the CSS, where the primary challenge was achieving a responsive design that looked good across various screen sizes, especially the overlapping info panel. Getting the `position: absolute`, `bottom`, and `transform` properties just right for the info panel's integration with the header was an iterative process, requiring careful adjustments to padding and margins in both the general and media query styles.

The JavaScript implementation involved integrating with the `IP-API.com` service. A key challenge here was handling both initial page load (to detect the user's IP) and subsequent user searches. I implemented asynchronous `fetch` requests to get the geolocation data and used `async/await` for cleaner code. Integrating Leaflet.js was straightforward initially, but ensuring the map dynamically updated its view and marker position every time a new IP was searched required careful management of the `map` and `marker` instances to avoid creating multiple map objects or markers. I also had to update the JavaScript selectors to match the refined CSS class names, like switching from `search-bar` to `search-form` and `ip-address-input` to `ip-input`, which was a small but necessary synchronization task.

Potential improvements could include adding more robust input validation for IP addresses and domains, implementing a loading state indicator for when data is being fetched, and providing more custom, user-friendly modals for error messages instead of `alert()` calls. Further accessibility enhancements for keyboard navigation and screen reader support would also be valuable.

## Acknowledgments

- **Frontend Mentor:** For providing this engaging challenge.
- **IP-API.com:** For their free and easy-to-use IP geolocation API.
- **Leaflet.js:** For the fantastic open-source mapping library.
- **Google Fonts:** For the Rubik typeface.
