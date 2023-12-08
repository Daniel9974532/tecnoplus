function saveLocalStorage(key, value_to_save) {
    localStorage.setItem(key, JSON.stringify(value_to_save));
}

function getLocalStorage(key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}

let products = getLocalStorage('products') || [];
let message = document.getElementById('message');

//Añadir un producto
const addProductInput = document.getElementById('addProduct');
const addValueInput = document.getElementById('addValue');
const addStockInput = document.getElementById('addStock');
const addImageInput = document.getElementById('addImage');

document.getElementById("addButton").addEventListener("click", function (event) {
    event.preventDefault();
    let productToAdd = addProductInput.value;
    let valueToAdd = addValueInput.value;
    let stockToAdd = addStockInput.value;
    let imageToAdd = addImageInput.value;

    let isValid = true;

    if (productToAdd === '' || valueToAdd === '' || stockToAdd === '' || imageToAdd === '') {
        message.classList.add('fillFields');
        setTimeout(() => { message.classList.remove('fillFields') }, 2500);
        isValid = false;
    } else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].name === productToAdd) {
                message.classList.add('duplicateError');
                setTimeout(() => { message.classList.remove('duplicateError') }, 2500);
                isValid = false;
            }
        }
    }

    if (isValid) {
        products.push({
            name: productToAdd,
            value: valueToAdd,
            stock: stockToAdd,
            imageUrl: imageToAdd
        });
        message.classList.add('success');
        setTimeout(() => {
            message.classList.remove('duplicateError');
            window.location.reload();
        }, 1500);
    }
    saveLocalStorage('products', products);
});


// Editar
const productEditInput = document.getElementById('productEdit');
const attributeEditInput = document.getElementById('attributeEdit');
const newAttributeInput = document.getElementById('newAttribute');

document.getElementById("editButton").addEventListener("click", function (event) {
    event.preventDefault();
    let productToEdit = productEditInput.value;
    let attributeToEdit = attributeEditInput.value;
    let newAttributeValue = newAttributeInput.value;
    let isValid = false;

    if (productToEdit === '' || attributeToEdit === '' || newAttributeValue === '') {
        message.classList.add('fillFields');
        setTimeout(() => { message.classList.remove('fillFields') }, 2500);
    } else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].name === productToEdit) {
                products[i][attributeToEdit] = newAttributeValue;
                isValid = true;
            }
        }

        if (isValid) {
            message.classList.add('success');
            setTimeout(() => {
                message.classList.remove('success');
                window.location.reload();
            }, 1500);
        } else {
            message.classList.add('notExistsError');
            setTimeout(() => { message.classList.remove('notExistsError') }, 2500);
        }

        saveLocalStorage('products', products);
    }
});


// Eliminar
const productToDeleteInput = document.getElementById('productToDelete');

document.getElementById("deleteButton").addEventListener("click", function (event) {
    event.preventDefault();
    let productToDelete = productToDeleteInput.value;
    let isValid = false;

    for (let i = 0; i < products.length; i++) {
        if (products[i].name === productToDelete) {
            products.splice(i, 1);
            isValid = true;
        }
    }

    if (isValid == false) {
        message.classList.add('notExistsError');
        setTimeout(() => { message.classList.remove('notExistsError') }, 2500);
    } else {
        message.classList.add('success');
        setTimeout(() => {
            message.classList.remove('success');
            window.location.reload();
        }, 1500);
    }

    saveLocalStorage('products', products);
});

// mostrar productos
window.addEventListener("load", () => {
    const productEditSelect = document.getElementById('productEdit');
    const productDeleteSelect = document.getElementById('productDelete');

    for (let i = 0; i < products.length; i++) {
        productEditSelect.innerHTML += `<option>${products[i].name}</option>`;
        productDeleteSelect.innerHTML += `<option>${products[i].name}</option>`;
    }

    Object.keys(products[0]).forEach(element => {
        attributeEditInput.innerHTML += `<option>${element}</option>`;
    });

    let showProducts = document.getElementById('showProducts');
    showProducts.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        showProducts.innerHTML += `
        <div class="carts">
            <div>
                <img src="${products[i].imageUrl}" alt="product 1">
                <p><span>$${products[i].value}</span></p>
            </div>
            <p class="title">${products[i].name}</p>
            <p class="amount">Quantity : <br><br>${products[i].stock} </p>
            <a href="#" data-id="30" class="btn-add-cart">add to cart</a>
        </div>
        `;
    }
});
