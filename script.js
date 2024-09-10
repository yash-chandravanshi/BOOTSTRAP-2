        
//  FETCHING USERS IP ADDRESS GETTING THE CITY NAME 
 function userIp(){
        fetch('https://api.ipify.org')
        .then((res)=> res.text())
        .then((ip) =>{ console.log(ip)
        
        fetch(`https://ipapi.co/${ip}/json/`)
        .then((res)=> res.json())
        .then((location) => {
            console.log("this is users location:",location.country_code)
            const userLocation = location.country_code.toLowerCase();
            const displayUserCountry = `https://flagcdn.com/48x36/${userLocation}.png`;
            document.querySelector(".CountryImage").src=displayUserCountry;
            const city = location.city;
            document.querySelector(".city").innerHTML = location.city;
// FETCHING WEATHER DATA ACCORDING TO CITY NAME
            const apiKey = "345f4bd9f57c95d848f8d116a26c1eff";
            const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

            const res = fetch(`${apiUrl}${city}&units=metric&appid=${apiKey}`)
            .then((res)=>res.json())
            .then((weatherData)=>{
                document.querySelector(".temp").innerHTML = weatherData.main.temp  + "°C";
                document.querySelector(".humidity").innerHTML = weatherData.main.humidity + "%";
                document.querySelector(".wind").innerHTML = weatherData.wind.speed + "km/h";
            })
        })
    })

   
}
window.addEventListener('load',userIp)

        const apiKey = "345f4bd9f57c95d848f8d116a26c1eff";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const searchBox = document.querySelector(".search input")
        const searchBtn = document.querySelector(".search button")
        const weatherIcon = document.querySelector(".weather-icon")
        async function checkWeather(city) {
            const query = searchBox.value.trim();
            if(query){
                const res = await fetch(apiUrl + city + `&appid=${apiKey}`)
            if ( res.status == 404){
                const elements = document.querySelectorAll(".e1,.e2,.e3,.e4");
                elements.forEach((element)=>{
                    element.style.display="block";
                })
                const hiddenElements = document.querySelectorAll(".city,.temp,.humidity,.wind,.countryImage")
                hiddenElements.forEach((hidden)=>{
                    hidden.style.display="none";
                })
            }else{
                
                var data = await res.json();
                var getCountry = data.sys.country.toLowerCase();
                console.log("this one",getCountry)
               
                const flagPng = `https://flagcdn.com/48x36/${getCountry}.png`
                console.log(flagPng)
                    document.querySelector(".countryImage").src=flagPng;

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "clouds.png"
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "clear.png"
            }
            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "rain.png"
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "drizzle.png"
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "mist.png"
            }

            const elements = document.querySelectorAll(".e1,.e2,.e3,.e4");
                elements.forEach((element)=>{
                    element.style.display="none";
                })
                const hiddenElements = document.querySelectorAll(".city,.temp,.humidity,.wind,.countryImage ")
                hiddenElements.forEach((hidden)=>{
                    hidden.style.display="block";
                })
            }
            }   
        }
        searchBox.addEventListener('keypress',function (event){
            if(event.key === 'Enter'){
                checkWeather(searchBox.value);
            }
        })
        searchBtn.addEventListener("click", ()=>{
            checkWeather(searchBox.value);
        })
