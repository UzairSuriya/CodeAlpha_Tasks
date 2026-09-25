// ==========================================
// 1. Dark / Light Theme Toggle with LocalStorage
// ==========================================
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn.querySelector("i");

// Read saved preference
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

// Toggle click handler
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");

  if (isLight) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("portfolio-theme", "light");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("portfolio-theme", "dark");
  }
});

// ==========================================
// 2. Interactive Project Filter Tabs
// ==========================================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Active class state
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    // Show/hide matching cards
    projectCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (filterValue === "all" || cardCategory === filterValue) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ==========================================
// 3. ScrollSpy Active Nav Link Highlight
// ==========================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140; // Navbar height offset
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});
