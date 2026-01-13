document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. GLOBAL: MOUSE & TOUCH LOGIC (ORB FIX) ---
    let isTouchDevice = false;
    const cursor = document.getElementById('custom-cursor');

    // Detect touch once and kill the orb forever for this session
    window.addEventListener('touchstart', function onFirstTouch() {
        isTouchDevice = true;
        if (cursor) cursor.style.display = 'none';
        window.removeEventListener('touchstart', onFirstTouch, false);
    }, false);

    // Single MouseMove Listener for both Orb and Sparkles
    document.addEventListener('mousemove', (e) => {
        // Exit if it's a touch device or doesn't have a fine pointer
        if (isTouchDevice || !window.matchMedia("(pointer: fine)").matches) {
            if (cursor) cursor.style.display = 'none';
            return;
        }

        // 1. Move the Main Orb (Fixed to window)
        if (cursor) {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }

        // 2. Create the Trail/Sparkles (Absolute to page)
        createSparkle(e.pageX, e.pageY);
    });

    function createSparkle(x, y) {
        if (isTouchDevice) return; 
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        const size = Math.random() * 8 + 2;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }

    // --- 2. GLOBAL: AUDIO ENGINE ---
    const audio = document.getElementById("spooky-audio");
    const audioBtn = document.getElementById("audio-toggle");

    if (audioBtn && audio) {
        audioBtn.addEventListener("click", () => {
            if (audio.paused) {
                audio.play().then(() => {
                    audioBtn.textContent = "🔊 Sound: ON";
                }).catch(err => console.log("Audio blocked:", err));
            } else {
                audio.pause();
                audioBtn.textContent = "🔈 Sound: OFF";
            }
        });
    }

    // --- 3. PAGE SPECIFIC: FORM LOGIC ---
    const typeSelect = document.getElementById("type");
    const subtypeContainer = document.getElementById("subtype-container");
    const form = document.getElementById("reportForm");
    const statusMessage = document.getElementById("status");

    if (form && typeSelect) {
        const sightingData = {
            ghost: ["Victorian Lady", "Headless Monk", "Banshee", "Poltergeist", "Phantom Stagecoach"],
            animal: ["Dragon", "Unicorn", "Phoenix", "Griffin", "Kelpie"],
            ufo: ["Glowing Orb", "Metallic Disk", "Black Triangle", "Tic-Tac Craft"],
            cryptid: ["Bigfoot", "Mothman", "Loch Ness Monster", "Chupacabra"],
            glitch: ["Time Slip", "Duplicate Person", "Missing Texture"],
            cursed: ["Haunted Doll", "Forbidden Tome", "Ancient Mirror"]
        };

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

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            statusMessage.textContent = "📜 Logging sighting in the archives...";
            const reportData = Object.fromEntries(new FormData(form));
            reportData.id = Date.now();
            reportData.submittedAt = new Date().toISOString();

            try {
                const response = await fetch("/api/reports", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reportData)
                });
                if (!response.ok) throw new Error("Offline");
                statusMessage.textContent = "✦ Sighting successfully archived! ✦";
            } catch (error) {
                const localReports = JSON.parse(localStorage.getItem("reports") || "[]");
                localReports.push(reportData);
                localStorage.setItem("reports", JSON.stringify(localReports));
                statusMessage.textContent = "✦ Sighting saved to local archives! ✦";
                statusMessage.style.color = "#4ade80";
            }
            form.reset();
            subtypeContainer.innerHTML = "";
            setTimeout(() => { statusMessage.textContent = ""; }, 5000);
        });
    }
});
// --- 4. ARCHIVES PAGE LOGIC ---
function loadLocalArchives() {
    const grid = document.getElementById('reports-grid');
    if (!grid) return; 

    const reports = JSON.parse(localStorage.getItem("reports") || "[]");

    if (reports.length === 0) {
        grid.innerHTML = "<p class='no-data' style='text-align:center; grid-column: 1/-1;'>The archives are currently empty...</p>";
        return;
    }

    grid.innerHTML = reports.map(report => `
        <div class="report-card">
            <h3 style="color: #7dd3fc; margin-top: 0;">${report.type.toUpperCase()}: ${report.subtype || 'Unknown'}</h3>
            <p><strong>Witness:</strong> ${report.name}</p>
            <p>${report.description}</p>
            <small style="color: rgba(255,255,255,0.5)">Log Date: ${report.submittedAt}</small>
        </div>
    `).reverse().join(''); 
}

// Single load listener
window.addEventListener('load', () => {
    console.log("Archives engine initialized...");
    loadLocalArchives(); 
});