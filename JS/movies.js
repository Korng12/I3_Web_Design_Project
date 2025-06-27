// const sectionData = {
//   trending: [
//     { title: "Medelin", poster: "Project_movieMate/img/Medelin.png" },
//     { title: "FastX", poster: "Project_movieMate/img/fastx.png" },
//     { title: "The Black", poster: "Project_movieMate/img/the_black.png" },
//     { title: "Avatar", poster: "Project_movieMate/img/avatar.png" },
//   ],
//   topRated: [
//     { title: "Loki", poster: "Project_movieMate/img/LokiPoster.png" },
//     { title: "Ghosted", poster: "Project_movieMate/img/GhostedPoster.png" },
//     // ...
//   ]
// };

const movies = [
  { title: "Avatar", 
    type: "movie",
    genre: ["Action","Sci Fi"], 
    trailer: "img/avatar.png", 
    poster: "img/avatar.png", 
    description: "Hello this is action genre...",
    year:2019,
    rating: 8.8,
    views: 120000,
    duration: "3:12:00"
  },
    { title: "Interstellar", 
    type: "movie",
    genre: ["Adventure","Sci Fi"], 
    trailer: "img/interstellar.jpg", 
    poster: "img/InterstellarPoster.jpg", 
    description: "Hello this is action genre...",
    year:2019,
    rating: 8.7,
    views: 120000,
    duration: "3:12:00"
  },
  { title: "love Again", 
    type: "movie",
    genre:["Drama","Comedy",] , 
    trailer: "img/loveAgain.png", 
    poster:"img/LoveAgainPoster.png", 
    description: "hello this is drama genre..." ,
    year:2019,
    rating: 8.5,
    views: 100000,
    duration: "2:30:00"
  },
  { title: "love Again", 
    type: "movie",
    genre: ["Drama","Comedy"], 
    trailer: "img/loveAgainPoster.png", 
    poster:"img/LoveAgainPoster.png", 
    description: "hello this is drama genre..." ,
    year:2019,
    rating: 8.5,
    views: 100000,
    duration: "2:30:00"
  },
   { title: "Johnwick", 
    type: "movie",
    genre: ["Action","Advanture","Crime"], 
    poster:"img/JohnWickPoster.png", 
    trailer: "img/johnwick.png", 
    description: "hello this is drama Action Genre..." ,
    year:2022,
    rating: 8.7,
    views: 130000,
    duration: "2:30:00"
  },
  { title: "Ghosted", 
    type: "movie",
    genre: ["Action","Comedy","Crime"], 
    poster:"img/GhostedPoster.png", 
    trailer: "img/ghosted.png", 
    description: "hello this is drama Action Genre..." ,
    year:2022,
    rating: 8.9,
    views: 140000,
    duration: "2:30:00"
  },
  {
    title: "The Flash",
    type: "series",

    genre: ["Action", "Fantasy","Series"],
    poster: "img/The-Flash-Movie-Poster.png",
    trailer: "img/theFlash.png",
    description: "Superhero character and, more specifically, a television series centered on Barry Allen, a forensic scientist who gains super speed after being struck by lightning.",
    year: 2021,
    rating: 9.0,
    views: 150000,
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          { title: "Episode 1: Glorious Purpose", duration: "45 min" },
          { title: "Episode 2: The Variant", duration: "50 min" }
        ]
      },
      {
        seasonNumber: 2,
        episodes: [
          { title: "Episode 1: Ouroboros", duration: "47 min" }
        ]
      }
    ]
  },
  {
    title: "Loki",
    type: "series",

    genre: ["Action", "Fantasy","Series"],
    poster: "img/LokiPoster.png",
    trailer: "img/LokiPoster.png",
    description: "Loki steps out of his brother’s shadow...",
    year: 2021,
    rating: 9.2,
    views: 160000,
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          { title: "Episode 1: Glorious Purpose", duration: "45 min" },
          { title: "Episode 2: The Variant", duration: "50 min" }
        ]
      },
      {
        seasonNumber: 2,
        episodes: [
          { title: "Episode 1: Ouroboros", duration: "47 min" }
        ]
      }
    ]
  },
  { title: "The batman", 
    type: "movie",
    genre: ["Action","Crime"], 
    trailer: "img/the_batman_poster.jpg", 
    poster: "img/the_batman_poster.jpg", 
    description: "Hello this is action genre...",
    year:2019,
    rating: 10.0,
    views: 120000
  },


];