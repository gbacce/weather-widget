$(document).ready(()=>{

	// All API calls go to this link
	const apiBaseURL = 'http://api.themoviedb.org/3';

	// All images use this link
	const imageBaseURL = 'http://image.tmdb.org/t/p/';

	const nowPlayingURL = apiBaseURL + '/movie/now_playing?api_key='+apiKey;

	var buttonsHTML = '';
	for(let i = 0; i < genreArray.length; i++) {
		buttonsHTML += `<button class="btn btn-primary genre-button">${genreArray[i].name}</button>`
	}
	$('#genre-buttons').html(buttonsHTML);



	/// NOW PLAYING - Generate Default Posters ///

	$.getJSON(nowPlayingURL,(nowPlayingData)=>{
		var nowPlayingHTML = getHTML(nowPlayingData);
		$('#movie-grid').html(nowPlayingHTML);
		$('.movie-poster').click(function(){
			// Change the HTML inside of the modal
			var thisMovieId = $(this).attr("id");
			var thisMovieURL = `${apiBaseURL}/movie/${thisMovieId}?api_key=${apiKey}`;
			$.getJSON(thisMovieURL,(thisMovieData)=>{
				console.log(thisMovieData);
				$('#myModalLabel').html(thisMovieData.title);
				// Open the modal
				$('#myModal').modal();
			});
		});



		/// ISOTOPE ///

		$grid = $('#movie-grid').isotope({
			itemSelector: '.movie-poster'
		});

		$('.genre-button').click(function(){
			$grid.isotope({filter:'.'+this.innerText})
		});

		$('#all-genres').click(function(){
			$grid.isotope({filter:''})
		});


	});




	// SUBMIT BUTTON - Event Listener //
	$('#movie-form').submit((event)=>{
		// Don't submit form. JavaScript will handle it.
		event.preventDefault();
		// Inputs return vals. They are self-closing, so there is no HTML to return.
		var userInput = $('#search-input').val();
		$('#search-input').val('');
		// This converts spaces and other characters to URL safe text (such as %20).
		var urlSafeUserInput = encodeURI(userInput);
		var searchURL = `${apiBaseURL}/search/movie?query=${urlSafeUserInput}&api_key=${apiKey}`;

		
		$.getJSON(searchURL,(searchMovieData)=>{
			var searchMovieHTML = getHTML(searchMovieData);
			// console.log(searchMovieHTML);
			$('#movie-grid').html(searchMovieHTML);
		});
	});


	/// CREATE HTML - Utility Function ///
	function getHTML(data){
		var newHTML = '';
		for(let i = 0; i < data.results.length; i++){

			// Create a variable for genre ID's for this movie
			var thisMovieGenres = data.results[i].genre_ids;

			// Loop through all known genres.
			for(let j=0; j < genreArray.length; j++) {

			// Compare genre of movie j against each genre in array. If there is a match, return the name of the genre.
				if (thisMovieGenres.indexOf(genreArray[j].id) > -1 ){
					var movieGenreClassList;
					movieGenreClassList += (genreArray[j].name + " ").toLowerCase();
				}
			}
			var posterURL = imageBaseURL + 'w300' + data.results[i].poster_path;
			newHTML += `<div class="col-sm-6 col-md-3 ${movieGenreClassList}movie-poster" id="${data.results[i].id}">`;
				newHTML += `<img src="${posterURL}">`;
			newHTML += `</div>`;
		}
		return newHTML;
	}

});






