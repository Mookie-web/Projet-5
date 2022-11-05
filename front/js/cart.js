// 1 : Récupérer le localstorage
// 2 : Récupérer les infos des produits VIA L'API(FETCH)
// 2 A : Créer une fonction pour afficher les informations dans le DOM
// 3 : Afficher les infos du localstorage avec le prix de l'API

//*****************Get LocalStorage*****************//
let cart = JSON.parse(localStorage.getItem('basket'))

//*****************Get info via fetch*****************//


// function deleteItem(api, cart){
//     // const itemDelete = document...
//     // itemDelete.forEach((item) => {
//     //     item.addEventListener()
//     // })
// }

fetch("http://localhost:3000/api/products/")

    .then(function res() {
        if (res.ok) {
            return res.json()
        }
    }).then(function getSofa(api) {
        displaySofa(api, cart)
    })

//*****************Comparison localStorage with Fetch *****************//

function displaySofa(getApi, cart){
    for (let product of cart){
        for (let data of getApi){
            if (product.id === data._id){
                createProductCart(product, data)
            }
        }
    }
}

function createProductCart(product, data){
    console.log(product);
    console.log(data);


    // product = LOCALSTORAGE
    // DATA = API

    const basketProduct = `
      <article class="cart__item" id="${data.id}" data-id="${product.id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${data.imageUrl}" alt="${data.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${product.color}</p>
          <p class="prix">${data.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;

    document.getElementById('cart__items').insertAdjacentHTML('beforeend', basketProduct);
}

// function deleteItem(api, cart){
//     // const itemDelete = document...
//     // itemDelete.forEach((item) => {
//     //     item.addEventListener()
//     // })
// }