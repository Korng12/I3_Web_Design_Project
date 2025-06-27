
function mobileMenuShow(){
  const menuToggle = document.getElementById('menu');
  const mobileMenu = document.getElementById('mobile-menu');

    mobileMenu.classList.toggle('hidden');
    menuToggle.classList.toggle('fa-xmark');
    menuToggle.classList.toggle('fa-bars');
}

function showAllCards(){
  const viewAllBtn = document.getElementById("viewAllBtn");
  const allCards = document.getElementById("allCards");
  allCards.classList.toggle("hidden");
  viewAllBtn.textContent = allCards.classList.contains("hidden") ? "view all" : "show less";

}

function handleSearch() {
  const input = document.getElementById("searchInput");
  const query = input.value.trim().toLowerCase();
  const container = document.getElementById("mainContent");

  container.innerHTML = ""; 

  if (!query) {
    container.innerHTML = `<p class="text-center text-white/60 mt-10">Please type something to search.</p>`;
    return;
  }


  const results = movies.filter(movie =>
    movie.title.toLowerCase().includes(query)
  );


  if (results.length === 0) {
    container.innerHTML = `<p class="text-center text-white/60 mt-10">No movies found for "<strong>${query}</strong>".</p>`;
    return;
  }


  const wrapper = document.createElement("div");
  wrapper.className = "grid lg:mx-36 grid-cols-2 md:grid-cols-3 gap-6 px-6 py-10";

  results.forEach(movie => {
    const card = document.createElement("div");
    card.className = "cursor-pointer h-64 bg-cover bg-center rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300";
    card.style.backgroundImage = `url('${movie.poster}')`;

    card.innerHTML = `
      <div class="bg-black/60 h-full flex items-center justify-center rounded-xl">
        <h2 class="text-white text-lg font-semibold text-center px-2">${movie.title}</h2>
      </div>
    `;


        // Handle click for detail view
    card.onclick = () => {
      const fakeEl = document.createElement("div");
     fakeEl.dataset.title = movie.title;
      fakeEl.dataset.poster = movie.poster;
      fakeEl.dataset.trailer = movie.trailer;
      fakeEl.dataset.description = movie.description;
      fakeEl.dataset.year = movie.year;
      fakeEl.dataset.genre = JSON.stringify(movie.genre);
      fakeEl.dataset.type = movie.type || "movie";
      if (movie.seasons) {
        fakeEl.dataset.seasons = JSON.stringify(movie.seasons);
      }

      viewMovieDetail(fakeEl); // Load detail page
    };

    wrapper.appendChild(card);
  });

  container.appendChild(wrapper);
}

function renderRelatedMovies(currentMovie) {
  const container = document.getElementById("relatedMovies");
  if (!container) return;

  const related = movies.filter(movie =>
    movie.title !== currentMovie.title &&
    Array.isArray(movie.genre) &&
    movie.genre.some(g =>
      currentMovie.genre.some(cg => cg.toLowerCase() === g.toLowerCase())
    )
  );

  console.log("Current:", currentMovie.title, currentMovie.genre);
  movies.forEach(movie => {
    console.log("Checking:", movie.title, movie.genre);
  });
  console.log("Related movies found:", related.length);

  if (related.length === 0) {
    container.innerHTML = `<p class="text-white/60">No related movies found.</p>`;
    return;
  }

  container.innerHTML = ""; // Clear previous content

  related.forEach(movie => {
    const card = document.createElement("div");
    card.className = "cursor-pointer h-48 bg-cover bg-center rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300";
    card.style.backgroundImage = `url('${movie.poster}')`;
    card.innerHTML = `
      <div class="bg-black/60 h-full flex items-center justify-center rounded-xl">
        <h2 class="text-white text-sm font-semibold text-center px-2">${movie.title}</h2>
      </div>
    `;
        // Handle click for detail view
    card.onclick = () => {
      const fakeEl = document.createElement("div");
      fakeEl.dataset.title = movie.title;
      fakeEl.dataset.poster = movie.poster;
      fakeEl.dataset.trailer = movie.trailer;
      fakeEl.dataset.description = movie.description;
      fakeEl.dataset.year = movie.year;
      fakeEl.dataset.genre = JSON.stringify(movie.genre);
      fakeEl.dataset.type = movie.type || "movie";
      if (movie.seasons) {
        fakeEl.dataset.seasons = JSON.stringify(movie.seasons);
      }

      viewMovieDetail(fakeEl); // Load detail page
    };
    container.appendChild(card);
  });
}
function filterByGenre(selectedGenre) {
  const container = document.getElementById("mainContent");
  container.innerHTML = ""; // Clear current content

  // Filter movies that include the selected genre
  const filteredMovies = movies.filter(movie =>
    movie.genre && movie.genre.includes(selectedGenre)
  );

  // If none found
  if (filteredMovies.length === 0) {
    container.innerHTML = `<p class="text-center text-white/60 mt-10">No movies found in this genre.</p>`;
    return;
  }

  // Build grid wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "grid lg:mx-36 grid-cols-2 md:grid-cols-3 gap-6  px-6 py-10";

  // Loop through results
  filteredMovies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "cursor-pointer h-64 bg-cover bg-center rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300";
    card.style.backgroundImage = `url('${movie.poster}')`;

    // Add movie card content
    card.innerHTML = `
      <div class="bg-black/60 h-full flex items-center justify-center rounded-xl">
        <h2 class="text-white text-lg font-semibold text-center px-2">${movie.title}</h2>
      </div>
    `;
    

    // Handle click for detail view
    card.onclick = () => {
      const fakeEl = document.createElement("div");
     fakeEl.dataset.title = movie.title;
      fakeEl.dataset.poster = movie.poster;
      fakeEl.dataset.trailer = movie.trailer;
      fakeEl.dataset.description = movie.description;
      fakeEl.dataset.year = movie.year;
      fakeEl.dataset.genre = JSON.stringify(movie.genre);
      fakeEl.dataset.type = movie.type || "movie";
      if (movie.seasons) {
        fakeEl.dataset.seasons = JSON.stringify(movie.seasons);
      }

      viewMovieDetail(fakeEl); // Load detail page
    };

    wrapper.appendChild(card);
  });

  container.appendChild(wrapper);
}

function filterByGenreFromMenu(genre) {
  document.getElementById("genreSelect").value = genre; 
  filterByGenre(genre); 
}

function viewMovieDetail(el) {
const movie = {
  title: el.dataset.title,
  poster: el.dataset.poster,
  trailer: el.dataset.trailer,
  description: el.dataset.description,
  year: el.dataset.year,
  genre: JSON.parse(el.dataset.genre || "[]"),
  type: el.dataset.type || "movie",
  seasons: el.dataset.seasons ? JSON.parse(el.dataset.seasons) : []
};

  console.log("movie.seasons:", movie.seasons);
  console.log("Parsed genre array:", movie.genre);
  localStorage.setItem("selectedMovie", JSON.stringify(movie));
  loadComponent("mainContent", "movieDetail.html", renderMovieDetail);
}

function renderMovieDetail() {
  const movie = JSON.parse(localStorage.getItem("selectedMovie"));
  if (!movie) return;

  // Normalize genre
  if (typeof movie.genre === "string") {
    try {
      movie.genre = JSON.parse(movie.genre);
    } catch {
      movie.genre = [];
    }
  }
  if (!Array.isArray(movie.genre)) movie.genre = [];

  // Series section toggle
  const seriesSection = document.getElementById("seriesSection");
  if (movie.type === "series" && Array.isArray(movie.seasons) && movie.seasons.length) {
    seriesSection.classList.remove("hidden");
    renderSeriesDropdown(movie);
  } else {
    seriesSection.classList.add("hidden");
  }

  // Fill movie details
  document.getElementById("detailTitle").textContent = movie.title;
  document.getElementById("detailYear").textContent = movie.year;
  document.getElementById("detailDescription").textContent = movie.description;
  document.getElementById("detailPoster").style.backgroundImage = `url('${movie.poster}')`;
  document.getElementById("detailTrailer").style.backgroundImage = `url('${movie.trailer}')`;

  renderRelatedMovies(movie);
}


function renderSeriesDropdown(movie) {
  const seasonSelect = document.getElementById("seasonSelect");
  const episodeContainer = document.getElementById("episodeContainer");

  // Clear old data
  seasonSelect.innerHTML = "";
  episodeContainer.innerHTML = "";

  // If no seasons, skip
  if (!movie.seasons || !movie.seasons.length) return;

  // Populate dropdown
  movie.seasons.forEach((season, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `Season ${season.seasonNumber}`;
    seasonSelect.appendChild(option);
  });

  // Initial load of episodes
  renderEpisodes(movie.seasons[0]);

  // Listen for dropdown changes
  seasonSelect.addEventListener("change", () => {
    const selectedIndex = seasonSelect.value;
    renderEpisodes(movie.seasons[selectedIndex]);
  });
}

function renderEpisodes(season) {
  const episodeContainer = document.getElementById("episodeContainer");
  episodeContainer.innerHTML = ""; // Clear existing

  season.episodes.forEach(ep => {
    const epDiv = document.createElement("div");
    epDiv.className = "bg-white/10 hover:bg-white/20 p-4 rounded-lg";
    epDiv.innerHTML = `
      <div class="font-semibold text-white">${ep.title}</div>
      <div class="text-sm text-gray-300">${ep.duration}</div>
    `;
    episodeContainer.appendChild(epDiv);
  });
}

function toggleSearchBar() {
  const search = document.getElementById("search");
  const icon = document.getElementById("searchIcon");
  search.classList.toggle("opacity-0");
  search.classList.toggle("scale-95");
  search.classList.toggle("pointer-events-none");

  search.classList.toggle("opacity-100");
  search.classList.toggle("scale-100");
  search.classList.toggle("pointer-events-auto");
  icon.classList.toggle("fa-magnifying-glass");
  icon.classList.toggle("fa-xmark");
}
function addToMyList() {
  const movie = JSON.parse(localStorage.getItem("selectedMovie"));
  if (!movie) return;

  let myList = JSON.parse(localStorage.getItem("myList")) || [];

  // Check if movie already in list
  const exists = myList.some(m => m.title === movie.title);
  if (exists) {
    alert("This movie is already in your list.");
    return;
  }

  myList.push(movie);
  localStorage.setItem("myList", JSON.stringify(myList));
  alert("Movie added to your list!");
}
function renderMyList() {
  const container = document.getElementById("mainContent");
  const myList = JSON.parse(localStorage.getItem("myList")) || [];

  container.innerHTML = "";

  if (myList.length === 0) {
    container.innerHTML = `<p class="text-center text-white/60 mt-10">Your list is empty.</p>`;
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "grid grid-cols-2 md:grid-cols-3 gap-6  px-16 lg:mx-36 lg:px-20 py-10";

  myList.forEach(movie => {
    const card = document.createElement("div");
    card.className = "cursor-pointer h-64 bg-cover bg-center rounded-xl shadow-lg";
    card.style.backgroundImage = `url('${movie.poster}')`;
    card.innerHTML = `
      <div class="bg-black/60 h-full flex items-center justify-center rounded-xl">
        <h2 class="text-white text-lg font-bold">${movie.title}</h2>
      </div>
    `;
    card.onclick = () => {
      const fakeEl = document.createElement("div");
      fakeEl.dataset.title = movie.title;
      fakeEl.dataset.poster = movie.poster;
      fakeEl.dataset.trailer = movie.trailer;
      fakeEl.dataset.description = movie.description;
      fakeEl.dataset.year = movie.year;
      fakeEl.dataset.genre = JSON.stringify(movie.genre);
      viewMovieDetail(fakeEl);
    };

    wrapper.appendChild(card);
  });

  container.appendChild(wrapper);
}
function loadMyList() {
  const container = document.getElementById("mainContent");
  container.innerHTML = "<h2 class='text-2xl lg:mx-16 font-bold mb-6 px-6 pt-8'>My List</h2>";

  const myList = JSON.parse(localStorage.getItem("myList")) || [];

  if (myList.length === 0) {
    container.innerHTML += `<p class="text-center text-white/60 mt-10">Your list is empty.</p>`;
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "grid lg:mx-16 grid-cols-2 md:grid-cols-3 gap-6 px-6 py-10";

  myList.forEach(movie => {
    const card = document.createElement("div");
    card.className = "cursor-pointer h-64 bg-cover bg-center rounded-xl shadow-lg";
    card.style.backgroundImage = `url('${movie.poster}')`;

    card.innerHTML = `
      <div class="bg-black/60 h-full flex items-center justify-center">
        <h2 class="text-white text-lg font-bold">${movie.title}</h2>
      </div>
    `;

    card.onclick = () => {
      const fakeEl = document.createElement("div");
      fakeEl.dataset.title = movie.title;
      fakeEl.dataset.poster = movie.poster;
      fakeEl.dataset.trailer = movie.trailer;
      fakeEl.dataset.description = movie.description;
      fakeEl.dataset.year = movie.year;
      fakeEl.dataset.genre = JSON.stringify(movie.genre);
      viewMovieDetail(fakeEl);
    };

    wrapper.appendChild(card);
  });

  container.appendChild(wrapper);
}

let exploreFullList = [];  // Store the full filtered list globally
let isShowingAll = false;  // Toggle state

function filterExplore(type) {
  const container = document.getElementById("mainContent");
  container.innerHTML = ""; // Clear previous content

  // Reset toggle state on new filter
  isShowingAll = false;

  // Filter and sort movies according to type
  if (type === "topRated") {
    exploreFullList = [...movies].sort((a, b) => b.rating - a.rating);
  } else if (type === "mostViewed") {
    exploreFullList = [...movies].sort((a, b) => b.views - a.views);
  } else if (type === "newReleases") {
    exploreFullList = [...movies].sort((a, b) => b.year - a.year);
  }

  renderExploreMovies();
}

function renderExploreMovies() {
  const container = document.getElementById("mainContent");
  container.innerHTML = ""; // Clear previous content

  const wrapper = document.createElement("div");
  wrapper.className = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-10";

  // Show either all or first 8
  const moviesToShow = isShowingAll ? exploreFullList : exploreFullList.slice(0, 8);

  moviesToShow.forEach(movie => {
    const card = document.createElement("div");
    card.className = "cursor-pointer h-64 bg-cover bg-center rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300";
    card.style.backgroundImage = `url('${movie.poster}')`;

    card.innerHTML = `
      <div class="bg-black/60 h-full flex items-center justify-center rounded-xl">
        <h2 class="text-white text-lg font-semibold text-center px-2">${movie.title}</h2>
      </div>
    `;

    card.onclick = () => {
      const fakeEl = document.createElement("div");
      fakeEl.dataset.title = movie.title;
      fakeEl.dataset.genre = JSON.stringify(movie.genre);
      fakeEl.dataset.poster = movie.poster;
      fakeEl.dataset.trailer = movie.trailer;
      fakeEl.dataset.description = movie.description;
      fakeEl.dataset.year = movie.year;
      fakeEl.dataset.type = movie.type;
      if (movie.seasons) fakeEl.dataset.seasons = JSON.stringify(movie.seasons);

      viewMovieDetail(fakeEl);
    };

    wrapper.appendChild(card);
  });

  container.appendChild(wrapper);

    // Add View More / View Less button
    const btnWrapper = document.createElement("div");
    btnWrapper.className = "flex items-center  w-full mt-6";
    const hrLeft = document.createElement("hr");
    hrLeft.className = "text-white w-full";
    const btn = document.createElement("button");
  btn.className = "opacity-80 transition-all duration-300 ease-in-out hover:opacity-100 hover:scale-110 flex p-2 border-2 border-white rounded-full items-center";
  btn.innerHTML = isShowingAll
    ? '<i class="fa-solid fa-chevron-up"></i>'
    : '<i class="fa-solid fa-chevron-down"></i>';

  btn.onclick = () => {
    isShowingAll = !isShowingAll;
    renderExploreMovies();
  };

  // Create the second <hr>
  const hrRight = document.createElement("hr");
  hrRight.className = "w-full";

  // Append elements to wrapper
  btnWrapper.appendChild(hrLeft);
  btnWrapper.appendChild(btn);
  btnWrapper.appendChild(hrRight);

  container.appendChild(btnWrapper);
}

// function renderRecommended(moviesList) {
//   const section = document.getElementById("recommendedSection");
//   section.innerHTML = ""; // clear previous

//   const wrapper = document.createElement("div");
//   wrapper.className = "flex flex-col gap-8 lg:mx-36 lg:px-20 px-6 py-10";

//   const header = `
//     <div class="flex justify-between">
//       <div class="flex gap-2 lg:gap-8">
//         <h1 class="text-[20px] sm:text-[26px] font-bold">Recommended</h1>
//         <button class="filterBtn" data-filter="movie">Movies</button>
//         <button class="filterBtn" data-filter="series">Series</button>
//         <button class="filterBtn" data-filter="animation">Animation</button>
//       </div>
//       <button onclick="toggleViewMore()" class="text-white/80 hover:text-white hover:underline">View More <i class="fa-solid fa-arrow-right ml-1"></i></button>
//     </div>
//   `;

//   wrapper.innerHTML = header;

//   const cardsContainer = document.createElement("div");
//   cardsContainer.className = "flex items-center justify-center gap-8 w-full flex-wrap";

//   moviesList.forEach(movie => {
//     const card = document.createElement("div");
//     card.className = "flex flex-col gap-4";
//     card.innerHTML = `
//       <div onclick="viewMovieDetail(this)" data-title="${movie.title}" data-type="${movie.type}" data-trailer="${movie.trailer}" data-poster="${movie.poster}" data-genre='${JSON.stringify(movie.genre)}' data-description="${movie.description}" data-seasons='${JSON.stringify(movie.seasons)}' class="relative bg-cover h-[350px] w-[250px] shadow-lg overflow-hidden bg-center hover:cursor-pointer shadow-lg transition-transform duration-500 hover:scale-105 hover:brightness-75 overflow-hidden bg-center" style="background-image: url('${movie.poster}');"></div>
//       <div class="flex justify-between items-center">
//         <h3>${movie.title}</h3>
//         <ul class="flex gap-2">
//           <li class="bg-red-600 p-1 rounded-md">HD</li>
//           <li class="border-2 border-red-500 rounded-md p-1"><i class="fa-regular fa-clock mr-2"></i><span>${movie.duration}</span></li>
//         </ul>
//       </div>
//     `;
//     cardsContainer.appendChild(card);
//   });

//   wrapper.appendChild(cardsContainer);
//   section.appendChild(wrapper);
//   section.classList.remove("hidden");
// }



let currentFilter = "movie"; // Default

function renderRecommended() {
  const section = document.getElementById("recommendedSection");
  section.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-8 lg:mx-36 lg:px-20 px-6 py-10";

  const header = `
    <div class="flex justify-between">
      <div class="flex gap-2 lg:gap-8">
        <h1 class="text-[20px] sm:text-[26px] font-bold">Recommended</h1>
        <button class="filterBtn ${currentFilter === "movie" ? "bg-red-600 text-white font-bold" : "text-white/80"} border-red-600 border-2 p-2 rounded-xl transition-all duration-300" data-filter="movie">Movies</button>
        <button class="filterBtn ${currentFilter === "series" ? "bg-red-600 text-white font-bold" : "text-white/80"} border-red-600 border-2 p-2 rounded-xl transition-all duration-300" data-filter="series">Series</button>
        <button class="filterBtn ${currentFilter === "animation" ? "bg-red-600 text-white font-bold" : "text-white/80"} border-red-600 border-2 p-2 rounded-xl transition-all duration-300" data-filter="animation">Animation</button>
      </div>
      <button onclick="toggleViewMore()" class="text-white/80 hover:text-white hover:underline">View More <i class="fa-solid fa-arrow-right ml-1"></i></button>
    </div>
  `;

  wrapper.innerHTML = header;

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "flex items-center justify-center gap-8 w-full flex-wrap";

  // ✅ Filter movies based on currentFilter
  const filteredMovies = movies.filter(m => m.type === currentFilter);

  filteredMovies.forEach(movie => {
    const seasonData =
      movie.type === "series" && movie.seasons && movie.seasons.length > 0
        ? `data-seasons='${JSON.stringify(movie.seasons)}'`
        : "";

    const card = document.createElement("div");
    card.className = "flex flex-col gap-4";

    card.innerHTML = `
      <div onclick="viewMovieDetail(this)" 
           data-title="${movie.title}" 
           data-type="${movie.type}" 
           data-poster="${movie.poster}" 
           data-trailer="${movie.trailer}" 
           data-genre='${JSON.stringify(movie.genre)}' 
           data-description="${movie.description}" 
           ${seasonData}
           class="border-md shadow-lg transition-transform duration-500 hover:scale-105 hover:brightness-75 overflow-hidden bg-center relative bg-cover h-[350px] w-[250px]" 
           style="background-image: url('${movie.trailer}');">
      </div>
      <div class="flex justify-between items-center">
        <h3>${movie.title}</h3>
        <ul class="flex gap-2">
          <li class="bg-red-600 p-1 rounded-md">HD</li>
          <li class="border-2 border-red-500 rounded-md p-1">
            <i class="fa-regular fa-clock mr-2"></i><span>${movie.duration}</span>
          </li>
        </ul>
      </div>
    `;
    cardsContainer.appendChild(card);
  });

  wrapper.appendChild(cardsContainer);
  section.appendChild(wrapper);
  section.classList.remove("hidden");

  // ✅ Re-attach filter button listeners
  const filterButtons = wrapper.querySelectorAll(".filterBtn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      renderRecommended(); // re-render with updated filter
    });
  });
}
