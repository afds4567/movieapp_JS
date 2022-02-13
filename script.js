const APIURL="https://yts-proxy.now.sh/list_movies.json?sort_by=rating";
const SEARCHURL = "https://yts.mx/api/v2/list_movies.json?query_term=";

const main = document.getElementById('main');
const form = document.getElementById('form');
//queryselector(nodecolleciton 가져옴)는 불가능 => getelemntid로 성공 (단일 dom객체 가져와서)
const search = document.getElementById('search');

//initial 
getMovies(APIURL);

async function getMovies(url){
  const resp = await fetch(url);
  const respData = await resp.json();
	
	console.log(respData.data.movies);

	const movies = respData.data.movies;
	showMovies(movies);
	
  return movies;
}

function showMovies(movies) {
	main.innerHTML = '';
	for (const movie of movies) {
		const { large_cover_image, title, rating, summary } = movie;
		
		const movieEL = document.createElement("div");
		movieEL.classList.add("movie");
		movieEL.innerHTML = `
		<img
			src = "${large_cover_image}"
			alt = "${title}"
		/>
    <div class="movie-info">
			<h3>${title}</h3>
			<span class="${getColorByRate(rating)}">${rating}</span>
    </div>
		<div class="overview">
			<h4>Overview:</h4>
				${summary}
		</div>
		`;
		main.appendChild(movieEL);
	};
}

function getColorByRate(rate) {
	if (rate >= 8) {
		return "green";
	} else if (rate >= 5) {
		return "orange";
	} else {
		return "red";
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const searchTerm = search.value;

	if (searchTerm) {
		getMovies(SEARCHURL + searchTerm);
		search.value = '';
	}
})
