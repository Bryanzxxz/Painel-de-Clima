document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityInput = document.querySelector("#txtcity");
    const cityName = cityInput.value.trim();

    if (!cityName) {
        alert('É necessário digitar alguma cidade...');
        return;
    }

    const apiKey = 'b371fc7bb8278c40f1736f55d418c1d9';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Cidade não encontrada');

        const data = await response.json();

        // Desestruturação dos dados necessários
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Atualizando o conteúdo dos elementos com os dados da API
        document.querySelector('.cidade h1').textContent = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        document.querySelector('.tempinfo .temp h1').innerHTML = `${Math.round(temperature)}<sup>°</sup>`;
        document.querySelector('.tempinfo .info p').textContent = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
        document.querySelector('.infos2 .humidade h1').textContent = `${humidity}%`;
        document.querySelector('.infos2 .vento h1').textContent = `${windSpeed.toFixed(2)} Km/H`;

        // Limpar o campo de entrada
        cityInput.value = '';

    } catch (error) {
        alert('Erro ao buscar dados da cidade. Verifique o nome e tente novamente.');
        console.error(error);
    }
});
