import menuArray from "./data.js";
const foodList = document.getElementById("foodList")
const orderSummary = document.getElementById("orderSummary")
const orderItemsContainer = document.getElementById("orderItemsContainer")
const modalFade = document.getElementById("modalFade");
const modal = document.getElementById("modal")
const checkoutBtn = document.getElementById("checkoutBtn");
const payBtn = document.getElementById("payBtn")
const confirmationMsg = document.getElementById("confirmationMsg")

// hide order summary initially
orderSummary.style.display = 'none';
modalFade.style.display = 'none';
modal.style.display = 'none';
confirmationMsg.style.display = 'none';



let selectedFoods = [];

function renderMenu() {
    menuArray.forEach((menuItem) => {
        //console.log(menuItem.name);
        let splitIngriedients = menuItem.ingredients
        let foodItem = document.createElement('div');
        let foodInformation = document.createElement('div');
        let foodImage = document.createElement('p');
        let foodDescription = document.createElement('div');
        let foodTitle = document.createElement('h3');
        let foodIngriedients = document.createElement('p');
        let foodPrice = document.createElement('h4');
        let addBtn = document.createElement('div');
        let addIcn = document.createElement('img');

        // assigning the classes
        foodItem.classList.add('foodItem', 'flex');
        foodInformation.classList.add('foodInformation', 'flex')
        foodImage.classList.add('foodImage');
        foodImage.textContent = menuItem.emoji;
        foodDescription.classList.add('foodDescription');
        foodTitle.classList.add('foodTitle');
        foodTitle.textContent = menuItem.name;
        foodIngriedients.classList.add('foodIngriedients');
        foodIngriedients.textContent = splitIngriedients;
        foodPrice.classList.add('foodPrice');
        foodPrice.textContent = `$${menuItem.price}`;
        addBtn.classList.add('addBtn', 'flex');
        addIcn.src = './assets/plus-icon.svg';
        //Building the order
        foodInformation.appendChild(foodImage);
        foodInformation.appendChild(foodDescription);
        foodDescription.appendChild(foodTitle);
        foodDescription.appendChild(foodIngriedients);
        foodDescription.appendChild(foodPrice);
        foodItem.appendChild(foodInformation);
        foodItem.appendChild(addBtn)
        addBtn.appendChild(addIcn)
        addBtn.setAttribute('data-foodId', menuItem.id)
        foodList.appendChild(foodItem);

        //adding IDs to the selected foods array
        addBtn.addEventListener('click', function(event) {
            const foodId = event.currentTarget.getAttribute('data-foodId');
            selectedFoods.push(foodId); // Push the data-foodid to the array
            console.log(selectedFoods)
            renderCart()
            renderGrandTotal()
            confirmationMsg.style.display = "none"
        });
        
    })
}
renderMenu()




function renderCart() {
    orderItemsContainer.innerHTML = ''; // clear previous items

    if (selectedFoods.length === 0) {
        orderSummary.style.display = 'none';
    } else {
        orderSummary.style.display = 'block';
        selectedFoods.forEach((foodId) => {
            const foodItem = menuArray.find((item) => item.id === parseInt(foodId, 10));

            let orderItem = document.createElement('div');
            let itemInfo = document.createElement('div');
            let itemName = document.createElement('h3');
            let removeItem = document.createElement('p');
            let foodPriceTotal = document.createElement('h4');

            orderItem.classList.add('orderItem', 'flex');
            itemInfo.classList.add('itemInfo', 'flex');
            itemName.classList.add('itemName');
            removeItem.classList.add('removeItem');
            removeItem.textContent = 'remove';
            removeItem.setAttribute('data-foodId', foodItem.id);
            foodPriceTotal.classList.add('foodPriceTotal');
            foodPriceTotal.textContent = `$${foodItem.price}`;

            orderItemsContainer.appendChild(orderItem);
            orderItem.appendChild(itemInfo);
            itemInfo.appendChild(itemName);
            itemInfo.appendChild(removeItem);
            itemName.textContent = foodItem.name;
            orderItem.appendChild(foodPriceTotal);

            removeItem.addEventListener('click', function (event) {
                const foodIdToRemove = event.currentTarget.getAttribute('data-foodId');
                const indexToRemove = selectedFoods.indexOf(foodIdToRemove);
                if (indexToRemove !== -1) {
                    selectedFoods.splice(indexToRemove, 1);
                }
                renderCart();
                renderGrandTotal()
            });
        });
    }
}

function renderGrandTotal() {
    let totalPrice = 0;

    // Loop through each item in the order
    selectedFoods.forEach((foodId) => {
        const foodItem = menuArray.find((item) => item.id === parseInt(foodId, 10));
        totalPrice += foodItem.price; // Add the price of each item to the total price
    });

    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `$${totalPrice}`; // Display total price
}


// modal logic

checkoutBtn.addEventListener("click", function() {
    modalFade.style.display = 'block';
    modal.style.display = 'block';
})

// Logic for updateing the dom 
let userName = ""
let nameInput = document.getElementById("name")

payBtn.addEventListener("click", function(event){
    event.preventDefault()
    modalFade.style.display = 'none';
    modal.style.display = 'none';
    orderSummary.style.display = 'none';
    confirmationMsg.style.display = 'block';
    confirmationMsg.textContent = `Thank you ${nameInput.value}! Your order is on its way`;
    selectedFoods = [];
})
