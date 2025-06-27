function loadComponent(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (typeof callback === "function") {
        callback(); 
      }
    })
    .catch(err => console.error(`Failed to load ${file}`, err));
}


    // Load components
 window.addEventListener("DOMContentLoaded", () => {
  
  loadComponent("header", "header.html");
  loadComponent("mainContent", "content.html",()=>{
    renderRecommended(movies.filter(m => m.type === "movie"));
    loadComponent("newReleaseMovies","newReleaseMovieCard.html");
    loadComponent("slider-wrapper","carousel.html",initCarousel)
    loadComponent("trendingMovie","trendingMovieCard.html");
    loadComponent("newReleaseSeries","newReleaseSerieCard.html");
    loadComponent("recommendedMovies","recommendedCard.html");
    loadComponent("features","projectFeatures.html");

  } ); // <-- pass callback here
  loadComponent("footer", "footer.html");
  // loadComponent("newReleaseMovie","newReleaseMovieCard.html");
});
