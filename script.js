
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ffca0c2181mshc8d532270606f5cp1b7334jsn3ee9b294e7a3',
		'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Delhi',options)
.then(response=>response.json() )
.then(result=>console.log(result))
.catch(err=>console.log(err));