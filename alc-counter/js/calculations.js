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

    document.getElementById('totalCap').textContent = `${totalCap.toFixed(2)} l`;
    document.getElementById('avgAlc').textContent = `av. ${avgAlc.toFixed(1)}%`;
    document.getElementById('totalKcal').textContent = `${totalKcal} kcal`;
    document.getElementById('totalDrinks').textContent = `${totalDrinks} kpl`;
}