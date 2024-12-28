// Check if deadline is already stored in localStorage
let DEADLINE = localStorage.getItem("deadline");

// If no deadline exists, set a new one (359 days from now)
if (!DEADLINE) {
    DEADLINE = new Date().getTime() + 359 * 24 * 60 * 60 * 1000; // 359 days in milliseconds
    localStorage.setItem("deadline", DEADLINE);
} else {
    DEADLINE = parseInt(DEADLINE, 10); // Parse stored deadline as a number
}

// Update the timer display
function updateTimer() {
    const now = new Date().getTime();
    const remainingTime = DEADLINE - now;

    if (remainingTime > 0) {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        document.getElementById("day_timer").textContent = days.toString().padStart(2, '0');
        document.getElementById("hour_timer").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minute_timer").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("second_timer").textContent = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById("day_timer").textContent = "00";
        document.getElementById("hour_timer").textContent = "00";
        document.getElementById("minute_timer").textContent = "00";
        document.getElementById("second_timer").textContent = "00";
        clearInterval(timerInterval); // Stop the timer

        // Add a new H1 tag with "გილოცავთ !!!"
        const main = document.querySelector("main");
        const congratulations = document.createElement("h1");
        congratulations.textContent = "გილოცავთ !!!";
        congratulations.style.color = "green"; // Optional: Make it visually distinct
        congratulations.style.textAlign = "center"; // Center align the text
        main.appendChild(congratulations);

        console.log("Deadline reached!");
        localStorage.removeItem("deadline"); // Clear the deadline after it expires
    }
}

// Call updateTimer every second
const timerInterval = setInterval(updateTimer, 1000);
updateTimer(); // Initial call to display timer immediately