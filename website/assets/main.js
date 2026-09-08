// EasyCTET — Shared site behaviour

// ---- Countdown to exam date ----
// Single editable constant: update this if CBSE reschedules again.
const EXAM_DATE = new Date("2026-10-09T09:00:00+05:30");

function updateCountdown(){
  const el = document.getElementById("countdown");
  if(!el) return;
  const now = new Date();
  let diff = EXAM_DATE - now;
  if(diff < 0) diff = 0;
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const mins = Math.floor((diff / (1000*60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  el.querySelector("[data-d]").textContent = days;
  el.querySelector("[data-h]").textContent = String(hours).padStart(2,"0");
  el.querySelector("[data-m]").textContent = String(mins).padStart(2,"0");
  el.querySelector("[data-s]").textContent = String(secs).padStart(2,"0");
}
setInterval(updateCountdown, 1000);
document.addEventListener("DOMContentLoaded", updateCountdown);

// ---- FAQ accordion ----
document.addEventListener("click", function(e){
  const q = e.target.closest(".faq-q");
  if(!q) return;
  const item = q.closest(".faq-item");
  item.classList.toggle("open");
});

// ---- Mobile nav toggle (simple show/hide) ----
document.addEventListener("DOMContentLoaded", function(){
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav.links");
  if(toggle && nav){
    toggle.addEventListener("click", function(){
      nav.style.display = nav.style.display === "flex" ? "none" : "flex";
      nav.style.flexDirection = "column";
      nav.style.position = "absolute";
      nav.style.top = "56px";
      nav.style.right = "20px";
      nav.style.background = "#152136";
      nav.style.border = "1px solid #1C2B45";
      nav.style.borderRadius = "10px";
      nav.style.padding = "14px 20px";
      nav.style.gap = "14px";
    });
  }
});
