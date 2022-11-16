

// console.log(cart);
/*

function getLocalStorage() {
    fetch("http://localhost:3000/api/products/") //
        .then(function (res) {
            if (res.ok) { // Propriété booléenne True or False
                return res.json() // Cela retourne la réponse en tant qu'objet
            }
        })


}

getLocalStorage();

const newBasket = document.getElementsByClassName('cart')

let addBasket = document.getElementById('cart__items')

addBasket.innerHTML = `

     <article class="cart__item" id="${basket.id}" data-id="${dataSetId}" data-color="${dataSetColor}">
      <div class="cart__item__img">
        <img src="${basket.imageUrl}" alt="${cart.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${cart.name}</h2>
          <p>${basket.colors[0]}</p>
          <p class="prix">${basket.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;

    newBasket.appendChild(addBasket);
//*****************BOUCLE FOREACH*****************//




/*

const produitPanier = `
      <article class="cart__item" id="${XX}" data-id="${XX}" data-color="${XX}">
      <div class="cart__item__img">
        <img src="${produit.productImg}" alt="${produit.productImgAltTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${produit.productName}</h2>
          <p>${produit.productColor}</p>
          <p class="prix">${data.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.productQuantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;

*/




// //****************** Get info from API ******************//
//
// fetch('http://localhost:3000/api/products/')  // fetch("http://localhost:3000/api/products/XXXXX")
//     .then((getProduct) =>{
//         // console.log(getId);  // Check the return of the API via a console.log
//         return getProduct.json();
//     }).then((basket)=> {
//     console.log(basket);
//
//     }).then(function (products) {
//         for (let product of products) {
//             insertProductDom(product)
//         }
// });
//
//
//
// function getBasket() {
//     let basket = localStorage.getItem("basket");
//     if (basket == null) {
//         return [];
//
//     }else{
//         return JSON.parse(basket);
//     }
// }
// //****************** Add product to cart ******************//
//
//
// // function addBasket(product){
// //     let basket = getBasket();
// //     let foundProduct = basket.find(p => p.id === product.id);
// //     if (foundProduct !== undefined) {
// //         foundProduct.quantity++;
// //
// //     } else {
// //         product.quantity = 1;
// //         basket.push(product);
// //     }
// //     saveBasket(basket);
// // }
//
// //****************** Delete basket's product ******************//
// //
// // function removeFromBasket(product){
// //     let basket = getBasket();
// //     basket = basket.filter(p => p.id !== product.id);
// //     saveBasket(basket);
// // }
// //
// // //****************** Change Quantity  ******************//
// //
// // function ChangeQuantity(product, quantity){
// //     let basket = getBasket()
// //     let foundProduct = basket.find(p => p.id === product.id);
// //     if (foundProduct !== undefined)  {
// //         foundProduct.quantity += quantity;
// //         if (foundProduct.quantity <= 0) {
// //             removeFromBasket(foundProduct);
// //         }else{
// //             saveBasket(basket);
// //         }
// //
// //     }
// // }
// //
// // //****************** Product Quantity ******************//
// //
// // function getNumberProduct(){
// //     let basket = getBasket();
// //     let number = 0;
// //     for (let product of basket) {
// //         number += product.quantity;
// //
// //     }
// //     return number;
// // }
// //
// // //****************** Get Total Price ******************//
// //
// // function getTotalPrice(){
// //     let basket = getBasket();
// //     let total = 0;
// //     for (let product of basket) {
// //         total += product.quantity * product.price;
// //
// //     }
// //     return total;
// // }
//
// //****************** Create Tag ******************//
//
// function insertProductDom(product){
//
// //****************** Create Article Tag ******************//
//
//     let article = document.createElement('article');
//     article.classList.add('cart__item');
//     article.dataset.id = id;
//     article.dataset.color = colors;
//
// //****************** Create Div 1 ******************//
//
//     let divImg = document.createElement('div');
//     divImg.classList.add('cart__item__img');
//
//     let img = document.createElement('img');
//     img.src = product.imageUrl;
//     img.alt = product.altTxt;
//
// //****************** Create Div 2 ******************//
//
//     let divDescription = document.createElement('div');
//     divDescription.classList.add('cart__item__content__description');
//
//     let hTwo = document.createElement('h2');
//     let pColor = document.createElement('p');
//     let pPrice = document.createElement('p');
//     hTwo.innerHTML = product.name;
//     pColor.innerHTML = product.colors;
//     pPrice.innerHTML = product.price;
//
//
//
//
// //****************** Create Div 3 ******************//
//
//     let divSettings = document.createElement('div');
//     divSettings.classList.add('cart__item__content__settings__quantity')
//
//     let pQte = document.createElement('p');
//     let tagInput = document.createElement('input');
//     tagInput.classList.add('itemQuantity');
//     tagInput.type = ('number');
//     tagInput.name = ('itemQuantity');
//     tagInput.min = '1';
//     tagInput.max = '100'
//     tagInput.value = '42'
//
// //****************** Create Div 3 ******************//
//
//     let divDelete = document.createElement('div');
//     divDelete.classList.add('cart__item__content__settings__delete');
//     let pDelete = document.createElement('p');
//     pDelete.classList.add('deleteItem');
//
//
// }
//
// form.firstName.addEventListener('change', function () { // Écoute de mon input firstName
//     validFirstName(this);
// });
//
// const validFirstName = function (inputFirstName) {
//     let firstNameRegExp = new RegExp(/^[a-z ,.'-]+$/i);
//
//     let testFirstName = firstNameRegExp.test(inputFirstName.value);
//     // let followParaFirst = inputFirstName.nextElementSibling;
//     let followParaFirst = document.getElementById('firstNameErrorMsg');
//
//     if (testFirstName) {
//         followParaFirst.innerHTML = 'Prénom Valide';
//     } else {
//         followParaFirst.innerHTML = 'Prénom non Valide';
//     }
// };