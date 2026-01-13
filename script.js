document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. GLOBAL: AUDIO ENGINE ---
    // This runs on both pages because the audio button exists in both
    const audio = document.getElementById("spooky-audio");
    const audioBtn = document.getElementById("audio-toggle");

    if (audioBtn && audio) {
        audioBtn.addEventListener("click", () => {
            if (audio.paused) {
                // Safari/Chrome require a user gesture to play audio
                audio.play().then(() => {
                    audioBtn.textContent = "🔊 Sound: ON";
                }).catch(err => console.log("Audio blocked:", err));
            } else {
                audio.pause();
                audioBtn.textContent = "🔈 Sound: OFF";
            }
        });
    }

    // --- 2. GLOBAL: MAGICAL MOUSE TRAIL ---
    document.addEventListener('mousemove', (e) => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${e.pageX}px`;
        sparkle.style.top = `${e.pageY}px`;
        const size = Math.random() * 8 + 2;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    });

    // --- 3. PAGE SPECIFIC: FORM LOGIC ---
    // We wrap this in an "if" check so it doesn't crash on the Reports page
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