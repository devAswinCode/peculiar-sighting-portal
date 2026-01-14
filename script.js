/* ================================================================
   PECULIAR SIGHTING TRACKER - JAVASCRIPT ENGINE
   This script handles the "Magic" (Orb, Sparkles) and the "Logic" (Form, Archives)
   ================================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. THE MOUSE ORB & SPARKLES ---
    // We want a glowing blue orb to follow the mouse, but only on computers.
    
    let isTouchDevice = false;
    const cursor = document.getElementById('custom-cursor');

    // If someone touches the screen (mobile), we turn off the orb to prevent glitches.
    window.addEventListener('touchstart', function onFirstTouch() {
        isTouchDevice = true;
        if (cursor) cursor.style.display = 'none';
        window.removeEventListener('touchstart', onFirstTouch, false);
    }, false);

    // This listener tracks the mouse movement to move the Orb and create Sparkles.
    document.addEventListener('mousemove', (e) => {
        // Stop if it's a phone or doesn't have a mouse pointer.
        if (isTouchDevice || !window.matchMedia("(pointer: fine)").matches) {
            if (cursor) cursor.style.display = 'none';
            return;
        }

        // Move the Main Orb to the current mouse position.
        if (cursor) {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }

        // Create a trailing sparkle at the mouse tip.
        createSparkle(e.pageX, e.pageY);
    });

    // Function to create the little glowing dots that fade away.
    function createSparkle(x, y) {
        if (isTouchDevice) return; 
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // Randomize the size slightly for a natural magical look.
        const size = Math.random() * 8 + 2;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        
        document.body.appendChild(sparkle);
        // Delete the sparkle after 800ms so the page doesn't get cluttered.
        setTimeout(() => sparkle.remove(), 800);
    }

    // --- 2. AUDIO TOGGLE ---
    // Simple logic to play/pause the spooky background music.
    
    const audio = document.getElementById("spooky-audio");
    const audioBtn = document.getElementById("audio-toggle");

    if (audioBtn && audio) {
        audioBtn.addEventListener("click", () => {
            if (audio.paused) {
                audio.play().then(() => {
                    audioBtn.textContent = "🔊 Sound: ON";
                }).catch(err => console.log("Audio blocked by browser:", err));
            } else {
                audio.pause();
                audioBtn.textContent = "🔈 Sound: OFF";
            }
        });
    }

    // --- 3. FORM LOGIC (SIGHTING REPORT) ---
    // Handles the dropdowns and saving the data.

    const typeSelect = document.getElementById("type");
    const subtypeContainer = document.getElementById("subtype-container");
    const form = document.getElementById("reportForm");
    const statusMessage = document.getElementById("status");

    if (form && typeSelect) {
        // Pre-defined options for the "Specify" dropdown.
        const sightingData = {
            ghost: ["Victorian Lady", "Headless Monk", "Banshee", "Poltergeist", "Phantom Stagecoach"],
            animal: ["Dragon", "Unicorn", "Phoenix", "Griffin", "Kelpie"],
            ufo: ["Glowing Orb", "Metallic Disk", "Black Triangle", "Tic-Tac Craft"],
            cryptid: ["Bigfoot", "Mothman", "Loch Ness Monster", "Chupacabra"],
            glitch: ["Time Slip", "Duplicate Person", "Missing Texture"],
            cursed: ["Haunted Doll", "Forbidden Tome", "Ancient Mirror"]
        };

        // When a user picks a category, show the specific sub-options.
        typeSelect.addEventListener("change", () => {
            const selection = typeSelect.value;
            if (!sightingData[selection]) {
                subtypeContainer.innerHTML = "";
                return;
            }
            subtypeContainer.innerHTML = `
                <label for="subtype">Specify ${selection.charAt(0).toUpperCase() + selection.slice(1)}*</label>
                <select id="subtype" name="subtype" required>
                    <option value="">-- Please Choose --</option>
                    ${sightingData[selection].map(item => `<option value="${item}">${item}</option>`).join("")}
                </select>`;
        });

        // When the user hits Submit.
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            statusMessage.textContent = "📜 Logging sighting in the archives...";
            
            // Collect all the form data into a single object.
            const reportData = Object.fromEntries(new FormData(form));
            reportData.id = Date.now(); // Unique ID using time.
            reportData.submittedAt = new Date().toLocaleString(); // Readable date.

            try {
                // Try to send to a server (if you have one).
                const response = await fetch("/api/reports", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reportData)
                });
                if (!response.ok) throw new Error("Offline");
                statusMessage.textContent = "✦ Sighting successfully archived! ✦";
            } catch (error) {
                // FALLBACK: If there's no server, save it to the user's browser (Local Storage).
                const localReports = JSON.parse(localStorage.getItem("reports") || "[]");
                localReports.push(reportData);
                localStorage.setItem("reports", JSON.stringify(localReports));
                
                statusMessage.textContent = "✦ Sighting saved to local archives! ✦";
                statusMessage.style.color = "#4ade80";
            }
            
            // Reset the form so it's ready for another report.
            form.reset();
            subtypeContainer.innerHTML = "";
            // Hide the status message after 5 seconds.
            setTimeout(() => { statusMessage.textContent = ""; }, 5000);
        });
    }
});

// --- 4. ARCHIVES PAGE LOGIC ---
// This runs on the "View Archives" page to show all saved sightings.

async function loadLocalArchives() {
    const grid = document.getElementById('reports-grid');
    if (!grid) return; // Exit if we aren't on the Archives page.

    let allReports = [];

    // 1. Fetch the "lore" (pre-made sightings) from your JSON file.
    try {
        const response = await fetch("reports.json");
        if (response.ok) {
            const jsonReports = await response.json();
            allReports = [...jsonReports]; 
        }
    } catch (err) {
        console.warn("Could not load reports.json, showing local sightings only.");
    }

    // 2. Fetch the "user sightings" from the browser's LocalStorage.
    const localData = JSON.parse(localStorage.getItem("reports") || "[]");
    
    // 3. Merge them together (JSON lore first, then user data).
    allReports = [...allReports, ...localData];

    // 4. Handle Empty State.
    if (allReports.length === 0) {
        grid.innerHTML = "<p class='no-data' style='text-align:center; grid-column: 1/-1;'>The archives are currently empty...</p>";
        return;
    }

    // 5. Build the HTML for each card and show the newest ones first (reverse).
    grid.innerHTML = allReports.reverse().map(report => `
        <div class="report-card">
            <h3 style="color: #7dd3fc; margin-top: 0;">${(report.type || 'Sighting').toUpperCase()}: ${report.subtype || 'Unknown'}</h3>
            <p><strong>Witness:</strong> ${report.name || 'Anonymous'}</p>
            <p><strong>Location:</strong> ${report.location || 'Unknown'}</p>
            <p>${report.description || 'No details provided.'}</p>
            <small style="color: rgba(255,255,255,0.5)">Log Date: ${report.submittedAt || report.datetime || 'N/A'}</small>
        </div>
    `).join(''); 
}

// Trigger the Archive loader when the window finishes loading.
window.addEventListener('load', loadLocalArchives);