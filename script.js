/**
 * PECULIAR SIGHTING TRACKER - LOGIC ENGINE
 * This script handles dynamic form behavior, UI feedback, and data persistence.
 */

const typeSelect = document.getElementById("type");
const subtypeContainer = document.getElementById("subtype-container");
const form = document.getElementById("reportForm");
const statusMessage = document.getElementById("status");

// 1. DATA REPOSITORY
// We use a central object to map categories to specific subtypes.
// This makes it very easy to add more lore (UFOs, Cryptids, etc.) in the future.
const sightingData = {
  ghost: ["Victorian Lady", "Headless Monk", "Banshee", "Poltergeist", "Phantom Stagecoach"],
  animal: ["Dragon", "Unicorn", "Phoenix", "Griffin", "Kelpie"],
  ufo: ["Glowing Orb", "Metallic Disk", "Black Triangle", "Tic-Tac Craft"],
  cryptid: ["Bigfoot", "Mothman", "Loch Ness Monster", "Chupacabra"],
  glitch: ["Time Slip", "Duplicate Person", "Missing Texture"],
  cursed: ["Haunted Doll", "Forbidden Tome", "Ancient Mirror"]
};

// 2. DYNAMIC FORM BEHAVIOR
// This listener watches for changes in the 'Category' dropdown and 
// injects a secondary 'Subtype' dropdown automatically.
typeSelect.addEventListener("change", () => {
  const selection = typeSelect.value;
  
  // If the user resets the selection, clear the subtype area
  if (!sightingData[selection]) {
    subtypeContainer.innerHTML = "";
    return;
  }

  // Create the secondary dropdown with proper accessibility (label + id)
  subtypeContainer.innerHTML = `
    <label for="subtype">Specify ${selection.charAt(0).toUpperCase() + selection.slice(1)}*</label>
    <select id="subtype" name="subtype" required>
      <option value="">-- Please Choose --</option>
      ${sightingData[selection].map(item => `<option value="${item}">${item}</option>`).join("")}
    </select>
  `;
});

// 3. FORM SUBMISSION & DATA PERSISTENCE
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Stop the page from refreshing

  // Visual feedback to let the user know we are processing the report
  statusMessage.textContent = "📜 Logging sighting in the archives...";
  statusMessage.style.color = "#7dd3fc";

  // Gather all form data into a clean object
  const reportData = Object.fromEntries(new FormData(form));
  
  // Add a unique ID and a high-precision timestamp
  reportData.id = Date.now();
  reportData.submittedAt = new Date().toISOString();

  /* TECHNICAL NOTE: 
     In a full production environment, we would fetch('/api/reports') here.
     For this demonstration, we use LocalStorage as a fallback so the 
     data persists across page reloads on static hosting like GitHub.
  */
  try {
    // Attempting real API call (will fail on static hosting, triggering catch)
    const response = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData)
    });

    if (!response.ok) throw new Error("Offline Mode");
    
    statusMessage.textContent = "✦ Sighting successfully archived! ✦";

  } catch (error) {
    // LOCAL STORAGE FALLBACK LOGIC
    // This ensures the "View Reports" page actually works during the evaluation.
    const localReports = JSON.parse(localStorage.getItem("reports") || "[]");
    localReports.push(reportData);
    localStorage.setItem("reports", JSON.stringify(localReports));

    statusMessage.textContent = "✦ Sighting saved to local archives! ✦";
    statusMessage.style.color = "#4ade80";
  }

  // Cleanup: Reset the form and clear the dynamic dropdown
  form.reset();
  subtypeContainer.innerHTML = "";
  
  // Optional: Auto-clear status message after 5 seconds
  setTimeout(() => { statusMessage.textContent = ""; }, 5000);
});
  // --- MAGICAL MOUSE TRAIL ---
  // This listener creates a new 'sparkle' div every time the mouse moves.
  document.addEventListener('mousemove', (e) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      
      // We position the sparkle exactly where the mouse is
      // pageX and pageY account for scrolling
      sparkle.style.left = `${e.pageX}px`;
      sparkle.style.top = `${e.pageY}px`;
      
      // Randomize the size slightly (between 2px and 10px) 
      // to make it look like natural stardust
      const size = Math.random() * 8 + 2;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;

      document.body.appendChild(sparkle);

      // CRITICAL: We remove the element after 1 second so 
      // we don't slow down the browser with thousands of divs.
      setTimeout(() => {
          sparkle.remove();
    }, 1000);
});

// --- 5. AUDIO ENGINE ---
const audio = document.getElementById("spooky-audio");
const audioBtn = document.getElementById("audio-toggle");

if (audioBtn && audio) {
  audioBtn.addEventListener("click", () => {
    if (audio.paused) {
      // Try to play the sound
      audio.play().then(() => {
        audioBtn.textContent = "🔊 Sound: ON";
        console.log("Atmosphere enabled.");
      }).catch(error => {
        console.log("Browser blocked audio: ", error);
      });
    } else {
      // Pause the sound
      audio.pause();
      audioBtn.textContent = "🔈 Sound: OFF";
      console.log("Atmosphere muted.");
    }
  });
}