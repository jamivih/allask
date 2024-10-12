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


function editDrink(editButton) {
    // Get the row of the drink that needs to be edited
    const row = editButton.parentElement.parentElement;
    const cells = row.getElementsByTagName('td');

    // Replace the text in each cell with an input field
    const dname = cells[0].textContent;
    const dcap = cells[1].textContent.replace(' l', ''); // Remove ' l' from the display
    const dalc = cells[2].textContent.replace('%', ''); // Remove '%' from the display
    const dkcal = cells[3].textContent.replace(' kcal', ''); // Remove ' kcal' from the display

    cells[0].innerHTML = `<input type="text" value="${dname}" id="editDname">`;
    cells[1].innerHTML = `<input type="number" value="${dcap}" id="editDcap" step="0.01">`;
    cells[2].innerHTML = `<input type="number" value="${dalc}" id="editDalc" step="0.01">`;
    cells[3].innerHTML = `<input type="number" value="${dkcal}" id="editDkcal" step="1">`;

    // Change the button text and onclick event to 'Save'
    editButton.textContent = 'Save';
    editButton.onclick = function() { saveEdit(editButton); };
}

function saveEdit(saveButton) {
    // Get the row and input fields
    const row = saveButton.parentElement.parentElement;
    const cells = row.getElementsByTagName('td');

    // Get the updated values from the input fields
    const dname = document.getElementById('editDname').value;
    const dcap = document.getElementById('editDcap').value;
    const dalc = document.getElementById('editDalc').value;
    const dkcal = document.getElementById('editDkcal').value;

    // Update the row cells with the new values (and format them back to text)
    cells[0].textContent = dname;
    cells[1].textContent = `${parseFloat(dcap).toFixed(2)} l`;
    cells[2].textContent = `${parseFloat(dalc).toFixed(1)}%`;
    cells[3].textContent = `${parseFloat(dkcal).toFixed(0)} kcal`;

    // Change the button text back to 'Edit' and restore the edit functionality
    saveButton.textContent = 'Edit';
    saveButton.onclick = function() { editDrink(saveButton); };

    // Update the drink in localStorage
    updateDrinkInStorage(dname, dcap, dalc, dkcal);
}



// Decrease button for drink-table
function deleteDrink(button, drinkName) {
    const drinkCountId = document.getElementById(drinkName);
    if (drinkCountId) {
        let currentValue = parseInt(drinkCountId.textContent) || 0;
        if (currentValue > 0) {
            currentValue -= 1;
            drinkCountId.textContent = currentValue + ' kpl';

            updateLocalStorage(drinkName, currentValue);
        }
    } else {
        console.error(`Element with id ${drinkName} not found.`);
    }
}

// Increase button function for add drink-form
function increaseValue(fieldId) {
    let input = document.getElementById(fieldId);
    let value = parseFloat(input.value, 10);
    value = isNaN(value) ? 0 : value;

    if (input.id === 'dalc') {
        input.value = (value + 0.1).toFixed(1);
    } else {
        input.value = value + 1;
    }
}


// Decrease button function for add drink-form
function decreaseValue(fieldId) {
    let input = document.getElementById(fieldId);
    let value = parseFloat(input.value, 10);
    value = isNaN(value) ? 0 : value;
    if(value > 0 && input.id === 'dalc') {
        input.value = (value - 0.1).toFixed(1);
    } else if (value > 0 && input.id === 'dcap') {
        input.value = value - 1;
    }
}

// Resets all drink quantities
function emptyList() {
    const drinkElements = document.querySelectorAll('.drinkCount');

    drinkElements.forEach(drinkElement => {
        drinkElement.innerHTML = 0 + ' kpl';
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
    document.getElementById('drinkForm').reset();
}

