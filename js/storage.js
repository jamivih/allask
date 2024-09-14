// Function to update the local storage with the current count for a drink
function updateLocalStorage(drinkName, count) {
    let drinks = JSON.parse(localStorage.getItem('drinks')) || [];

    // Find the drink in the array and update its count
    const drink = drinks.find(d => d.dname === drinkName);
    if (drink) {
        drink.count = count;
    }

    localStorage.setItem('drinks', JSON.stringify(drinks));
    totalUpdate(); // Update totals if necessary
}

// Function to get the count from local storage (or return 0 if not set)
function getDrinkCount(drinkName) {
    return localStorage.getItem(drinkName) ? parseInt(localStorage.getItem(drinkName)) : 0;
}

// Function to save form data and update the table
function saveFormData() {
    const dname = document.getElementById('dname').value;
    const dcap = parseFloat(document.getElementById('dcap').value) / 100;
    const dalc = document.getElementById('dalc').value;
    let dkcal = parseFloat(document.getElementById('dkcal').value);
    const calorietype = document.getElementById('calorietype').value;

    if (calorietype === 'per100ml') {
        dkcal = dkcal * (dcap * 10);
    }

    if (!dname || isNaN(dcap) || isNaN(dalc) || isNaN(dkcal)) {
        alert('Täytä kaikki tiedot.');
    } else {
        const newDrink = {
            dname: dname,
            dcap: dcap,
            dalc: dalc,
            dkcal: dkcal,
            count: 0
        };

        // Get the existing drinks from localStorage, or initialize an empty array if none exist
        let drinks = JSON.parse(localStorage.getItem('drinks')) || [];

        // Add the new drink to the array
        drinks.push(newDrink);

        // Save the updated drinks array to localStorage
        localStorage.setItem('drinks', JSON.stringify(drinks));

        // Update the table to include the new drink
        addDrinkToTable(newDrink);

        // Reset form after submission
        document.getElementById('drinkForm').reset();
        hideAddDrinkForm();
    }
}
// Define the function to add a drink to the table globally
function addDrinkToTable(drink) {
    const table = document.getElementById('myDrinks').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const lineBreak = document.createElement('br');

    const cell1 = newRow.insertCell(0);
    cell1.textContent =`${drink.dname}`;

    const cell2 = newRow.insertCell(1);
    cell2.classList.add('drinkCap');
    cell2.textContent = `${drink.dcap} l`;

    const cell3 = newRow.insertCell(2);
    cell3.classList.add('drinkAlc');
    cell3.textContent = `${drink.dalc}%`;

    const cell4 = newRow.insertCell(3);
    cell4.classList.add('drinkKcal');
    cell4.textContent = `${drink.dkcal.toFixed(0)} kcal`;

    const cell5 = newRow.insertCell(4);
    // Set the ID of the cell for drink count to the name of the drink
    cell5.id = drink.dname;
    cell5.classList.add('drinkCount');
    cell5.textContent = '0 kpl'; // Initial count is 0

    const cell6 = newRow.insertCell(5); //+, -, and remove buttons
    // Add button for drinks-table
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.setAttribute('id', 'addDrink');
    addButton.setAttribute('onclick', `addDrink(this, '${drink.dname}')`);

    // Delete button for drinks-table
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '-';
    deleteButton.setAttribute('id', 'deleteDrink');
    deleteButton.setAttribute('onclick', `deleteDrink(this, '${drink.dname}')`);

    // Remove button for drinks-table
    const removeButton = document.createElement('button');
    removeButton.textContent = 'R';
    removeButton.setAttribute('id', 'removeDrink');
    removeButton.setAttribute('onclick', `removeDrink('${drink.dname}')`);

    // Append buttons to the cell6
    cell6.appendChild(addButton);
    cell6.appendChild(deleteButton);
    cell6.appendChild(document.createElement('br'))
    cell6.appendChild(document.createElement('br'))
    cell6.appendChild(removeButton);
    cell6.appendChild(document.createElement('br'))
}

// Function to remove a drink from the table and local storage
function removeDrink(drinkName) {
    const table = document.getElementById('myDrinks').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cell = rows[i].getElementsByTagName('td')[4]; // Adjust index if needed
        if (cell && cell.id === drinkName) {
            table.deleteRow(i);
            console.log('drink deleted', drinkName)
            break; // Exit loop once the row is removed
        }
    }

    // Remove from local storage
    let drinks = JSON.parse(localStorage.getItem('drinks')) || [];
    drinks = drinks.filter(drink => drink.dname !== drinkName); // Filter out the drink to remove
    localStorage.setItem('drinks', JSON.stringify(drinks));

    totalUpdate(); // Update totals if necessary
}