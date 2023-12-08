    let allContainerCart = document.querySelector('.products');
    let containerBuyCart = document.querySelector('.card-items');
    let priceTotal = document.querySelector('.price-total')
    let amountProduct = document.querySelector('.count-product');
    allContainerCart.addEventListener('click', addProduct);
    containerBuyCart.addEventListener('click', deleteProduct);
    let buyThings = [];
    let totalCard = 0;
    let countProduct = 0;   
 
    function addProduct(e){
        e.preventDefault();
        if (e.target.classList.contains('btn-add-cart')) {
            
            const selectProduct = e.target.parentElement; 
            readTheContent(selectProduct);        
        }
        
    }

    function deleteProduct(e) {
        if (e.target.classList.contains('delete-product')) {
            const deleteId = e.target.getAttribute('data-id');

            buyThings.forEach(value => {
                if (value.id == deleteId) {
                    let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                    totalCard =  totalCard - priceReduce;
                    totalCard = totalCard.toFixed(2);
                }
            });
            buyThings = buyThings.filter(product => product.id !== deleteId);
            
            countProduct--;
        }
        
        if (buyThings.length === 0) {
            priceTotal.innerHTML = 0;
            amountProduct.innerHTML = 0;
        }
        loadHtml();
    }

    function readTheContent(product){
        const infoProduct = {
            image: product.querySelector('div img').src,
            title: product.querySelector('.title').textContent,
            price: product.querySelector('div p span').textContent,
            id: product.querySelector('a').getAttribute('data-id'),
            amount: 1
        }

        totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
        totalCard = totalCard.toFixed(2);

        const exist = buyThings.some(product => product.id === infoProduct.id);
        if (exist) {
            const pro = buyThings.map(product => {
                if (product.id === infoProduct.id) {
                    product.amount++;
                    return product;
                } else {
                    return product
                }
            });
            buyThings = [...pro];
        } else {
            buyThings = [...buyThings, infoProduct]
            countProduct++;
        }
        loadHtml();
        //console.log(infoProduct);
    }

    function loadHtml(){
        clearHtml();
        buyThings.forEach(product => {
            const {image, title, price, amount, id} = product;
            const row = document.createElement('div');
            row.classList.add('item');
            row.innerHTML = `
                <img src="${image}" alt="">
                <div class="item-content">
                    <h5>${title}</h5>
                    <h5 class="cart-price">${price}$</h5>
                    <h6>Amount: ${amount}</h6>
                </div>
                <span class="delete-product" data-id="${id}">X</span>
            `;

            containerBuyCart.appendChild(row);

            priceTotal.innerHTML = totalCard;

            amountProduct.innerHTML = countProduct;
        });
    }
    function clearHtml(){
        containerBuyCart.innerHTML = '';
    }

    function descontar() {
        let agotado = "agotado";
        let poco_x5 = document.getElementById("poco_x5").innerHTML; ;
        poco_x5--;
    
        if (poco_x5 === 0) {
            document.getElementById("poco_x5").innerHTML = agotado;
        } else {
            document.getElementById("poco_x5").innerHTML = poco_x5;
        }
    }
  
    
const input = document.querySelector("input");

input.addEventListener("input", (event) => {
  // Obtener el valor del input
  const value = event.target.value;
    
  // Hacer algo con el valor
  

  const categoria = [
    {
        imgSrc: "img/xiaomi_poco_x5.jpg",
        price: 325,
        title: "Celular Xiaomi Poco X5 5G 256Gb / 8Ram / 48Mp Color Verde",
        quantityId: "poco_x5",
        btnDataId: "pocox5"
    },
    {
        imgSrc: "img/iphone13.png",
        price: 914,
        title: "Celular Apple iPhone 13 128gb Cámara 12mpx Color Azul",
        quantityId: "iphone13",
        btnDataId: "iphone13"
    },
    {
        imgSrc: "img/uricurales1.jpg",
        price: 12.50,
        title: "Audifonos Inpods 12 Bluetooth 5.0 Multicolor Touch Color Negro",
        quantityId: "numero2",
        btnDataId: "3"
    },
    {
        imgSrc: "img/auricurales2.jpg",
        price: 20,
        title: "Audifonos Inalambricos AUT120 Bluetooth 1Hora Negro",
        quantityId: "numero2",
        btnDataId: "4"
    },
    {
        imgSrc: "img/xiaomi_note12.jpg",
        price: 200,
        title: "Celular Xiaomi Note 12 4/128gb - Garantia 1 año",
        quantityId: "numero2",
        btnDataId: "5"
    },
    {
        imgSrc: "img/audifonos3.jpg",
        price: 28,
        title: "Audífonos Auriculares Manos Libres Bluetooth Tipo Airpods Tactiles",
        quantityId: "numero2",
        btnDataId: "6"
    },
    {
        imgSrc: "img/tecno.jpeg",
        price: 138,
        title: "Celular Tecno Spark 10c 128Gb 16 Ram Negro + Audífonos",
        quantityId: "numero2",
        btnDataId: "7"
    },
    {
        imgSrc: "img/airprods_pro_1.jpeg",
        price: 37.90,
        title: "Audifonos Bluetooth Airprods Pro 1:1",
        quantityId: "numero2",
        btnDataId: "20"
    },
    {
        imgSrc: "img/airprods_pro.jpg",
        price: 29.95,
        title: "Airpods Pro Para Iphone 1:1 Audifonos Inalambricos + Estuche De Obsequio",
        quantityId: "numero2",
        btnDataId: "21"
    },
    {
        imgSrc: "img/inpods_12.jpg",
        price: 12.48,
        title: "Audifonos Inpods 12 Bluetooth 5.0 Multicolor Touch Color Negro",
        quantityId: "numero2",
        btnDataId: "22"
    },
    ];

const category = categoria.filter((item) => {
    return item.title.split(" ")[0] === value;
  });
  
  for (let i = 0; i < category.length; i++) {
    sample.innerHTML += `
        <div class="carts">
            <div>
                <img src="${category[i].imgSrc}" alt="product 1">
                <p><span>$${category[i].price}</span></p>
            </div>
            <p class="title">${category[i].title}</p>
            <p class="amount">Quantity : <br><br>${category[i].quantityId} </p>
            <a href="#" data-id="30" class="btn-add-cart">add to cart</a>
        </div>
        `;
  }
});