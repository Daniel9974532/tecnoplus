function saveLocalStorage(key, value_to_save) {
    localStorage.setItem(key, JSON.stringify(value_to_save));
}

function getLocalStorage(key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}

let products = getLocalStorage('products') || [];
let container = document.getElementById('container');

window.addEventListener('load', () => {
    for (let i = 0; i < products.length; i++) {
        show.innerHTML += `
        <div class="carts">
            <div>
                <img src="${products[i].imageUrl}" alt="product 1">
                <p><span>$${products[i].value}</span></p>
            </div>
            <p class="title">${products[i].name}</p>
            <p class="amount">Quantity: <br><br>${products[i].stock}</p>
            <a href="#" data-id="30" class="btn-add-cart">add to cart</a>
        </div>`;
    }
});

const header = document.querySelector("#header");
const body = document.querySelector("body");

window.addEventListener("scroll", function () {
    // Your scroll event code goes here
});


