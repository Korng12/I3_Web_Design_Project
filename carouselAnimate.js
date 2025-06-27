function initCarousel() {
  const slides = document.querySelectorAll(".movie-slide");
  const dotsContainer = document.getElementById("dots");
  let current = 0;
  let interval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
      slide.classList.toggle("fade-in", i === index);
    });
    updateDots();
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function createDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = "w-3 h-3 bg-white/50 rounded-full cursor-pointer hover:bg-white transition-all";
      dot.addEventListener("click", () => {
        current = index;
        showSlide(current);
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    const dots = document.querySelectorAll("#dots div");
    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-white", i === current);
      dot.classList.toggle("bg-white/50", i !== current);
    });
  }

  // Bind next/prev button
  document.getElementById("nextBtn")?.addEventListener("click", nextSlide);
  document.getElementById("prevBtn")?.addEventListener("click", prevSlide);

  createDots();
  showSlide(current);
  interval = setInterval(nextSlide, 10000);
}
// function toggleSearchBar() {
//   const search = document.getElementById("search");
//   const icon = document.getElementById("searchIcon");
//   search.classList.toggle("opacity-0");
//   search.classList.toggle("scale-95");
//   search.classList.toggle("pointer-events-none");

//   search.classList.toggle("opacity-100");
//   search.classList.toggle("scale-100");
//   search.classList.toggle("pointer-events-auto");
//   icon.classList.toggle("fa-magnifying-glass");
//   icon.classList.toggle("fa-xmark");
// }



