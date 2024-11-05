document.addEventListener('DOMContentLoaded', () => {
  const zipcode = document.querySelector("#zipcode");
  const button = document.querySelector("#zipBtn");
  const infoCard = document.querySelector("#infoCard");
  const weatherBackground = document.getElementById("weatherBackground");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const errorMessage = document.getElementById("errorMessage");

  // h1 title/logo reload button
  document.getElementById("reloadBtn").onclick = function() {
    const button = document.getElementById("reloadBtn");
    button.classList.add("fade-out");  // Add the fade-out class
    setTimeout(() => {
        location.reload();  // Reload the page after the animation
    }, 600);  // Timeout matches the animation duration (0.6 seconds)
};

  // Weather effect generators
  const weatherEffects = {
      Clear: () => {
          weatherBackground.className = 'weather-background weather-clear';
          const sun = document.createElement('div');
          sun.className = 'sun';
          return [sun];
      },
      Clouds: () => {
          weatherBackground.className = 'weather-background weather-clouds';
          const clouds = [];
          for (let i = 0; i < 5; i++) {
              const cloud = document.createElement('div');
              cloud.className = 'cloud';
              cloud.style.top = `${Math.random() * 50}%`;
              cloud.style.animationDelay = `${i * 2}s`;
              cloud.style.opacity = `${0.5 + Math.random() * 0.5}`;
              clouds.push(cloud);
          }
          return clouds;
      },
      Rain: () => {
          weatherBackground.className = 'weather-background weather-rain';
          const raindrops = [];
          for (let i = 0; i < 100; i++) {
              const raindrop = document.createElement('div');
              raindrop.className = 'raindrop';
              raindrop.style.left = `${Math.random() * 100}%`;
              raindrop.style.animationDelay = `${Math.random() * 2}s`;
              raindrops.push(raindrop);
          }
          return raindrops;
      },
      Snow: () => {
        weatherBackground.className = 'weather-background weather-snow';
        const snowflakes = [];
        const snowflakeCharacters = ['❄', '❅', '❆', '•'];
        
        for (let i = 0; i < 80; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            
            // Randomly select a snowflake character
            snowflake.innerHTML = snowflakeCharacters[Math.floor(Math.random() * snowflakeCharacters.length)];
            
            // Random positioning
            snowflake.style.left = `${Math.random() * 100}%`;
            
            // Random animation duration between 5 and 15 seconds
            const duration = 5 + Math.random() * 10;
            snowflake.style.animationDuration = `${duration}s`;
            
            // Random animation delay
            snowflake.style.animationDelay = `${Math.random() * 5}s`;
            
            // Random horizontal drift
            const drift = Math.random() * 50 - 25; // drift left or right up to 25px
            snowflake.style.transform = `translateX(${drift}px)`;
            
            snowflakes.push(snowflake);
        }
        return snowflakes;
    },
    Mist: () => {
      weatherBackground.className = 'weather-background weather-mist';
      const mist = [];
      for (let i = 0; i < 50; i++) {
        const mistParticle = document.createElement('div');
        mistParticle.className = 'mist-particle';
        mistParticle.style.left = `${Math.random() * 100}%`;
        mistParticle.style.top = `${Math.random() * 100}%`;
        mistParticle.style.animationDelay = `${Math.random() * 5}s`;
        mistParticle.style.animationDuration = `${5 + Math.random() * 5}s`;
        mist.push(mistParticle);
      }
      return mist;
    }
  };

    // Adding a var to track the last known weather state
    let lastKnownWeather = null;

  // Update background based on weather condition
  function updateBackground(weatherCondition) {
    // Only update if we have a valid weather condition
    if (weatherCondition && weatherEffects[weatherCondition]) {
        lastKnownWeather = weatherCondition;
        weatherBackground.innerHTML = '';
        const effectGenerator = weatherEffects[weatherCondition]|| weatherEffects.Clear;
        const effects = effectGenerator();
        effects.forEach(effect => weatherBackground.appendChild(effect));
    }
}

  // Update weather icon and card
  function updateWeatherInfo(data) {
      const weatherIcons = {
          Clear: 'sun',
          Clouds: 'cloud',
          Rain: 'cloud-rain',
          Snow: 'snowflake'
      };

      // Update location and main temperature
      document.querySelector("#location").textContent = data.name;
      document.querySelector("#temperature").textContent = Math.round(data.main.temp);

      // Update weather details
      document.querySelector("#windspeed").textContent = `${data.wind.speed} mph`;
      document.querySelector("#feelslike").textContent = `${Math.round(data.main.feels_like)}°F`;
      document.querySelector("#humidity").textContent = `${data.main.humidity}%`;
      document.querySelector("#pressure").textContent = `${data.main.pressure} hPa`;
      document.querySelector("#visibility").textContent = `${(data.visibility / 1000).toFixed(1)} km`;

      // Update weather icon
      const iconName = weatherIcons[data.weather[0].main] || 'cloud';
      document.querySelector("#weatherIcon").innerHTML = `<i class="fas fa-${iconName}"></i>`;

      // Show the card with animation
      infoCard.classList.remove("hidden");
  }

  // Fetch weather data from API
  async function getWeatherData(zipCode) {
    try {
        loadingOverlay.style.display = 'flex';
        errorMessage.textContent = '';

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=10d8beea1817fae16684102120bc9863&units=imperial`
        );

        if (!response.ok) {
            throw new Error('Invalid ZIP code or unable to fetch weather data');
        }

        const data = await response.json();
        const weatherCondition = data.weather[0].main;
        console.log('Weather condition:', weatherCondition);
        
        updateBackground(weatherCondition);
        updateWeatherInfo(data);

    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = error.message;
        infoCard.classList.add("hidden");
        // Don't update background on error - it will maintain the last known state
    } finally {
        loadingOverlay.style.display = 'none';
    }
  }

  // Form submission handler
  button.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Validate ZIP code
      const zipPattern = /^\d{5}$/;
      if (!zipPattern.test(zipcode.value)) {
          errorMessage.textContent = "Please enter a valid 5-digit ZIP code";
          return;
      }

      getWeatherData(zipcode.value);
  });

  // Add input validation
  zipcode.addEventListener('input', () => {
      zipcode.value = zipcode.value.replace(/[^\d]/g, '').slice(0, 5);
      errorMessage.textContent = '';
  });

  // Initialize with a default background
  updateBackground(null);
  lastKnownWeather = null;

  // Add keyboard support
  zipcode.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          button.click();
      }
  });

  // Add smooth transitions for background changes
  weatherBackground.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'background-color') {
          weatherBackground.style.transition = 'none';
          setTimeout(() => {
              weatherBackground.style.transition = 'background-color var(--transition-speed) ease';
          }, 50);
      }
  });
});