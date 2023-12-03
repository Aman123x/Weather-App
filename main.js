const loc=document.getElementById("fetch");
const weather=document.querySelector(".weather");
const weatherInfo=document.querySelector(".weather-info");

loc.addEventListener("click",function(){
    // weather.style.display="none";
    // weatherInfo.style.display="block";



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("Geolocation is not supported by this browser.");
    }
});

function showPosition(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;

     const newWindow = window.open('map.html', '_blank');
        if (newWindow) {
            newWindow.onload = function() {
                // Call a function in the new window to display the weather data
                newWindow.updateMapIframe(latitude, longitude);
            };
        }

    updateMapIframe(latitude, longitude);


    fetchWhetherData(latitude,longitude);
}

function updateMapIframe(latitude, longitude) {
    const iframe = document.getElementById('map');
    iframe.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
}



async function fetchWhetherData(lat,lon){
    const apiKey="42e3b9bf3522ca9991ae89bc3d2155d0";

    const apiUrl=`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`


    try{
        const response=await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
        }
        const data = await response.json();
        // Handle the weather data (e.g., display temperature, description, etc.)
        console.log(data);
    }
    catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
}