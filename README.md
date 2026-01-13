Project: Peculiar Sighting Tracker
A "Report a Sighting" Web Portal for the Paranormal and Magical

Project Overview
This project is a functional, immersive web application designed to allow users to report and archive unusual sightings, such as ghost encounters or escaped magical animals. The portal emphasizes thematic immersion, WCAG 2.2 accessibility, and resilient data handling within a static hosting environment.

Technology Stack
Frontend: HTML5, CSS3, JavaScript (ES6+).

Hosting: GitHub Pages (Static Hosting).

Data Persistence: Hybrid approach using JSON (Static Lore) and LocalStorage (User-generated content).

Asset Management: Background video and audio toggles optimized for browser autoplay policies.

Technical Architecture and Logic
1. Hybrid Data Management
Because GitHub Pages does not support server-side file writing, I implemented a Hybrid Data Layer:

Official Archives (reports.json): Acts as a read-only database for pre-existing official sightings.

Browser Persistence (LocalStorage): When a user submits a report, the data is stringified into JSON and stored in the browser's local memory.

Data Merging: The "View Archives" page runs an asynchronous script that fetches the static JSON file and merges it with the LocalStorage array, providing a seamless "live" experience for the user without requiring a paid backend.

2. Dynamic Form Behavior
The reporting form utilizes event listeners to monitor the "Sighting Category." Based on the user's selection, the "Specify Entity" dropdown dynamically updates its options (e.g., switching between a list of Ghost types and Magical Animal species), fulfilling the core requirement for Dynamic Form Behavior.

3. Audio and Video Implementation
To comply with strict browser security policies (like Safari's Autoplay restrictions), I implemented a manual Audio Toggle. This ensures the atmosphere is user-invoked, preventing the browser from blocking the site’s media elements.

Accessibility (WCAG 2.2 AA Compliance)
Special attention was given to ensure the portal is usable by all investigators:

Semantic HTML: Used proper label tags with "for" attributes linked to input IDs for screen reader compatibility.

Keyboard Navigation: Implemented custom focus rings with a cyan glow to ensure users navigating via the Tab key can clearly see their location.

Contrast and Legibility: Adjusted placeholder text opacity and container backgrounds to meet AA contrast ratios.

Interactive Safety: The custom "Glowing Orb" cursor uses "pointer-events: none" to ensure it never interferes with the clickability of form elements.

Creative Features (Big Picture)
Immersive UX: A custom JavaScript-driven cursor (Glowing Orb) with a sparkle trail that tracks mouse movement using clientX/Y coordinates for accuracy across different screen sizes.

Visual Feedback: The submission process includes state changes (disabling the button and changing text) to inform the user that their data is being transmitted to the archives.

Export Capability: A "Download for Excel" feature that converts LocalStorage data into a CSV format, demonstrating the ability to move data out of the browser.

How to Run Locally
Clone the repository.

Open the folder in a code editor (e.g., VS Code).

Use an extension like Live Server to host locally (this prevents CORS errors when fetching the reports.json file).

Navigate to index.html to begin reporting sightings.