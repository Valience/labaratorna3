let products = [
    {
        id: 1,
        name: "banana",
        image: "media\\banana.png",
        description: "Just what you need after gym",
        category: "fruit",
        price: 300
    },
    {
        id: 2,
        name: "grapes",
        image: "media\\grapes.png",
        description: "Try, to became Rome Imperior",
        category: "fruit",
        price: 300
    },
    {
        id: 3,
        name: "peach",
        image: "media\\peach.png",
        description: "Too much sweet isn't always bad",
        category: "fruit",
        price: 400
    },
    {
        id: 4,
        name: "carrot",
        image: "media\\carrot.png",
        description: "Eat to improve vision",
        category: "vegetable",
        price: 300
    },
    {
        id: 5,
        name: "watermelon",
        image: "media\\watermelon.png",
        description: "Don't eat at night",
        category: "fruit",
        price: 300
    },
    {
        id: 6,
        name: "onion",
        image: "media\\onion.png",
        description: "Smells bad, but taste delicious",
        category: "vegetable",
        price: 300
    },
    {
        id: 7,
        name: "cabbage",
        image: "media\\cabbage.png",
        description: "Purple outside green inside",
        category: "vegetable",
        price: 300
    },
    {
        id: 8,
        name: "cucumber",
        image: "media\\cucumber.png",
        description: "Very hydrated vegetable",
        category: "vegetable",
        price: 300
    },
    {
        id: 9,
        name: "tomato",
        image: "media\\tomato.png",
        description: "Good for salad and have a lot of vitamins",
        category: "vegetable",
        price: 300
    },
    {
        id: 10,
        name: "Pomegranate",
        image: "media\\pomegranate.png",
        description: "Special fruit",
        category: "exotic",
        price: 600
    },
    {
        id: 11,
        name: "Pomelo",
        image: "media\\pomelo.png",
        description: "Special fruit",
        category: "exotic",
        price: 700
    },
    {
        id: 12,
        name: "Passionfruit",
        image: "media\\passionFruit.png",
        description: "Special fruit",
        category: "exotic",
        price: 500
    }
]


function loadProducts(category, priceLower, priceHigher) {
    let container = document.getElementById("container");
    let innerHtmlContainer = "<div class='grid-row'>";
    let productsFiltered = [];
    if(category) {
        productsFiltered = products.filter(elem => elem.category === category);
    } else {
        productsFiltered = products;
    }
    let i = 0;
    productsFiltered.forEach(elem => {
        i += 1;
        let elemHtml = `<div class="elem-card"><img width="80px" height="60px" src="${elem.image}"/>
        <p class="elem-card-title">${elem.name}</p>
        <p class="elem-card-text">${elem.description}</p>
        <button class="btn" onclick="addToCart(${elem.id})">Add to cart</button>
        </div>`;
        innerHtmlContainer += elemHtml;
        if(i % 3 == 0){
            innerHtmlContainer += "</div><div class='grid-row'>";
        }
    });
    innerHtmlContainer += "</div>"
    container.innerHTML = innerHtmlContainer;
}

loadProducts();

// function loadCard(){
//     let cardContainer = document.getElementById("shopping-cart");
//     let containerHtml = '';
    
//     let i = 0;
//     card.forEach(elem => {
//         i += 1;
//         containerHtml = '<div class="box"><i class="fas fa-trash"></i><img src="${elem.image}"/><div class="content"><h3>${elem.name}</h3><span class="price">${elem.price}</span><span class="quantity">${i}</span></div></div>';
//     });

//     cardContainer.innerHTML = containerHtml;
// }

let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');
let checkoutCart = document.querySelector('.checkOut');

let listProduct = [];
let carts = [];

iconCart.addEventListener('click', () =>{
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

checkoutCart.addEventListener('click', () => {
    alert("Success");
    body.classList.toggle('showCart')
    listCartHTML.innerHTML = "";
    iconCartSpan.innerHTML = 0;
})

const addToCart = (id) => {
    let position = carts.findIndex((value) => value.id == id);
    if(carts.length <= 0){
        carts = [{
            id: id,
            quantity: 1
        }]
    }else if(position < 0){
        carts.push({
            id: id,
            quantity: 1
        });
    }else{
        carts[position].quantity = carts[position].quantity + 1;
    }
    addCartToHTML();
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0)
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div')
            newCart.classList.add('item');
            let positionProduct = products.findIndex((value) => value.id == cart.id)
            let info = products[positionProduct];
            let data = `<div class="image"><img src="${info.image}" alt=""></div>
            <div class="name">${info.name}</div>
            <div class="totalPrice">${info.price * cart.quantity}</div>
            <div class="quantity"><span class="minus">-</span><span>${cart.quantity}</span><span class="plus">+</span></div>`;
            newCart.innerHTML = data;
            listCartHTML.appendChild(newCart);
        })
    iconCartSpan.innerText = totalQuantity;
}


const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeButton = document.getElementById('close-btn');
const closeTimeout = 5000;

function showModal() {
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
}

let count = 5;
const timerCount = setInterval(function() {
  count--;
  closeButton.textContent = `Close (${count})`;
  if (count === 0) {
    clearInterval(timerCount);
    console.log("Close ready!");
  }
}, 1000);

let timer = setTimeout(() => {
    closeButton.textContent = "Close";
    closeButton.style.color = "#000";
    closeButton.addEventListener('click', closeModal);
}, 5000);

// showModal();