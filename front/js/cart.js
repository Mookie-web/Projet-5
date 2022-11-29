let addToCart = document.getElementById('order');
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
        item.addEventListener("click", function (e) {
            e.preventDefault()
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
                //    window.confirm("Produit supprimé")
                getTotal(data, localStorage.getItem('basket'));
            }

            //  window.location.href = "cart.html"
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
                    product.remove()
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
        document.getElementById("totalQuantity").innerText = "";
    } else {
        for (let product of cart) {
            sumQty = sumQty + parseInt(product.quantity);
        }
    }

    if (sumQty > 1) {
        console.log(sumQty);
        for (let product of cart) {
            for (let data of api) {
                if (product.id === data._id) {
                    console.log(data)
                    priceTotal = priceTotal + product.quantity * data.price
                }
            }
        }
    }
    document.getElementById('totalPrice').innerText = priceTotal;
    document.getElementById('totalQuantity').innerText = sumQty;
}

//***************** Regex *****************//
let regexName = new RegExp(/^[A-Za-z]{2,}$/);
let regexAddress = new RegExp("[0-9]{1,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)");
let regexCity = new RegExp("^([a-zA-Z]+(?:. |-| |'))*[a-zA-Z]*$");
let regexEmail = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
//****************************************//

//**************** Listen modification firstName *****************//
let firstName = document.getElementById('firstName');
firstName.addEventListener('change', function () {
    validFirstName(this);
});

function validFirstName(inputFirstName) {
    if (!regexName.test(inputFirstName.value)) {
        document.getElementById('firstNameErrorMsg').innerText =
            "Exemple : morgan, Morgan"
        return false // Si la condition est fausse le if se stop
    } else {
        document.getElementById('firstNameErrorMsg').innerText = "";
        return true
    }
}

//***************** End listen modification firstName *****************//

//***************** Listen modification lastName *****************//

let lastName = document.getElementById('lastName');
lastName.addEventListener('change', function () {
    validLastName(this);
})

function validLastName(inputLastName) {
    if (!regexName.test(inputLastName.value)) {
        document.getElementById('lastNameErrorMsg').innerText =
            "stern, Kerguen"
        return false;
    } else {
        document.getElementById('lastNameErrorMsg').innerText = ""
        return true;
    }
}

//***************** End listen modification lastName *****************//

//***************** Listen modification address  *****************//
let address = document.getElementById('address');
address.addEventListener('change', function () {
    validAddress(this);
})

function validAddress(inputAddress) {
    if (!regexAddress.test(inputAddress.value)) {
        document.getElementById('addressErrorMsg').innerText =
            "Exemple : 10 rue de Rennes"
        return false
    } else {
        document.getElementById('addressErrorMsg');
        return true;
    }
}

//***************** End listen modification address  *****************//

//***************** Listen modification city *****************//
let city = document.getElementById('city');
city.addEventListener('change', function () {
    validCity(this);
})

function validCity(inputCity) {
    if (!regexCity.test(inputCity.value)) {
        document.getElementById('cityErrorMsg').innerText =
            "Exemples : Montfort-sur-Meu";
        return false;
    } else {
        document.getElementById('cityErrorMsg').innerText = "";
        return true;
    }
}

//***************** End listen modification city *****************//

//***************** Listen modification Email *****************//
let email = document.getElementById('email');
email.addEventListener('change', function () {
    validEmail(this);
})

function validEmail(inputEmail) {
    if (!regexEmail.test(inputEmail.value)) {
        document.getElementById('emailErrorMsg').innerText =
            "Exemples : contact@kanap.fr"
        return false
    } else {
        document.getElementById('emailErrorMsg').innerText = ""
        return true;
    }
}

//***************** End listen modification city *****************//

//***************** POST Method *****************//
addToCart.addEventListener('click', function (e) {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem('basket'));

    // Vérifier tous les inputs ( && ), ( vérifier l'abnégation ou pas avec (!)
    if (!validEmail(email.value) && (!validCity(city.value) && (!validAddress(address.value)) && (!validLastName(lastName.value)) && (!validFirstName(firstName.value)))) {
        console.log("NOK")
    }

    // Vérifier si le panier n'est pas vide
    if (products.length < 1) {
        alert("Attention votre paner est vide")
        // ALERT PANIER VIDE
    }
    const productsID = [];
    products.forEach((product) => {
        productsID.push(product.id)
    });

    const order = {
        contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        products: productsID,
    };

    orderManager(order)
})

function orderManager(order) {
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    })
        .then(res => res.json())
        .then(function (res) {
            localStorage.clear();
            window.location = `./confirmation.html?orderId=${res.orderId}`;
        })
        .catch(function (error) {
            console.log(error)
        });
}
