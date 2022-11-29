//*****************RECUPERATION ID*****************//

// STEP  1 : Récupérer l'id courant ( produit.html?id=XXXXXX


const query = window.location.search;
const urlParams = new URLSearchParams(query);
const id = urlParams.get('id')

let button = document.getElementById('addToCart')
let colorInput = document.getElementById('colors');
let quantity = document.getElementById('quantity');
// console.log(id);

//*****************DECLARATION VARIABLES*****************//

let image = document.getElementsByClassName('item__img');
let titlePrice = document.getElementsByClassName('item__content__titlePrice');
let descriptionTitle = document.getElementsByClassName('item__content__description__title');
let colors = document.getElementById('colors');

//*****************AJOUT ELEMENT*****************//

// STEP 2 : Récupérer les infos du produit (via l'id) depuis l'API


fetch('http://localhost:3000/api/products/' + id)
    .then((getId) => {
        // console.log(getId);  // Vérifier le retour de l'api via un console.log
        return getId.json();
    }).then((getProduct) => {

// STEP 3 : Afficher les infos du produit dans le DOM

    let imageElement = document.createElement('img');
    imageElement.src = getProduct.imageUrl;
    imageElement.alt = getProduct.altTxt;
    imageElement.id = 'productImage';
    image[0].appendChild(imageElement);

    let titleElement = document.getElementById('title')
    let price = document.getElementById('price');
    let description = document.getElementById('description');


    titleElement.innerText = getProduct.name;
    titleElement.id = 'productName';

    price.innerText = getProduct.price;
    price.id = 'productPrice';

    description.innerText = getProduct.description;
    description.id = 'productDescription';

//*****************BOUCLE FOREACH*****************//
    getProduct.colors.forEach((getColors) => {

        // console.log(document.createElement('option'));
        let option = document.createElement('option');
        option.innerText = `${getColors}`;
        option.value = `${getColors}`;
        option.id = 'productColors';

        colors.appendChild(option)
    })


    titlePrice[0].appendChild(titleElement);
    titlePrice[0].appendChild(titleElement);
    descriptionTitle[0].appendChild(description);


})

const openBtn = document.getElementsByClassName('item__content__addButton');

button.addEventListener('click', function () {


//*****************RECUPERATION INFORMATION*****************//

    let color = colorInput.value;
    let quantityValue = parseInt(quantity.value);
    // console.log(quantity)
    if (quantity.value <= 0 && colorInput.value === ''){
        window.confirm('Ajouter une quantité et une couleur')
    }

    else if (quantity.value <= 0) {
        window.confirm('Ajouter une quantité')

    }else if (colorInput.value === ''){
        window.confirm('Ajouter une couleur')

    }else {
        window.confirm('Produit ajouté au panier vous allez être redirigé vers la page panier')
    }
    window.location.href = "cart.html"
//**********************************************************//
    // Créer un objet pour le sauvegarder dans le localstorage ( Clés : Valeurs )

    let productOrder = {
        id: id,
        quantity: quantityValue,
        color: color,
    }

    let cart = localStorage.getItem('basket');
    console.log(cart)
    let newItem = true;

    if (cart === null) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }

    for (let product of cart) {
        if (product.id === productOrder.id && product.color === productOrder.color) {
            product.quantity++; //productOrder.quantity;
            newItem = false;
        }
    }

    if (newItem === true) {
        cart.push(productOrder)
    }

    localStorage.setItem('basket', JSON.stringify(cart))
})
