# 🌍 Travel Buddy - Ultimate Destination Planner

A dynamic, multi-page website built with HTML, CSS, and JavaScript, designed to offer users instant travel recommendations based on keywords like "beach," "temple," or specific countries.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Website-brightgreen.svg)](https://muskan-akram.github.io/travel-agency-website/)

## ✨ Features

This project fulfills all ten technical tasks required, providing a robust and interactive user experience across multiple pages.

### 💻 Core Structure & Design (Task 1, 3)
* **HTML Template:** Basic `<html>`, `<head>`, and `<body>` structure with a custom website title (`<title>Travel Buddy...`).
* **Home Page Design:** Features a full-screen background image (`holiday.jpg`), a large hero text, and a compelling introduction box.
* **Social Media Icons:** Includes links to social platforms using Font Awesome icons.

### 🧭 Navigation & Search (Task 2, 4, 5, 9)
* **Navigation Bar:** A fixed navigation bar containing links for Home, About Us, and Contact Us.
* **Page Routing:** Custom JavaScript logic to seamlessly switch between the **Home**, **About Us**, and **Contact Us** views without a full page reload.
* **Contextual Navbar:** The search bar and buttons are correctly displayed only on the Home page (Task 2) and hidden on the About Us and Contact Us pages (Task 4).
* **Clear Button (Task 9):** Functional "Reset" button to clear search input and remove all displayed recommendations.

### 🔍 Recommendation Logic (Task 6, 7, 8)
* **Data Fetching (Task 6):** Uses the `fetch()` API method to read travel recommendation data from the local `travel_recommendation_api.json` file.
* **Keyword Matching (Task 7):** JavaScript is implemented to handle multiple search variations and case-insensitivity:
    * Accepts keywords like `beach`, `beaches`, `BEACH`, or `Beach`.
    * Accepts keywords for `temple` and `country` (and specific country names like `Japan`).
    * Uses `toLowerCase()` for reliable matching.
* **Dynamic Results Display (Task 8):** Renders dynamic cards below the hero section on search, displaying:
    * At least two recommendations per keyword (e.g., two beaches, two temples, two cities).
    * An image (`imageUrl`).
    * A descriptive text (`description`).

### 📄 Utility Pages (Task 4, 5)
* **About Us (Task 4):** Includes company information and an introduction to team members (name and role).
* **Contact Us (Task 5):** Features a user contact form with input fields for **Name**, **Email**, and a `<textarea>` for the **Message**, along with a **Submit** button.

### ⏰ Optional Feature (Task 10)
* **Country Date and Time:** Logic is implemented using the `Date().toLocaleTimeString()` method to display the local time for recommended places when a `timeZone` property is available in the JSON data.

## 🛠️ Technologies Used

* **HTML5:** Structure and content.
* **CSS3:** Styling, custom layouts, and responsive design.
* **JavaScript (ES6+):** All recommendation, search, navigation, and time-zone logic.
* **Fetch API:** For loading the external JSON data (`travel_recommendation_api.json`).
* **Font Awesome:** For social media icons.

## 🚀 Setup and Installation

To view and run this project locally, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/muskan-akram/travel-agency-website.git](https://github.com/muskan-akram/travel-agency-website.git)
    cd travel-agency-website
    ```
2.  **Ensure Data File Exists:** Make sure the following files are present in the root directory:
    * `travel_recommendation.html`
    * `travel_recommendation_api.json` (containing the data structure provided)
    * *(Note: Placeholder image files like `holiday.jpg` or `enter_your_image.jpg` are referenced, but the site will function correctly with broken image icons if these files are missing.)*
3.  **Open the File:** Open `travel_recommendation.html` directly in your web browser.

## ✍️ Author

This project was developed by:

**Muskan Akram**
