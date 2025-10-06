const contentContainer = document.getElementById('content');
const id = new URLSearchParams(window.location.search).get('id');

async function getMovieData() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=eea685060b091949574d2e769dcddf2e`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success === false) {
            throw new Error(`API error: ${data.status_message}`);
        }

        const moviePoster = document.createElement('img');
        if (data.poster_path) {
            moviePoster.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.poster_path}`)
        }
        else {
            moviePoster.setAttribute('src', `no_img_available.jpg`)
        }


        const infoContainer = document.createElement('div')
        infoContainer.setAttribute('class', 'infoContainer')

        const movieTitle = document.createElement('h3');
        movieTitle.setAttribute('class', 'movieTitle')
        movieTitle.innerHTML = data.title;

        const movieReleaseDate = document.createElement('h5');
        movieReleaseDate.setAttribute('class', 'movieReleaseDate')
        movieReleaseDate.innerHTML = data.release_date;

        const movieOverview = document.createElement('p');
        movieOverview.setAttribute('class', 'movieOverview');
        movieOverview.innerHTML = data.overview;

        infoContainer.append(movieTitle, movieReleaseDate, movieOverview);

        contentContainer.append(moviePoster, infoContainer)
    } catch(error){
        console.error(error);
        contentContainer.innerHTML = '<h1>Server ran into a problem while trying to get this films data</h1>'
    }
}

getMovieData();