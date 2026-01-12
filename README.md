📜 Peculiar Sighting Tracker
An immersive, full-stack reporting tool for the paranormal and mysterious.
🌌 Project Overview
This project was built to satisfy a creative brief for a "Report a Peculiar Sighting" website. It allows users to log encounters with ghosts, magical animals, and other-worldly phenomena. The design focuses on a "Fantasy/Middle-Earth" aesthetic while maintaining modern web standards for accessibility and responsiveness.

🛠️ Technology Choices
Frontend: Vanilla HTML5, CSS3, and JavaScript. I chose to avoid heavy frameworks (like React) to ensure the site loads instantly and feels lightweight, matching the "ancient archive" theme.

Styling: I implemented Glassmorphism (frosted glass effect) using backdrop-filter and custom CSS Gradients to create a cinematic, high-end feel.

Backend Strategy: The system uses a RESTful API approach. For the live demonstration on GitHub Pages, I implemented a Local Storage Fallback so that data persists even without a live database server.

🧪 Key Features & Implementation
Dynamic Form Logic: Using a custom JavaScript object mapping, the form's secondary options change instantly based on the "Sighting Category." This prevents user error and ensures data quality.

Mobile First: I used CSS Grid and Media Queries to ensure the 2-column desktop layout stacks perfectly into a 1-column mobile view for "on-the-go" reporting.

Cinematic UX: I added custom page transitions (pageReveal animations) and a specific "Middle-Earth" circular submit button to enhance the storytelling aspect of the site.

♿ Accessibility (WCAG 2.2 AA)
Accessibility was a core priority for this build:

Semantic HTML: Used proper <label>, <input>, and <nav> elements.

Screen Reader Friendly: Added aria-live="polite" to the status messages so users with visual impairments receive immediate feedback upon submission.

Color Contrast: All text colors were tested against the dark background to ensure they meet AA standards for readability.

🚀 How to Run Locally
Clone the repository: git clone [Your-Repo-Link]

Open index.html in any modern web browser.

To view the archives, click the "View Archives" link at the bottom of the form.

How to add this to GitHub:
Create a new file in your project folder called README.md.

Paste the text above into it.

Upload it to GitHub along with your .html, .css, and .js files.