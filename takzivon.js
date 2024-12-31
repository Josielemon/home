// אנחנו בונים ניהול תקציב!
// make 4 inputs: description, amount, expanse/income, date.
// make a button "הוסף תנועה"
// when a user clicks the button - add a new component that will show the description,amount, and date.
// הוספתי כרטיס גנרי שאפשר להשתמש בו למי שלא רוצה ליצור חדש כרגע
// IF - the transaction is expanse - show it with 'minus' (e.g -1500)
// ELSE - show it without 'minus' (e.g 1500)
const description = document.getElementById('description')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const income = document.getElementById('income')
const date = document.getElementById('date')
const addButton = document.getElementById('add-line')
const moneyList = document.getElementById('money-list')
const footer = document.getElementById('total-footer')
let inOrOut
let balance = 0
let movmentNumber = 0
let newAmount
let transactionType

function newLine(description, amount, date, movmentNumber, transactionType) {
    console.log('movment num = ', movmentNumber)
    return `<div class="transaction-card" id="transaction-card-${movmentNumber}">
                <img class="money-image" width="60px" src="https://png.pngtree.com/png-vector/20240320/ourmid/pngtree-money-stacks-banknotes-pile-concept-png-image_11965189.png" alt="">
                <div>${description}</div>
                <div>Amount: ${amount}</div>
                <div>${transactionType}
                    </div>
                <div>${date}</div>
            </div>`
}

function color(movmentNumber, transactionType) {
    console.log('movmentNumber in color', movmentNumber)
    const elementId = `transaction-card-${movmentNumber}`
    console.log('Element ID:', elementId)
    const card = document.getElementById(elementId)
    console.log('Card element:', card)

    if (transactionType === 'income') {
        card.style.backgroundColor = 'lightgreen'
    } else if (transactionType === 'expense') {
        card.style.backgroundColor = '#FFB6B6'
    }
}

function incomeOrExpense() {
    movmentNumber += 1
    let newAmount = Number(amount.value)
    if (!amount.value || amount.value === 0) {
        console.log('no amount added')
        return null
    }
    if (expense.checked) {
        newAmount *= -1
        transactionType = 'expense'
    } else if (income.checked) {
        transactionType = 'income'
    } else {
        console.log('Please select income or expense')
        return null
    }
    return {
        newAmount,
        transactionType,
        movmentNumber,
    }
}

addButton.onclick = function () {
    let newAmount = Number(amount.value)
    const result = incomeOrExpense(newAmount, movmentNumber, transactionType)
    console.log(result.transactionType)
    transactionType = result.transactionType
    console.log(result.newAmount)
    balance += Number(result.newAmount)
    console.log(balance)
    moneyList.innerHTML += newLine(
        description.value,
        result.newAmount,
        date.value,
        movmentNumber,
        result.transactionType
    )
    const footer = document.getElementById('total-footer')
    if (balance <= -1500) {
        footer.innerHTML = ` ₪${balance.toFixed(
            2
        )}you have exceeded your allowance`
        footer.style.backgroundColor = 'red'
    } else {
        footer.innerHTML = `₪${balance.toFixed(2)}`
        footer.style.backgroundColor = '#4a6cf7' // Reset to original color
    }
    color(movmentNumber, transactionType)
}
// בונוס מגניב
// IF its expanse = the background is (a bit!) red
// IF its income = the background is (a bit!) green
// add an html element that shows the SUM of all the expanses and the incomes
// (you can use document.getElementsByClassName to grab all the amounts...)
// add a threshold of 1500 NIS. IF the user sets sum expanses bigger than this - notify him that he exceeded the max amount!
