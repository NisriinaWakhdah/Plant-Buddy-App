// Title bar buttons
const {ipcRenderer} = require("electron");
const minimizeBtn = document.getElementById("minimize-btn");
const closeBtn = document.getElementById("close-btn");

minimizeBtn.addEventListener("click", () => 
    ipcRenderer.send("window:minimize"),
);

closeBtn.addEventListener("click", () => ipcRenderer.send("window:close"));

// Water meter mechanic
const drain_amount = 1;         // to drain per tick
const drain_interval = 900;     // 0.5% per 1s
const water_cooldown = 10000    // 10s cooldown after watering

// Default state
let water_level = 100;
let water_on_cooldown = false;
let cooldown_timer = null;

// Elements
const bars = Array.from({ length: 10}, (_, i) =>
    document.getElementById(`bar-${i + 1}`),
);
const percentage = document.getElementById("percentage");
const mood_tag = document.getElementById("mood");
const plant_icon = document.getElementById("plant");
const care_reminder = document.getElementById("message");
const water_btn = document.getElementById("water-btn");
const water_timer = water_btn.querySelector(".timer");
const restart_btn = document.getElementById("restart-btn");

function updateUI() {
    // update bars: each bar = 10%, each bar is filled if water_level > 10
    percentage.textContent = `${water_level}%`;
    bars.forEach((bar, i) => {
        const threshold = i * 10;
        const filled = water_level > threshold;
        bar.style.background = filled ? "#8FC98A" : "#C2E0B8";
        bar.style.color = filled ? "#8FC98A" : "#C2E0B8";
    });

    // update mood
    if (water_level > 74) {     // thriving
        plant_icon.src = "assets/philodendron-plant/philodendron-thriving.gif";
        mood_tag.textContent = "Thriving";
        care_reminder.textContent = "- All good here, just vibing -";
        restart_btn.style.display = "none";
        water_btn.style.display = "flex";
    } else if (water_level > 39) {  // okay
        plant_icon.src = "assets/philodendron-plant/philodendron-okay.gif";
        mood_tag.textContent = "Okay";
        care_reminder.textContent = "- No worries mate, chill! -";
        restart_btn.style.display = "none";
        water_btn.style.display = "flex";
    } else if (water_level > 0) {   // thirsty
        plant_icon.src = "assets/philodendron-plant/philodendron-thirsty.gif";
        mood_tag.textContent = "Thristy";
        care_reminder.textContent = "- Please give me water -";
        restart_btn.style.display = "none";
        water_btn.style.display = "flex";
    } else {
        plant_icon.src = "assets/philodendron-plant/philodendron-wilted.gif";
        mood_tag.textContent = "Wilted";
        care_reminder.textContent = "- Your plant has wilted -";
        restart_btn.style.display = "flex";
        water_btn.style.display = "none";
    }
}
