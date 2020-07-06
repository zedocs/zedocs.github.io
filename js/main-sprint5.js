
function calcAmount() {
    let price = 1000;
    let amountInput = document.querySelector("input[name='amount-input']");
    let amountNumber = parseInt(amountInput.value);

    //    if (isNaN(amountNumber)) {
    //        amountNumber=0;
    //    }
    amountNumber = isNaN(amountNumber) ? 0 : amountNumber;
    showSumPrice(price, amountNumber);

}

function showSumPrice(price = 1000, amountNumber=1) {
    amountNumber=amountNumber || 0; 
    let showAmount = document.querySelector("span.show-amount")
    if (amountNumber > 10) {
        alert("Maximum 10 terméket vásárolhat!");
    } else if (amountNumber < 1) {
        alert("Minimum 1 terméket kell vásárolnia!");
    } else {
        let amount = amountNumber * price;
        showAmount.innerHTML = amount;
    }

}