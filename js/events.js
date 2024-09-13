// Ensure the form is hidden when the page reloads and load the drinks
window.onload = function() {
    document.getElementById('drinkForm').style.display = 'none';
    document.getElementById('cancelButton').style.display = 'none';

    let drinks = JSON.parse(localStorage.getItem('drinks')) || [];
    
    // Loop through the drinks array and add each drink to the table
    drinks.forEach(function(drink) {
        addDrinkToTable(drink);

        // Set the initial count from local storage
        const drinkCountId = document.getElementById(drink.dname);
        if (drinkCountId) {
            drinkCountId.textContent = drink.count || 0;
        }
    });

    totalUpdate(); // Update totals based on loaded data
    totalRow()
};

// Load the drink counts function (define it if it doesn't exist)
function loadDrinkCounts() {
    let drinks = JSON.parse(localStorage.getItem('drinks')) || [];
    drinks.forEach(function(drink) {
        // Update the drink count or other related data here if needed
        const drinkCountCell = document.getElementById(drink.dname);
        if (drinkCountCell) {
            drinkCountCell.textContent = localStorage.getItem(drink.dname) || "0";
        }
    });
}

