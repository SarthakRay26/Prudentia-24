// function getLocation() {
//     if (navigator.geolocation) {
        
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }

function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}

async function getWeather() {
    try {
        const position = await getLocation();
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        document.getElementById("latitude").innerHTML = "Latitude: " + latitude;
        document.getElementById("longitude").innerHTML = "Longitude: " + longitude;

        var url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude+ "&longitude=" + longitude + "&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";
        var response = await fetch(url);
        if (response.ok) {
            var data = await response.json();
            if (data && data.current) {
                var temp = data.current.temperature_2m;
                var wind= data.current.wind_speed_10m;
                document.getElementById("Temperature").innerHTML = "Temperature: " + temp;
                document.getElementById("Wind_Speed").innerHTML = "Wind Speed: " + wind;
                
            } else {
                alert("Unexpected response from the weather API");
            }
        } else {
            alert("Weather API request failed with status: " + response.status);
        }
    } catch (error) {
        showError(error);
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    document.getElementById("latitude").innerHTML = "Latitude: " + latitude;
    document.getElementById("longitude").innerHTML = "Longitude: " + longitude;
}

// async function getWeather() {
//     getLocation();
    
//     var latitude = parseFloat(document.getElementById("latitude").innerHTML.split(": ")[1]);
//     var longitude = parseFloat(document.getElementById("longitude").innerHTML.split(": ")[1]);
//     console.log(longitude);
//     console.log(latitude);  
//     var url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude+ "&longitude=" + longitude + "&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";
//     console.log(url);
//     var response = await fetch(url);
//     if (response.ok) {
//         var data = await response.json();
//         if (data && data.current) {
//             var temp = data.current.temperature_2m;
//             console.log(temp);
//             console.log(data.current.wind_speed_10m);
            
//             alert("Temperature: " + temp + "°C");
//             alert(data.current.wind_speed_10m + "km/h");
//         } else {
//             alert("Unexpected response from the weather API");
            
//         }
//     } else {
//         alert("Weather API request failed with status: " + response.status);
//     }
// }

// async function getWeather() {
//     var latitude = document.getElementById("latitude").innerHTML;
//     var longitude = document.getElementById("longitude").innerHTML;
//     var url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
//     // var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=df61d9d44f038fc5dc7bb315f8dee404`;
//     // var url = "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=df61d9d44f038fc5dc7bb315f8dee404";
//     //var url = "https://api.openweathermap.org/data/2.5/forecast/climate?lat=" + latitude + "&lon=" +longitude+ "&appid=df61d9d44f038fc5dc7bb315f8dee404";
//     var response = await fetch(url);
//     if (response.ok) {
//         var data = await response.json();
//         if (data && data.main) {
//             var temp = data.main.temp;
//             var desc = data.weather[0].description;
//             alert("Temperature: " + temp + "°C" + "\n" + "Description: " + desc);
//         } else {
//             alert("Unexpected response from the weather API");
//         }
//     } else {
//         alert("Weather API request failed with status: " + response.status);
//     }
// }

function showError(error) {
switch(error.code) {
    case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
    case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
    case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
    case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
}
}