function followSpeaker(speakerName) {
    // Display an alert with the speaker's name
    alert(speakerName + " followed successfully!");
}


document.addEventListener("DOMContentLoaded", () => {
    // Scroll to Top Button Logic
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.textContent = '↑';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);

    // Show/Hide button on scroll
    window.addEventListener('scroll', () => {
        scrollToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });

    // Smooth scroll to top
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

   // Countdown Timer Logic
const eventDate = new Date("January 03, 2025 00:00:00").getTime();
const countdownContainer = document.getElementById('countdown');
const timerMessage = document.getElementById('timer-message');

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        // Event has passed
        const endBuffer = 24 * 60 * 60 * 1000; // 24 hours buffer after the event
        const endTime = eventDate + endBuffer;

        if (now <= endTime) {
            countdownContainer.style.display = 'none'; // Hide countdown
            timerMessage.textContent = "Event is live now!";
        } else {
            countdownContainer.style.display = 'none'; // Hide countdown
            timerMessage.textContent = "Event has ended.";
        }
    } else {
        // Event is in the future
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update countdown
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;

        timerMessage.textContent = "Event will start soon!";
    }
};

// Initialize countdown and update every second
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call to avoid 1-second delay


    // Social Feed Simulation Logic
    const fetchSocialFeed = () => {
        const mockData = {
            posts: [
                { image: 'Images/tech_speaker.jpg', text: 'Excited about Future TechFest 2025!' },
                { image: 'Images/countdown_event.jpg', text: 'Counting down days to Future TechFest!' },
                { image: 'Images/virtual_event.jpg', text: 'Join us for unforgettable experience.' }
            ]
        };

        // Mimic network delay
        setTimeout(() => {
            const feedContainer = document.getElementById('social-feed');
            mockData.posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('col-md-4');
                postElement.innerHTML = `
                    <div class="card">
                        <img src="${post.image}" class="card-img-top" alt="Post Image">
                        <div class="card-body">
                            <p class="card-text">${post.text}</p>
                        </div>
                    </div>
                `;
                feedContainer.appendChild(postElement);
            });
        }, 1000); // 1-second delay to mimic latency
    };

    // Initialize social feed
    fetchSocialFeed();
});

// Registration Form Validation
document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission

        // Form inputs
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");

        let valid = true;

        // Name validation (only letters and spaces)
        const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
        const nameError = document.getElementById("name-error");
        if (name.value.trim() === "") {
            name.classList.add("is-invalid");
            nameError.textContent = "Please enter your name.";
            nameError.style.display = "block"; // Show the error message
            valid = false;
        } else if (!nameRegex.test(name.value.trim())) {
            name.classList.add("is-invalid");
            nameError.textContent = "Name can only contain letters and spaces.";
            nameError.style.display = "block"; // Show the error message
            valid = false;
        } else {
            name.classList.remove("is-invalid");
            nameError.style.display = "none"; // Hide error if valid
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add("is-invalid");
            valid = false;
        } else {
            email.classList.remove("is-invalid");
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/; // Example: Indian phone numbers (10 digits)
        if (!phoneRegex.test(phone.value.trim())) {
            phone.classList.add("is-invalid");
            valid = false;
        } else {
            phone.classList.remove("is-invalid");
        }

        // If form is valid, show success message
        if (valid) {
            alert("Thank you for registering! We will contact you soon.");
            registrationForm.reset();
        }
    });
});

//weather forcast...

document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "e17f24cc28964f3680943509242612"; // Replace with your WeatherAPI key
    const location = "Mumbai";
    const eventDate = "2025-01-03"; // Event date in YYYY-MM-DD format

    // API URL for forecast
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=10&aqi=no&alerts=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecast = data.forecast.forecastday.find(day => day.date === eventDate);

            if (forecast) {
                const weatherIconUrl = forecast.day.condition.icon;
                const avgTemp = forecast.day.avgtemp_c;
                const description = forecast.day.condition.text;

                // Update HTML
                document.getElementById("weather-icon").innerHTML = `<img src="${weatherIconUrl}" alt="Weather Icon">`;
                document.getElementById("weather-temp").innerText = `${avgTemp}°C`;
                document.getElementById("weather-desc").innerText = description;
            } else {
                console.error("Forecast data for the event date not available.");
                document.getElementById("weather-section").innerText = "Weather data for the event day is unavailable.";
            }
        })
        .catch(error => console.error("Error fetching weather data:", error));
});


// Subscription form validation
document.addEventListener("DOMContentLoaded", () => {
    const subscriptionForm = document.getElementById("subscription-form");
    const nameInput = document.getElementById("subscriber-name");
    const emailInput = document.getElementById("subscriber-email");
    const preferencesSelect = document.getElementById("preferences");
    const commentsTextarea = document.getElementById("comments");
    const formMessage = document.getElementById("form-message");

    // Create a placeholder for the error message below the name field
    const nameErrorMessage = document.createElement("div");
    nameErrorMessage.classList.add("error-message");
    nameInput.parentElement.appendChild(nameErrorMessage);

    subscriptionForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission to simulate processing

        // Get form data
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const preferences = preferencesSelect.value;
        const comments = commentsTextarea.value.trim();

        // Validation patterns
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
        let valid = true;
        let errorMessage = ""; // Initialize error message variable

        // Reset all error messages
        nameErrorMessage.textContent = ""; // Clear name field error

        // Name validation (only letters and spaces)
        if (name === "") {
            valid = false;
            nameErrorMessage.textContent = "Please enter your name.";
        } else if (!nameRegex.test(name)) {
            valid = false;
            nameErrorMessage.textContent = "Name can only contain letters and spaces.";
        }

        // Email validation
        else if (!emailRegex.test(email)) {
            valid = false;
            errorMessage = "Please enter a valid email address.";
        }

        // Preferences validation
        else if (!preferences) {
            valid = false;
            errorMessage = "Please select your preferences.";
        }

        // If not valid, display the error message
        if (!valid) {
            formMessage.textContent = errorMessage || nameErrorMessage.textContent;
            formMessage.classList.remove("success");
            formMessage.classList.add("error");
        } else {
            // If valid, display success message
            formMessage.textContent = "Thank you for subscribing! We'll keep you updated.";
            formMessage.classList.remove("error");
            formMessage.classList.add("success");

            // Optionally, show an alert message
            alert("Thank you for subscribing!");

            // Reset form after submission
            subscriptionForm.reset();
        }
    });
});
