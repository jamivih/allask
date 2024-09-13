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
