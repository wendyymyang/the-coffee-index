var coffeeIndexApp = {};

//Get information from the NomadList API on specific locations

coffeeIndexApp.getStarted = function() {
	$('.landing a').on('click', function() {
		$('#location').css('display', 'block');
		$('.landing').css('display', 'none');
	});
	coffeeIndexApp.accessApiInfo();
};

coffeeIndexApp.accessApiInfo = function() {
	$.ajax({
		url: 'https://nomadlist.com/api/v2/list/cities',
		method: 'GET',
		dataType: 'json'
	}).then(function(ApiData) { 
		coffeeIndexApp.populateCityOne(ApiData);
	});
}; 

//Populate the first region and city
coffeeIndexApp.populateCityOne = function(nomadInfoData) {
	var nomadResults = nomadInfoData.result;

	//When the first region is selected, populate the first city dropdown
	$('#regionNameOne').on('change', function() {
		$('#cityNameOne').empty();
		var $regionNameOneSelect = $('#regionNameOne').val();
		
		//Filter the results so that only the cities corresponding to
		//the selected region will show up
		filteredResults = nomadResults.filter(function(object) {
			return object.info.region.name === $regionNameOneSelect;
		});

		//Append the city names to the cityOne dropdown
		for (var i = 0; i < filteredResults.length; i++) {
			cityOneNames = [];
			cityOneNames.push(filteredResults[i].info.city.name);
			
			console.log(cityOneNames);

			var $filterCityOne = $('<option>').text(filteredResults[i].info.city.name).attr('value', filteredResults[i].info.city.name);
			
			$('#cityNameOne').append($filterCityOne);
		}
	});
	coffeeIndexApp.populateCityTwo(nomadInfoData);
};

//Populate the second city's dropdown based on the second region selected
coffeeIndexApp.populateCityTwo = function(nomadInfoData) {
	var cityDataTwo = nomadInfoData.result;

	//When the first city is selected, display, the second selections
	$('#cityNameOne').on('change', function() {
		$('.cityTwo').css('display', 'block');

		//When the second region is selected, allow the user to select
		//a second city as well
		$('#regionNameTwo').on('change', function() {
			$('#cityNameTwo').empty();
			var $regionNameTwoSelect = $('#regionNameTwo').val();

			//Filter the results so that only the cities corresponding to
			//the selected region will show up
			filteredResultsTwo = cityDataTwo.filter(function(objectTwo) {
				return objectTwo.info.region.name === $regionNameTwoSelect;
			});

			//Append the city names to the cityTwo dropdown
			for (var i = 0; i < filteredResultsTwo.length; i++) {
				var $filterCityTwo = $('<option>').text(filteredResultsTwo[i].info.city.name).attr('value', filteredResultsTwo[i].info.city.name);
				$('#cityNameTwo').append($filterCityTwo);
			}
		});
	});
	coffeeIndexApp.populateCitiesChar(nomadInfoData);
};

//Populate the coffee, Airbnb, wi-fi, image fields based on the two cities that were selected
coffeeIndexApp.populateCitiesChar = function(nomadInfoData) {
	var cityData = nomadInfoData.result;
	console.log(cityData);

	//When the second city is selected, populate the characteristics
	$('#cityNameTwo').on('change', function() {

		$('.cityComparison').css('display', 'block');
		$('.location').css('display', 'none');

		$('#location').animate({
		    scrollTop: $('#cityComparison').offset().top
		}, 1000);

		//SELECTED CITY VARIABLES
		var $cityNameOneSelect = $('#cityNameOne').val();
		var $cityNameTwoSelect = $('#cityNameTwo').val();

		//POPULATING CITY ONE CHARACTERISTICS
		$('.textContainerOne h5').append($cityNameOneSelect);

		//Coffee
		coffeeFilterOne = cityData.filter(function(coffeeOneObject) {
			return coffeeOneObject.info.city.name === $cityNameOneSelect;
		});

		var $cityOneCoffeePrice = $('<option>').text(coffeeFilterOne[0].cost.coffee_in_cafe.USD);
		
		$('.coffeeCostOne p').append($cityOneCoffeePrice);

		//Airbnb
		airbnbFilterOne = cityData.filter(function(airbnbOneObject) {
			return airbnbOneObject.info.city.name === $cityNameOneSelect;
		});
		
		var $cityOneAirbnbPrice = $('<option>').text(airbnbFilterOne[0].cost.airbnb_median.USD);

		$('.airbnbCostOne p').append($cityOneAirbnbPrice);

		//Wifi
		wifiFilterOne = cityData.filter(function(wifiOneObject) {
			return wifiOneObject.info.city.name === $cityNameOneSelect;
		});

		if (wifiFilterOne[0].scores.free_wifi_available < 0.5) {
			$('.freeWifiOne i').addClass('fa fa-thumbs-o-down');
		}		
		if (wifiFilterOne[0].scores.free_wifi_available <= 1) {
			$('.freeWifiOne i').addClass('fa fa-thumbs-o-up');
		}

		//Image
		imageFilterOne = cityData.filter(function(imgOneObject) {
			return imgOneObject.info.city.name === $cityNameOneSelect;
		});

		var $cityOneImg = $('<img>').attr({
			src: 'https://nomadlist.com' + imageFilterOne[0].media.image[1000],
			alt: $cityNameOneSelect + ' Image'
		});

		$('.imgContainerOne').append($cityOneImg);

		//POPULATING CITY TWO CHARACTERISTICS
		$('.textContainerTwo h5').append($cityNameTwoSelect);

		//Coffee
		coffeeFilterTwo = cityData.filter(function(coffeeTwoObject) {
			return coffeeTwoObject.info.city.name === $cityNameTwoSelect;
		});

		var $cityTwoCoffeePrice = $('<option>').text(coffeeFilterTwo[0].cost.coffee_in_cafe.USD);
		
		$('.coffeeCostTwo p').append($cityTwoCoffeePrice);

		//Airbnb
		airbnbFilterTwo = cityData.filter(function(airbnbTwoObject) {
			return airbnbTwoObject.info.city.name === $cityNameTwoSelect;
		});

		var $cityTwoAirbnbPrice = $('<option>').text(airbnbFilterTwo[0].cost.airbnb_median.USD);
		
		$('.airbnbCostTwo p').append($cityTwoAirbnbPrice);

		//Wi-fi
		wifiFilterTwo = cityData.filter(function(wifiTwoObject) {
			return wifiTwoObject.info.city.name === $cityNameTwoSelect;
		});

		if (wifiFilterTwo[0].scores.free_wifi_available < 0.5) {
			$('.freeWifiTwo i').addClass('fa fa-thumbs-o-down');
		}		
		if (wifiFilterTwo[0].scores.free_wifi_available <= 1) {
			$('.freeWifiTwo i').addClass('fa fa-thumbs-o-up');
		}

		//Image
		imageFilterTwo = cityData.filter(function(imgTwoObject) {
			return imgTwoObject.info.city.name === $cityNameTwoSelect;
		});

		var $cityTwoImg = $('<img>').attr({
			src: 'https://nomadlist.com' + imageFilterTwo[0].media.image[1000],
			alt: $cityNameTwoSelect + ' Image'
		});

		$('.imgContainerTwo').append($cityTwoImg);	
	});
};

//Initialize
coffeeIndexApp.init = function() {
	coffeeIndexApp.getStarted();
};

//Document ready
$(function() {
	coffeeIndexApp.init();
});

//THINGS TO UPDATE
//Make the design nicer
//Sort cities dropdown list alphabetically
//Smooth scrolling