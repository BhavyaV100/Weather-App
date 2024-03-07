document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');

    searchButton.addEventListener('click', function() {
        const city = cityInput.value.trim();

        if (city === '') {
            alert('Please enter a city');
            return;
        }

        const apiKey = '00f9a6c0104d240b38aa254bd9591442';
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const cityName = data.name;
                const country = data.sys.country;

                weatherInfo.innerHTML = 
                `<h2>Weather in ${cityName}, ${country}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>`;
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                weatherInfo.innerHTML = '<p>Sorry an error occurred while fetching weather data.</p>';
            });
    });
});
