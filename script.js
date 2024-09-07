// Function to update the local storage with the current count for a drink
function updateLocalStorage(drinkName, count) {
    localStorage.setItem(drinkName, count);
}

// Function to get the count from local storage (or return 0 if not set)
function getDrinkCount(drinkName) {
    return localStorage.getItem(drinkName) ? parseInt(localStorage.getItem(drinkName)) : 0;
}

function addDrink(button, drinkName) {
    const row = button.closest('tr');
    const drinkCountId = row.querySelector('.drinkCount');
    let currentValue = parseInt(drinkCountId.innerHTML);
    currentValue += 1;
    drinkCountId.innerHTML = currentValue;
    updateLocalStorage(drinkName, currentValue);
    
}

function deleteDrink(button, drinkName) {
    const row = button.closest('tr');
    const drinkCountId = row.querySelector('.drinkCount');
    let currentValue = parseInt(drinkCountId.innerHTML);
    if (currentValue > 0) {
        currentValue -= 1;
        drinkCountId.innerHTML = currentValue;
        updateLocalStorage(drinkName, currentValue);
    }
}

 // Function to load the drink counts from local storage when the page loads
 function loadDrinkCounts() {
    const drinkElements = document.querySelectorAll('.drinkCount');
            
    // Loop through each drink element and load the stored count from localStorage
    drinkElements.forEach(drinkElement => {
        const drinkId = drinkElement.id; // Use the ID as the drink name
        const count = getDrinkCount(drinkId); // Get the count from local storage
        drinkElement.innerHTML = count; // Set the count in the table
    });
}

function emptyList() {
    const drinkElements = document.querySelectorAll('.drinkCount');

    drinkElements.forEach(drinkElement => {
        drinkElement.innerHTML = 0;
        const drinkId = drinkElement.id;
        updateLocalStorage(drinkId, 0);
    });
}

// Load the drink counts when the page is loaded
window.onload = loadDrinkCounts;