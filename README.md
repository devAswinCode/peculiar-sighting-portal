# 🛸 Peculiar Sighting Portal

A fictional reporting system for unusual and mysterious events.

Live Site: https://devaswincode.github.io/peculiar-sighting-portal/  
Source Code: https://github.com/devAswinCode/peculiar-sighting-portal

---

## Project Overview

The Peculiar Sighting Portal is a creative web application developed in response to Torbay Council’s “Report a Peculiar Sighting” technical brief.

The site allows users to report unusual or paranormal events such as ghost sightings or missing magical creatures through a clear, accessible, and engaging interface. While the theme is playful, the implementation focuses on strong fundamentals in front-end development, accessibility, dynamic form logic, and clear documentation.

This project demonstrates:
- Dynamic form behaviour using JavaScript
- Accessible and responsive UI design
- Thoughtful technical decision-making
- Scalable architecture despite static hosting constraints

---

## Objectives 

This project was designed to meet the following objectives

- Build a functional website for reporting unusual sightings
- Provide a clear reporting form with required fields
- Implement dynamic dropdown behaviour
- Apply CSS styling and imagery
- Aim for WCAG 2.2 AA accessibility compliance
- Ensure responsiveness on desktop and mobile
- Provide clear documentation explaining technical choices

---

## Technology Stack & Architecture

### Front-End
- HTML5 with semantic elements (header, main, section, form, label)
- CSS3 for layout, styling, and responsiveness
- Vanilla JavaScript (ES6+) for interactivity and logic

### Data Storage Strategy
Because GitHub Pages does not support server-side code or databases, a hybrid client-side storage approach was used:

- reports.json  
  Used for initial static data and example reports
- Browser LocalStorage  
  Used to persist user-submitted reports on the client device

This approach satisfies the brief requirement to either implement or document a data-handling solution while remaining fully functional on free hosting.
*A lightweight Node.js/Express backend was also implemented locally to demonstrate how the same front-end could persist data to a server-side JSON file if required.*

---

## Reporting Feature

### Captured Fields
The reporting form captures all required fields from the brief:
- Name
- Contact details (optional)
- What has been sighted
- Date and time
- Location
- Description (optional)

### Dynamic Form Behaviour
JavaScript is used to dynamically update the form based on the selected sighting type:
- Selecting “Ghost Sighting” displays a list of ghost types
- Selecting “Escaped Magical Animal” displays a list of magical animals

This improves usability, keeps the interface clean, and ensures accurate data entry.

---

## Viewing Submitted Reports

An additional page allows users to view previously submitted sightings. Reports are displayed in a readable format and loaded dynamically from stored data.

This supports the optional user story of browsing previous reports to see what unusual activity has occurred.

---

## Design & User Experience

- Dark, atmospheric colour scheme to match the paranormal theme
- Background imagery for added immersion
- Clear typography and spacing for readability
- Styled buttons and form elements for usability

### Responsiveness
- Layout adapts to desktop, tablet, and mobile screens
- Form remains fully usable on small devices
- Supports reporting sightings while on the go

---

## Accessibility (WCAG 2.2 AA Considerations)

Accessibility was considered throughout development:

- Semantic HTML for screen readers
- High colour contrast for text and controls
- ARIA live region for form submission feedback
- Keyboard navigation support with visible focus states
- Alt text provided where applicable

These measures help ensure the site is usable by users with visual or motor impairments.

---

## Challenges & Solutions

### Challenge 1: No Server-Side Storage on GitHub Pages
GitHub Pages does not allow writing to files or databases.

Solution:  
User submissions are stored using the browser’s LocalStorage API. The code is structured so this logic can later be replaced with a real backend or database without changing the front-end.

---

### Challenge 2: Dynamic Behaviour Without Frameworks
Dynamic form behaviour needed to be implemented without using frameworks like React.

Solution:  
A simple JavaScript mapping object and DOM update logic were used, keeping the code lightweight, readable, and easy to maintain.

---

### Challenge 3: Mobile Compatibility
Certain interactive effects behave differently on touch devices.

Solution:  
The layout and interactions were designed to work without relying on mouse-specific behaviour, ensuring usability on mobile devices.

---

## Big Picture & Future Scalability

The project is designed with future expansion in mind:

- Replace LocalStorage with a REST API or database (Node.js, Firebase, Supabase)
- Use browser geolocation to auto-fill the location field
- Allow users to upload images as evidence
- Add moderation or admin review functionality

---

## Testing

The application was tested on:
- Desktop browsers (Chrome, Firefox, Safari)
- Mobile screen sizes using responsive design tools , also tested on both Android(Chrome) and IOS(Apple Safari) Browsers.


Verified functionality includes:
- Dynamic dropdown behaviour
- Form validation and submission
- Persistent storage using LocalStorage
- Keyboard navigation and accessibility flow

---

## Running the Project Locally

Clone the repository:

git clone https://github.com/devAswinCode/peculiar-sighting-portal.git  
cd peculiar-sighting-portal

Open index.html directly in a browser or use a local development server.

---

## Evaluation Criteria Self-Assessment

Functionality: Dynamic form, data capture, report viewing implemented  
Design & UX: Clear layout, themed styling, responsive design  
Accessibility: Semantic HTML, contrast, keyboard support  
Big Picture: Scalable architecture and future roadmap  
Code Quality: Clean, readable, maintainable JavaScript  
Documentation: Clear explanation of technology choices and logic

---

---

## Conclusion

This project demonstrates:
- Strong frontend fundamentals
- Thoughtful UX and accessibility design
- Clear architectural decision-making
- Awareness of real-world scalability requirements

The Peculiar Sighting Portal is designed to be simple, effective, and easily extendable.

---


## Author

Aswin Shaji  
Apprentice Software Developer Candidate  
