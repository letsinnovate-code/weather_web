

const searchBtn = document.querySelector(".search");
const inputValue = document.querySelector(".city_name");
const API_KEY = `ee776f55501df664931d5a5629d4ef09`;

function getWeatherDetails (name ,lat , lon){

   
    const url = `https://easy-weather1.p.rapidapi.com/daily/5?latitude=${lat}&longitude=${lon}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ffca0c2181mshc8d532270606f5cp1b7334jsn3ee9b294e7a3',
		'x-rapidapi-host': 'easy-weather1.p.rapidapi.com'
	}
};


fetch(url, options)
.then(response=>response.json())
.then(data=>{
    console.log(data)

    data.


})
.catch(err=>console.log(err))

}



    function getCity(){
        const cityName = inputValue.value.trim();
        if(!cityName) return;
        console.log(cityName);

       
        
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`,)
           .then((response) => response.json())
           .then((data) => { console.log(data)
            if(data.length == 0) return alert(`no cordinates found for ${cityName}`);
               
                const {name , lat ,lon}=data[0]
            getWeatherDetails(name, lat , lon);
           })
           .catch((error) => console.log(error));
       
    }

    searchBtn.addEventListener("click",getCity);



    




