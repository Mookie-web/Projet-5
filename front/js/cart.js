let cart = JSON.parse(localStorage.getItem('basket'));
let form = document.querySelector('.cart__order__form');
//*****************Get products API  via Fetch *****************//
fetch("http://localhost:3000/api/products/")
    .then(function (res) { // Get response
        if (res.ok) { // If response is ok
            return res.json();// So return the response in dot json
        }
    }).then(function getSofa(api) { // Get each product
    let cart = JSON.parse(localStorage.getItem('basket'))
    displaySofa(api, cart)
})

//*****************Comparaison localStorage with Fetch *****************//

function displaySofa(getApi, cart) {
    for (let product of cart) {
        for (let data of getApi) {
            if (product.id === data._id) {
                createProductCart(product, data)
            }
        }
    }
    deleteItem(getApi, cart)
    changeQty(getApi, cart)
    getTotal(getApi, cart)

}

//*****************Insert Cart Product in HTML *****************//
function createProductCart(product, data) {
    document.getElementById('cart__items').innerHTML +=
        `<article class="cart__item" id="${product.id}" data-id="${product.id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${data.imageUrl}" alt="${data.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${data.name}</h2>
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
}

//*****************Delete Item *****************//

function deleteItem(data, products) {
    const itemDelete = document.querySelectorAll(".deleteItem");
    itemDelete.forEach((item) => {
        item.addEventListener("click", function () {
            const product = item.closest("article");
            product.remove();
            const productId = product.dataset.id;
            const productColor = product.dataset.color;
            if (products.some((e) => e.id === productId && e.color === productColor)) {
                let objIndex = products.findIndex((product) =>
                    product.id === productId && product.color === productColor)
                products.splice(objIndex, 1);
                let productStorage = JSON.stringify(products);
                localStorage.setItem('basket', productStorage);
            }
            getTotal(data, localStorage.getItem('basket'));
        })
    })


}
//*****************End Delete Item *****************//

//*****************Change Quantity *****************//

function changeQty(data, products) {
    const inputs = document.querySelectorAll('.itemQuantity');
    inputs.forEach((item) => {
        item.addEventListener("change", function () {
            const product = item.closest("article");// closest renvoie l'élément ou l'ancêtre le plus proche
            const productId = product.dataset.id;
            const productColor = product.dataset.color;

            let objIndex = products.findIndex((product) =>
                product.id === productId && product.color === productColor)

            if (item.valueAsNumber <= 0) {
                if (confirm("Attention une valeur à zéro va supprimer le produit ! Souhaitez vous le supprimer ?")) {
                    product.remove();
                    products.splice(objIndex, 1);
                    let productStorage = JSON.stringify(products);
                    localStorage.setItem('basket', productStorage);
                }
            } else if (products.some((e) => e.id === productId && e.color === productColor)) {
                products[objIndex].quantity = item.valueAsNumber;
                let productStorage = JSON.stringify(products);
                localStorage.setItem('basket', productStorage);
            }
            getTotal(data, products)
        })
    })

}

//*****************End Change Quantity *****************//

function getTotal(api, cart) {
    let sumQty = 0;
    let priceTotal = 0;

    if (cart === null) {
    } else {
        for (let product of cart) {
            sumQty = sumQty + parseInt(product.quantity);
        }
    }

    if (sumQty > 1) {
        for (let product of cart) {
            for (data of api) {
                if (product.id === data._id) {
                    priceTotal = priceTotal + product.quantity * data.price
                }
            }
        }
    }
    document.getElementById('totalPrice').innerHTML = priceTotal;
    document.getElementById('totalQuantity').innerHTML = parseInt(sumQty);

}
//***************** Regex *****************//

let regexName = "/^\w+@[@-zA-Z J+?\. [a-zA-Z]{2,3}$/";
let regexAddress = "/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*$/"
let regexCity = "/^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$/"

//****************************************//

//***************** Listen modification firstName *****************//

let firstName = document.getElementById('firstName');
firstName.addEventListener('change', function (){
    validFirstName(this);

});

function validFirstName(inputFirstName){
    let firstNameRegex = new RegExp(regexName);


    if (!firstNameRegex.test(inputFirstName.value)){
        document.getElementById('firstNameErrorMsg').innerText =
            "Exemple : morgan, Morgan"
        return false // Si la condition est fausse le if se stop
    }
    else {
        document.getElementById('firstNameErrorMsg').innerText = "";
        return true
    }
}

//***************** End listen modification firstName *****************//

//***************** Listen modification lastName *****************//

let lastName = document.getElementById('lastName');
lastName.addEventListener('change',function (){
    validLastName(this);
})

function validLastName(inputLastName){
    let lastNameRegex = new RegExp(regexName);

    if (!lastNameRegex.test(inputLastName.value)){
        document.getElementById('lastNameErrorMsg').innerText =
            "stern, Kerguen"
        return false;
    }else{
        document.getElementById('lastNameErrorMsg').innerText = ""
        return true;
    }
}

//***************** End listen modification lastName *****************//

//***************** Listen modification address  *****************//

let address = document.getElementById('address');
address.addEventListener('change', function (){
  validAddress(this);
})

function validAddress(inputAddress){
    let addressRegex = new RegExp(regexAddress);

    if (!addressRegex.test(inputAddress)){
        document.getElementById('addressErrorMsg').innerText =
            "Exemple : 10 rue de Rennes"
        return false

    }else{
        document.getElementById('addressErrorMsg');
        return true;
    }
}
//***************** End listen modification address  *****************//

//***************** Listen modification city *****************//

let city = document.getElementById('city');
city.addEventListener('change', function (){
    validCity(this);
})

function validCity(inputCity){
    let cityRegex = new RegExp(regexCity);
    if (!cityRegex.test(inputCity.value)){
        document.getElementById('cityErrorMsg').innerText =
            "Exemples : Montfort-sur-Meu";
        return false;
    }else{
        document.getElementById('cityErrorMsg').innerText = "";
        return true;
    }

}

//***************** End listen modification city *****************//

//***************** Listen modification Email *****************//

let email = document.getElementById('email');
email.addEventListener('change', function (){
    validEmail(this);
})

function validEmail(inputEmail){

    let regexEmail = new RegExp(regexName);

    if (!regexEmail.test(inputEmail)){
        document.getElementById('emailErrorMsg').innerText =
            "Exemples : contact@kanap.fr"
        return false

    }else{
        document.getElementById('emailErrorMsg').innerText = ""
        return true;
    }
}
//***************** End listen modification city *****************//


