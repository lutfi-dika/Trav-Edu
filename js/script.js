function goCity(city) {
  const routes = {
    Jakarta: "Tempat/Jakarta.html",
    Bandung: "Tempat/bandung.html",
    Jogja: "Tempat/jogja.html",
    Malang: "Tempat/malang.html",
    Bali: "Tempat/bali.html",
  };
  window.location.href = routes[city];
}

// --- SLIDESHOW HERO ---
const images = [
  "https://www.theungasan.com/wp-content/uploads/2020/01/Tanah-Lot-Temple.jpg",
  "https://2.bp.blogspot.com/-kBJIgYcYtzo/Vqt7vCnT1LI/AAAAAAAABQ0/nYxWtho7zik/s1600/2.jpg",
  "https://travelinkmagz.com/wp-content/uploads/2020/04/JKT_Monas_1920x1080px_1.jpg",
  "https://idetrips.com/wp-content/uploads/2020/07/kawah-ratu-tangkuban-parahu.jpg",
  "https://www.bugbog.com/wp-content/uploads/2022/05/dc76a908affc27f2/mount-bromo.jpeg",
];
let currentIndex = 0;
const bgContainer = document.getElementById("bg-container");
const timerBar = document.getElementById("timer-bar");

images.forEach((img, index) => {
  const div = document.createElement("div");
  div.className = `bg-layer ${index === 0 ? "active" : ""}`;
  div.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${img}')`;
  bgContainer.appendChild(div);
});

function nextSlide() {
  const layers = document.querySelectorAll(".bg-layer");
  layers[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % images.length;
  layers[currentIndex].classList.add("active");
  startTimer();
}
function startTimer() {
  timerBar.style.transition = "none";
  timerBar.style.width = "0%";
  setTimeout(() => {
    timerBar.style.transition = "width 10000ms linear";
    timerBar.style.width = "100%";
  }, 50);
}
setInterval(nextSlide, 10000);
startTimer();

// --- DATA KOTA & LOGIKA PERSENTASE ---
const cityData = {
  Jakarta: { count: 2450, color: "#ef4444" },
  Bandung: { count: 1820, color: "#3b82f6" },
  Jogja: { count: 3100, color: "#10b981" },
  Malang: { count: 1560, color: "#f59e0b" },
  Bali: { count: 5200, color: "#8b5cf6" },
};

function updateUI() {
  const total = Object.values(cityData).reduce(
    (sum, city) => sum + city.count,
    0,
  );
  const container = document.getElementById("stats-container");
  container.innerHTML = "";

  for (const city in cityData) {
    const percentage = ((cityData[city].count / total) * 100).toFixed(1);
    container.innerHTML += `
            <div class="glass-card p-4 rounded-2xl border-l-4" style="border-left-color: ${cityData[city].color}">
              <div class="flex justify-between items-end mb-2">
                <span class="text-sm font-bold uppercase tracking-tighter">${city}</span>
                <span class="text-lg font-black">${percentage}%</span>
              </div>
              <div class="progress-bg"><div class="progress-fill" style="width: ${percentage}%; background: ${cityData[city].color}"></div></div>
            </div>
          `;
  }
}

// Interaksi Titik Kota
const tooltip = document.getElementById("tooltip");
document.querySelectorAll(".city-node").forEach((node) => {
  const id = node.id;
  node.addEventListener("mousemove", (e) => {
    tooltip.style.display = "block";
    tooltip.innerHTML = `<div class="font-bold text-red-500 uppercase">${id}</div><div class="text-[10px] opacity-70">Klik untuk Vote</div>`;
    tooltip.style.left = e.pageX + 15 + "px";
    tooltip.style.top = e.pageY + 15 + "px";
  });
  node.addEventListener("mouseleave", () => (tooltip.style.display = "none"));
  node.addEventListener("click", () => {
    cityData[id].count += 100;
    updateUI();
    node.style.r = "20";
    setTimeout(() => (node.style.r = "8"), 200);
  });
});

// --- SEARCH & DROPDOWN ---
const searchBtn = document.getElementById("search-btn");
const closeSearch = document.getElementById("close-search");
const searchContainer = document.getElementById("search-container");
searchBtn.onclick = () =>
  searchContainer.classList.add(
    "opacity-100",
    "pointer-events-auto",
    "scale-x-100",
  );
closeSearch.onclick = () =>
  searchContainer.classList.remove(
    "opacity-100",
    "pointer-events-auto",
    "scale-x-100",
  );

document.querySelectorAll(".dropdown-btn").forEach((btn) => {
  btn.onclick = (e) => {
    e.stopPropagation();
    btn.nextElementSibling.classList.toggle("show");
  };
});
window.onclick = () =>
  document
    .querySelectorAll(".dropdown-menu")
    .forEach((m) => m.classList.remove("show"));

updateUI();

