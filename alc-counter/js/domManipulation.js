// Button functions
// Increase button for drink-table
function addDrink(button, drinkName) {
    const drinkCountId = document.getElementById(drinkName);
    if (drinkCountId) {
        let currentValue = parseInt(drinkCountId.textContent) || 0;
        currentValue += 1;
        drinkCountId.textContent = currentValue + ' kpl';

        updateLocalStorage(drinkName, currentValue);
        totalUpdate();
    } else {
        console.error(`Element with id ${drinkName} not found.`);
    }
}

function deleteDrink(button, drinkName) {
    const drinkCountId = document.getElementById(drinkName);
    if (drinkCountId) {
        let currentValue = parseInt(drinkCountId.textContent) || 0;
        if (currentValue > 0) {
            currentValue -= 1;
            drinkCountId.textContent = currentValue;

            updateLocalStorage(drinkName, currentValue);
        }
    } else {
        console.error(`Element with id ${drinkName} not found.`);
    }
}

// Increase button function for add drink-form
function increaseValue(fieldId) {
    let input = document.getElementById(fieldId);
    let value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    input.value = value + 1;
}


// Decrease button function for add drink-form
function decreaseValue(fieldId) {
    let input = document.getElementById(fieldId);
    let value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    if(value > 0) {
        input.value = value - 1;
    }
}

// Resets all drink quantities
function emptyList() {
    const drinkElements = document.querySelectorAll('.drinkCount');

    drinkElements.forEach(drinkElement => {
        drinkElement.innerHTML = 0;
        const drinkId = drinkElement.id;
        updateLocalStorage(drinkId, 0);
        
    });
}

// Toggle the visibility of the total-table-row
function totalRow() {
    const totalRow = document.getElementById('total-row');
    const drinkTable = document.getElementById('myDrinks');

    if (drinkTable.rows.length < 2) {
        totalRow.classList.add('hidden');
    } else {
        totalRow.classList.remove('hidden');
    }
}

// Form functions
// Toggle the visibility of the drink-form
function addDrinkForm() {
    let form = document.getElementById('drinkForm');
    let cancelButton = document.getElementById('cancelButton');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        cancelButton.style.display = 'block';
    } else {
        form.style.display = 'none';
        cancelButton.style.display = 'none';
    }
}

function hideAddDrinkForm() {
    document.getElementById('drinkForm').style.display = 'none';
    document.getElementById('cancelButton').style.display = 'none';
}

