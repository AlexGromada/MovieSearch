const resultsBox = document.getElementById('resultsBox');

async function getMovieInfo(title) {
    resultsBox.innerHTML = '';
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&api_key=eea685060b091949574d2e769dcddf2e`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success === false) {
            throw new Error(`API error: ${data.status_message}`);
        }

        data.results
            .filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()))
            .forEach(movie => {
                const movieContainer = document.createElement('a');
                movieContainer.setAttribute('href', `moviePage.html?id=${movie.id}`)
                movieContainer.setAttribute('class', 'movieContainer');
                resultsBox.append(movieContainer);

                const moviePoster = document.createElement('img');
                if (movie.poster_path) {
                    moviePoster.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
                }
                else {
                    moviePoster.setAttribute('src', `no_img_available.jpg`)
                }

                const movieTitle = document.createElement('h3');
                movieTitle.setAttribute('class', 'movieTitle')
                movieTitle.innerHTML = movie.title;

                const movieReleaseDate = document.createElement('h5');
                movieReleaseDate.setAttribute('class', 'movieReleaseDate')
                movieReleaseDate.innerHTML = movie.release_date;

                movieContainer.append(moviePoster, movieTitle, movieReleaseDate)
            });
    } catch (error) {
        console.error(error);
        resultsBox.innerHTML = '<h1>Error, unable to get data from API</h1>'
    }
}


const movieSearch = document.getElementById('movieSearch')
let timeoutId;

movieSearch.addEventListener('input', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        getMovieInfo(movieSearch.value);
    }, 300);
});