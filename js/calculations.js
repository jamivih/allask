function totalUpdate() {
    const drinkCap = document.querySelectorAll('.drinkCap');
    const drinkAlc= document.querySelectorAll('.drinkAlc');
    const drinkKcals = document.querySelectorAll('.drinkKcal');
    const drinkCount = document.querySelectorAll('.drinkCount');

    let totalCap = 0;
    let totalAlc = 0;
    let avgAlc = 0;
    let totalKcal = 0;
    let totalDrinks = 0;

    drinkCount.forEach((drink, index) => {

        // Check if corresponding drinkCap, drinkAlc, and drinkKcal exist for the current index
        if (drinkCap[index] && drinkAlc[index] && drinkKcals[index]) {
        const capacity = parseFloat(drinkCap[index].textContent) || 0;
        const alc = parseFloat(drinkAlc[index].textContent) || 0;
        const kcal = parseFloat(drinkKcals[index].textContent) || 0;
        const quantity = parseInt(drink.textContent) || 0;

        
        totalCap += quantity * capacity;
        totalAlc += alc * quantity;
        totalKcal += quantity * kcal;
        totalDrinks += quantity;

        avgAlc = totalDrinks > 0 ? totalAlc / totalDrinks : 0;
        } else {
            console.error(`drinkCap[${index}] or related data is undefined.`);
        }
    });

    document.getElementById('totalCap').textContent = `${totalCap.toFixed(3)} l`;
    document.getElementById('avgAlc').textContent = `${avgAlc.toFixed(1)}`;
    document.getElementById('totalKcal').textContent = `${totalKcal} kcal`;
    document.getElementById('totalDrinks').textContent = `${totalDrinks} kpl`;
}

function calculateTimeDifference() {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    // Parse the start and end times (assuming they are strings like "19.00", "22.00")
    let [startHour, startMinute] = start.split('.').map(Number);
    let [endHour, endMinute] = end.split('.').map(Number);
    console.log(start);
    // Convert both times to minutes since the start of the day
    let startInMinutes = startHour * 60 + startMinute;
    let endInMinutes = endHour * 60 + endMinute;

    // If end time is less than start time, it means the end time is on the next day
    if (endInMinutes < startInMinutes) {
        endInMinutes += 24 * 60;  // Add 24 hours in minutes to the end time
    }

    // Calculate the difference in minutes
    let timeDifferenceInMinutes = endInMinutes - startInMinutes;

    // Convert the difference back to hours
    let hours = Math.floor(timeDifferenceInMinutes / 60);
    let minutes = timeDifferenceInMinutes % 60;

    calculateAlcohol(hours, minutes)
}

function calculateAlcohol(hours, minutes) {

    ////////////////////////////////////////////////////////////////
    const genderInput = document.querySelector('input[name="gender"]:checked').value;
    const weightInputKg = document.getElementById('weight').value;
    const drinkTable = document.getElementById('myDrinks');
    const rows = drinkTable.getElementsByTagName('tr');
    let totalAlcCap = 0;
    console.log(`gender: ${genderInput}`);
    console.log(`hour difference: ${hours}`);

    // Calculating alcohol capacity for each drink in the table and summing it into a variable
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const capacity = parseFloat(cells[1].innerText);
        const volume = parseFloat(cells[2].innerText);
        const amount = parseFloat(cells[4].innerText);
        consumedAlc = (capacity * amount)*1000;
        alcoholCap = consumedAlc * volume * 0.01;

        totalAlcCap += alcoholCap;
    }
    console.log(`total alc capacity: ${totalAlcCap}`);

    let BAC = 0;
    const alcDensity = 0.789; 
    const rMale = 0.68;
    const rFemale = 0.55;

    const A = totalAlcCap * alcDensity
    console.log(A);

    if (genderInput == 'male') {
        BAC = ((A * 100) / (weightInputKg * rMale) - 0.015 * hours);
    } else {
        BAC = ((A * 100) / (weightInputKg * rFemale) - 0.015 * hours);
    }
    const hours2 = (0.015 * hours) * 10;
    
    // Convert BAC to permille
    const permille = (BAC / 1000) * 10 - hours2;
    const permilleOutput = document.getElementById('permille');
    permilleOutput.textContent = `Arvioitu alkoholin määrä veressä: ${permille.toFixed(2)} promillea.`;
    generateChart(permille, BAC);
}


function generateChart(permilleOutput) { // no time handling yet
    const timeStart = document.getElementById('start').value;
    const timeEnd = document.getElementById('end').value;
    const weightInput = document.getElementById('weight').value;
    const burningRate = permilleOutput*0.1 / 0.015;
    const alcoholBurned = parseFloat(timeEnd)+parseFloat(burningRate);
    console.log('alkoholi poistunut: ', alcoholBurned.toFixed(0));

    const ctx = document.getElementById('permillesChart').getContext('2d');
    const myStaticLineChart = new Chart(ctx, {
        type: 'line', // Type of chart
        data: {
            labels: [timeStart, timeEnd, alcoholBurned.toFixed(0)], // X-axis values (static)
            datasets: [{
                label: '', // Label for the dataset
                data: [0, permilleOutput, 0], // Y-axis values (static)
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true // Line without fill
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false // Hide the legend
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 0.5,
                            yMax: 0.5,
                            borderColor: 'red',
                            borderWidth: 0,
                            label: {
                                content: 'Rattijuopumusraja',
                                enabled: true,
                                position: 'end',
                                backgroundColor: 'rgba(255, 99, 132, 0)', // Fully opaque red background
                                color: 'black', // White text color
                                padding: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0
                            },
                            yAdjust: 10,
                            font: {
                                size: 10,
                                weight: 'bold',
                                family: 'Arial'

                            }
                        }}
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Aika' // X-axis label
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Promille' // Y-axis label
                    },
                    beginAtZero: true // Start Y-axis at 0
                }
            }
        }
    });
}