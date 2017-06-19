
$(document).ready(()=> {

	const weatherAPI = 'http://api.openweathermap.org/data/2.5/weather';

	console.log(apiKey);

	$('#weather-form').submit(function(event){
		event.preventDefault();
		var zipCode = $('#zipcode').val();
		var weatherUrl = `${weatherAPI}?zip=${zipCode},us&units=imperial&appid=${apiKey}`;
		$.getJSON(weatherUrl, (weatherData)=>{
			console.log(weatherData);
			var currentTemperature = weatherData.main.temp;
			var temps = {
				current: weatherData.main.temp,
				max: weatherData.main.temp_max,
				min: weatherData.main.temp_min,
			}
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon + '.png';
			var description = weatherData.weather[0].description;
			var newHTML = '<img src="http://openweathermap.org/img/w/' + icon + '">' + description;
			newHTML += '<div>The temp in ' + name + ' is currently ' + currentTemperature + '&deg;</div>';
			$('#temp-info').html(newHTML);
			currentPercent = 0;
			animateCircle(0, currentTemperature);

			var day2 = {

				
			}

			var day3 = {

			}

			var day4 = {

			}

			var day5 = {

			}



		});
	});

	var canvas = $('#weather-canvas');	
	var context = canvas[0].getContext('2d');
	var temperaturePlaceholder = 65;
	var currentPercent = 0;

	function animateCircle(currentArc, currentTemperature){

		// Draw inner circle
		context.fillStyle = "#ccc";
		context.beginPath();
		context.arc(250, 250, 200, Math.PI * 0, Math.PI * 2);
		context.closePath();
		context.fill();


		// Draw outer line

		context.lineWidth = 10;

		if (currentTemperature > 80) {
			context.strokeStyle = '#FF5722';
		} else if (currentTemperature < 45) {
			context.strokeStyle = '#18FFFF';
		} else {
			context.strokeStyle = '#B2FF59';
		}
	
		context.beginPath();
		context.arc(250, 250, 200, Math.PI*1.5, (Math.PI*1.5 + (Math.PI *2*currentArc)));
		context.stroke(); 


		// Update the current percentage
		currentPercent++
		if(currentPercent < currentTemperature){
			requestAnimationFrame(function() {
				animateCircle(currentPercent/100, currentTemperature);
			});
		}

	}

	animateCircle();




});



